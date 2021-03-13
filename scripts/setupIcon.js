#!/usr/bin/env node

console.log('Fetching app version...');

const package = require('../package.json');
const path = require('path');
const shell = require('child_process').execSync;

const isCanary = package.version.includes('canary');

const iconDir =  'build';
const targetDir = path.join(iconDir, isCanary ? 'canary' : 'default');

console.log(`Copying ${targetDir} to ${iconDir}...`);

shell(`cp ${targetDir}/* ${iconDir}`);

console.log('Done!');
