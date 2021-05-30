#!/usr/bin/env zx

console.log(chalk.cyan('Fetching app version...'));

const content = JSON.parse((await fs.readFile('package.json')).toString());

const isCanary = content.version.includes('canary');
const isWin = os.type() === 'Windows_NT';

const fileSeparator = isWin ? '\\' : '/';

const sourceDir = `build${fileSeparator}${isCanary ? 'canary' : 'default'}`;
const targetDir = 'build';

console.log(chalk.cyan(`Copying ${sourceDir}/* to ${targetDir}...`));

if(isWin) {
    await $`xcopy /s ${sourceDir} ${targetDir}`;
} else {
    await $`cp ${sourceDir}/* ${targetDir}`;
}

console.log(chalk.green('Done!'))

