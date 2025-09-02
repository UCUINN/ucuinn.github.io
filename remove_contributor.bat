@echo off
echo This script will help remove "ruslanlap" from Git history
echo.
echo IMPORTANT: Make sure you have a backup of your repository before proceeding!
echo This operation will rewrite Git history and force push to the remote repository.
echo.
echo Press Ctrl+C to cancel or any key to continue...
pause > nul

echo.
echo Setting up new Git author information...
git config --local user.name "UCU INN"
git config --local user.email "ucucenter@gmail.com"

echo.
echo Creating a temporary branch for safety...
git checkout -b temp_clean_branch

echo.
echo Preparing Git filter-branch command to remove "ruslanlap" from history...
git filter-branch --env-filter '
if [ "$GIT_COMMITTER_NAME" = "ruslanlap" ] || [ "$GIT_COMMITTER_EMAIL" = "106077551+ruslanlap@users.noreply.github.com" ] || [ "$GIT_COMMITTER_EMAIL" = "lapin@ucu.edu.ua" ]
then
    export GIT_COMMITTER_NAME="UCU INN"
    export GIT_COMMITTER_EMAIL="ucucenter@gmail.com"
fi
if [ "$GIT_AUTHOR_NAME" = "ruslanlap" ] || [ "$GIT_AUTHOR_EMAIL" = "106077551+ruslanlap@users.noreply.github.com" ] || [ "$GIT_AUTHOR_EMAIL" = "lapin@ucu.edu.ua" ]
then
    export GIT_AUTHOR_NAME="UCU INN"
    export GIT_AUTHOR_EMAIL="ucucenter@gmail.com"
fi
' --tag-name-filter cat -- --all

echo.
echo Verifying changes...
git log --pretty=format:"%%an <%%ae>" | sort -u

echo.
echo If the changes look good, run these commands manually:
echo git push -f origin temp_clean_branch:main
echo git checkout main
echo git branch -D temp_clean_branch
echo.
echo IMPORTANT: This will force push to your main branch!
