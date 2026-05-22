param(
  [string]$SheetId = "REPLACE_WITH_ID",
  [string]$UserProfile = "booking_workspace_full_bella",
  [string]$GithubRepo = "CRM-AYUDAS"
)

$ErrorActionPreference = "Stop"

function Get-ClaspPath {
  $cmd = Get-Command clasp.cmd -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }

  $fallback = "C:\Users\elrub\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.14.0-win-x64\clasp.cmd"
  if (Test-Path $fallback) { return $fallback }

  throw "No se encontro clasp.cmd."
}

function Get-GithubTokenFromGitCredentialManager {
  $git = "C:\Program Files\Git\cmd\git.exe"
  if (-not (Test-Path $git)) {
    throw "No se encontro git.exe en '$git'."
  }

  $credIn = "protocol=https`nhost=github.com`n`n"
  $credOut = $credIn | & $git credential fill
  if (-not $credOut) {
    throw "No se pudo recuperar credencial de GitHub con git credential fill."
  }

  $map = @{}
  foreach ($line in $credOut) {
    if ($line -match "^(?<k>[^=]+)=(?<v>.*)$") {
      $map[$Matches.k] = $Matches.v
    }
  }

  if (-not $map.password) {
    throw "No se encontro token/password para GitHub."
  }

  return $map.password
}

$result = [ordered]@{
  date_local = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
  google = [ordered]@{
    profile = $UserProfile
    logged_in = $false
    email = $null
    sheet_id = $SheetId
    sheet_title = $null
    sheet_access = $false
  }
  github = [ordered]@{
    api_auth_ok = $false
    login = $null
    target_repo = $GithubRepo
    repo_exists = $false
  }
}

$clasp = Get-ClaspPath
$auth = & $clasp --user $UserProfile show-authorized-user --json | ConvertFrom-Json
$result.google.logged_in = [bool]$auth.loggedIn
if (-not $result.google.logged_in) {
  throw "El perfil '$UserProfile' no esta autenticado en clasp."
}

$cfgPath = Join-Path $HOME ".clasprc.json"
if (-not (Test-Path $cfgPath)) {
  throw "No existe $cfgPath."
}

$cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json
$tokenInfo = $cfg.tokens.$UserProfile
if (-not $tokenInfo) {
  throw "No existe token para el perfil '$UserProfile' en .clasprc.json."
}

$oauthBody = @{
  client_id = $tokenInfo.client_id
  client_secret = $tokenInfo.client_secret
  refresh_token = $tokenInfo.refresh_token
  grant_type = "refresh_token"
}

$oauth = Invoke-RestMethod -Method Post -Uri "https://oauth2.googleapis.com/token" -Body $oauthBody -ContentType "application/x-www-form-urlencoded"
if (-not $oauth.access_token) {
  throw "Google no devolvio access_token."
}

$gHeaders = @{ Authorization = "Bearer $($oauth.access_token)" }
$me = Invoke-RestMethod -Headers $gHeaders -Uri "https://www.googleapis.com/oauth2/v2/userinfo"
$sheet = Invoke-RestMethod -Headers $gHeaders -Uri ("https://sheets.googleapis.com/v4/spreadsheets/{0}?fields=spreadsheetId,properties.title" -f $SheetId)

$result.google.email = $me.email
$result.google.sheet_title = $sheet.properties.title
$result.google.sheet_access = $true

$ghToken = Get-GithubTokenFromGitCredentialManager
$ghHeaders = @{
  Authorization = "token $ghToken"
  "User-Agent" = "crm-ayudas-check"
  Accept = "application/vnd.github+json"
}

$ghUser = Invoke-RestMethod -Headers $ghHeaders -Uri "https://api.github.com/user"
$result.github.api_auth_ok = $true
$result.github.login = $ghUser.login

try {
  $null = Invoke-RestMethod -Headers $ghHeaders -Uri ("https://api.github.com/repos/{0}/{1}" -f $ghUser.login, $GithubRepo)
  $result.github.repo_exists = $true
}
catch {
  $result.github.repo_exists = $false
}

$result | ConvertTo-Json -Depth 6
