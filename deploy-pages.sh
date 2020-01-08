worktree='gh-pages'

rm -rf "$worktree/*"
cp -r packages/web/dist "$worktree/"
cd $worktree
git add --all
git commit -m "deploy: git-pages"
git push -u origin gh-pages