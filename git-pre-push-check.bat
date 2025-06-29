@echo off
echo -------------------------------------
echo Running Pre-Push Sanity Check...
echo -------------------------------------

REM Check current branch
FOR /F "tokens=*" %%A IN ('git rev-parse --abbrev-ref HEAD') DO SET branch=%%A

IF NOT "%branch%"=="main" (
    echo ⚠️  Warning: You are on branch "%branch%" (not main)
)

REM Check for untracked files
git ls-files --others --exclude-standard > temp_untracked.txt
for /f %%x in (temp_untracked.txt) do (
    echo ❌ Untracked files detected:
    type temp_untracked.txt
    del temp_untracked.txt
    goto :Confirm
)
del temp_untracked.txt

REM Check for unstaged changes
git diff --name-only > temp_diff.txt
for /f %%x in (temp_diff.txt) do (
    echo ❌ Unstaged changes detected:
    type temp_diff.txt
    del temp_diff.txt
    goto :Confirm
)
del temp_diff.txt

REM Check for staged but uncommitted changes
git diff --cached --name-only > temp_cached.txt
for /f %%x in (temp_cached.txt) do (
    echo ❌ Staged but uncommitted changes detected:
    type temp_cached.txt
    del temp_cached.txt
    goto :Confirm
)
del temp_cached.txt

:Confirm
echo -------------------------------------
set /p userInput=Proceed with push? (y/n): 
if /i "%userInput%" NEQ "y" (
    echo 🚫 Push cancelled.
    exit /b 1
)

echo ✅ All checks done. Proceeding with push...
exit /b 0
