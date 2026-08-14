#!/bin/bash
echo "🚀 Pushing JAW Drop Productions to GitHub..."
cd "$(dirname "$0")"
git remote remove origin 2>/dev/null
git remote add origin https://github.com/cbq8j2s4pg-ux/jawdrop-productions.git
git add -A
git commit -m "Initial site upload" 2>/dev/null || echo "Nothing new to commit"
git push -u origin main
echo ""
echo "✅ Done! Your code is now on GitHub."
echo "👉 Visit: https://github.com/cbq8j2s4pg-ux/jawdrop-productions"
