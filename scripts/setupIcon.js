#!/usr/bin/env node

console.log('Fetching app version...');

const package = require('../package.json');
const path = require('path');
const copydir = require('copy-dir');

const isCanary = package.version.includes('canary');

const iconDir =  'build';
const targetDir = path.join(iconDir, isCanary ? 'canary' : 'default');

console.log(`Copying ${targetDir} to ${iconDir}...`);
copydir.sync(targetDir, iconDir);
console.log('Done!');
