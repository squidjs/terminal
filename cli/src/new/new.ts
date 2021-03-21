import { join } from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { spawn } from 'child_process';
import { javascriptThemeTemplate } from './templates/javascript-theme';
import { javascriptPluginTemplate } from './templates/javascript-plugin';
import { typescriptPluginTemplate } from './templates/typescript-plugin';
import { typescriptThemeTemplate } from './templates/typescript-theme';
import { YARN_PATH } from '../utils/utils';

export type PackageType = 'Theme' | 'Plugin';
export type Language = 'TypeScript' | 'JavaScript';

export const initializeProject = (name: string, path: string, useYarn: boolean, packageType: PackageType, language: Language) => {

    const projectName = `squid-${packageType.toLowerCase()}-${name.toLowerCase()}`;
    const projectPath = join(path, projectName);

    console.log(' ');
    console.log(`Initializing a new Squid ${packageType} in ${chalk.green(projectPath)}...`);
    console.log(' ');

    if(!fs.existsSync(projectPath))
        fs.mkdirSync(projectPath);

    fs.writeFileSync(join(projectPath, 'package.json'), JSON.stringify({
        name: projectName,
        version: '1.0.0',
        scripts: language === 'TypeScript' ? {
            dist: 'tsc',
            watch: 'tsc -w'
        } : undefined,
        keywords: [
            'squid-package',
            `squid-${packageType.toLowerCase()}`,
            packageType.toLowerCase(),
        ],
    }, null, 2));

    fs.writeFileSync(join(projectPath, '.gitignore'), `.node_modulees
.idea
.vscode

.DS_STORE`);

    const packages = ['squid-packages'];

    if(language === 'TypeScript') {

        packages.push('typescript');

        fs.writeFileSync(join(projectPath, 'tsconfig.json'), JSON.stringify({
            compilerOptions: {
                target: 'es5',
                module: 'commonjs',
                outDir: './dist',
                skipLibCheck: true
            },
            include: ['./src/**/*']
        }, null, 2));

        const srcPath = join(projectPath, 'src');

        const content = packageType === 'Plugin' ? typescriptPluginTemplate(name) : typescriptThemeTemplate(name);

        fs.mkdirSync(join(projectPath, 'src'));
        fs.writeFileSync(join(srcPath, 'index.ts'), content);

    } else {

        const distPath = join(projectPath, 'dist');

        const content = packageType === 'Plugin' ? javascriptPluginTemplate(name): javascriptThemeTemplate(name);

        fs.mkdirSync(distPath);
        fs.writeFileSync(join(distPath, 'index.js'), content);
    }

    console.log('Installing packages. This might take a few seconds.');
    console.log(`Installing ${chalk.blue(packages.join(', '))}`);
    console.log(' ');

    const install = spawn(process.execPath, [YARN_PATH, 'add', '--cwd', projectPath, '-D', ...packages], { stdio: 'inherit' });

    install.on('message', (msg) => console.log(msg))
    install.on('exit', () => {

        console.log(' ');
        console.log('Success!');

        process.exit(0);
    });
}
