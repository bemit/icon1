#!/bin/bash

#echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}
#      registry=https://registry.npmjs.org/
#      always-auth=true" >.npmrc

#echo "Token length: ${#NPM_TOKEN}"

# todo: not manual resetting the file here
#git checkout -- packages/webpackPartialConfig.js

cd ./packages

cd icon1-core
cp package.json build/ && cp README.md build/
cd ../

cd icon1-react
cp package.json build/ && cp package-lock.json build/ && cp README.md build/
cd ../

cd icon1-mui
cp package.json build/ && cp package-lock.json build/ && cp README.md build/
cd ../

cd ../

#npm run release
#npm run release -- --yes

#rm .npmrc
