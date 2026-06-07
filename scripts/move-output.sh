#!/bin/bash
# Find and move .output/public to playground/.output/public
mkdir -p playground/.output
if [ -d ".output/public" ]; then
  mv .output/public playground/.output/public
  echo "Moved .output/public to playground/.output/public"
elif [ -d "playground/.output/public" ]; then
  echo "Output already in playground/.output/public"
else
  echo "ERROR: Cannot find .output/public"
  find /vercel/path0 -name "index.html" -maxdepth 6 2>/dev/null
  exit 1
fi
