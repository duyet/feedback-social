echo "Git stash local config ..."
git add .
git stash

echo "Getch new source from github ..."
git pull

echo "Put back custom system config ..."
git stash apply

echo "Restart Node PM2 ..."
pm2 restart 0

echo ">> OK"

