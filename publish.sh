#!/usr/bin/env bash

npm run deploy

git add ./
git commit -m "release bundle"
git push origin master

npm version patch
npm publish
