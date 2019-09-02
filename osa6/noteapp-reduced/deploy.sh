#!/bin/sh
npm run build
rm -rf ../osa3/3a/build
cp -r build ../osa3/3a/