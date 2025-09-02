@echo off
echo Starting deployment process for UCU INN to ucuinn.github.io...

REM Check if git is initialized
IF NOT EXIST .git (
  echo ERROR: Git repository not initialized.
  echo Running: git init
  git init
  echo.
)

REM Set the target repository
echo Setting up remote repository for ucuinn.github.io...
git remote -v | findstr /C:"origin" > nul
IF %ERRORLEVEL% NEQ 0 (
  echo Adding remote origin: https://github.com/UCUINN/ucuinn.github.io.git
  git remote add origin https://github.com/UCUINN/ucuinn.github.io.git
) ELSE (
  echo Updating remote origin to: https://github.com/UCUINN/ucuinn.github.io.git
  git remote set-url origin https://github.com/UCUINN/ucuinn.github.io.git
)
echo.

echo Installing gh-pages package...
call npm install --save-dev gh-pages
IF %ERRORLEVEL% NEQ 0 (
  echo ERROR: Failed to install gh-pages package.
  goto :error
)

echo Building the project...
call npm run build
IF %ERRORLEVEL% NEQ 0 (
  echo ERROR: Build failed.
  goto :error
)

echo Deploying to GitHub Pages...
echo This will create or update both main and gh-pages branches.
echo.

REM First, commit any changes to main branch
echo Committing changes to main branch...
git add .
git commit -m "Update site content [%DATE% %TIME%]" || echo No changes to commit

REM Push to main branch
echo Pushing to main branch...
git push -u origin main
IF %ERRORLEVEL% NEQ 0 (
  echo WARNING: Could not push to main branch. You may need to authenticate.
  echo You can manually push later with: git push -u origin main
  echo.
)

REM Deploy to gh-pages branch
echo Deploying to gh-pages branch...
call npx gh-pages -d dist -b gh-pages -m "Deploy to GitHub Pages [%DATE% %TIME%]"
IF %ERRORLEVEL% NEQ 0 (
  echo ERROR: Deployment to gh-pages branch failed.
  echo Please check if you have proper GitHub access rights.
  goto :error
)

echo.
echo Deployment complete!
echo Your site should be available at:
echo https://ucuinn.github.io/
echo (It may take a few minutes for changes to appear)
echo.
echo NOTE: Make sure GitHub Pages is enabled in your repository settings:
echo 1. Go to https://github.com/UCUINN/ucuinn.github.io/settings/pages
echo 2. Ensure the source is set to "Deploy from a branch"
echo 3. Select "gh-pages" branch and "/ (root)" folder
echo 4. Click Save
echo.
pause
goto :eof

:error
echo.
echo Deployment process failed. Please check the errors above.
pause
exit /b 1
