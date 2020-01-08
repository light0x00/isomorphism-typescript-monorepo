rm -rf _pages
cp -r packages/web/dist _pages
cd _pages
git add --all
git commit -m "deploy: git-pages"
git push