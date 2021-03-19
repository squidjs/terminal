import { join } from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { spawn } from 'child_process';
import { javascriptThemeTemplate } from './templates/javascript-theme';
import { javascriptPluginTemplate } from './templates/javascript-plugin';
import { typescriptPluginTemplate } from './templates/typescript-plugin';
import { typescriptThemeTemplate } from './templates/typescript-theme';

export type Template = 'Theme' | 'Plugin';
export type Language = 'TypeScript' | 'JavaScript';

export const initializeProject = (name: string, path: string, useYarn: boolean, template: Template, language: Language) => {

    const projectName = `squid-${template.toLowerCase()}-${name.toLowerCase()}`;
    const projectPath = join(path, projectName);

    console.log(' ');
    console.log(`Initializing a new Squid ${template} in ${chalk.green(projectPath)}...`);
    console.log(' ');

    if(!fs.existsSync(projectPath))
        fs.mkdirSync(projectPath);

    const packagePath = join(projectPath, 'package.json');

    fs.writeFileSync(packagePath, JSON.stringify({
        name: projectName,
        version: '1.0.0',
        scripts: language === 'TypeScript' ? {
            dist: 'tsc',
            watch: 'tsc -w'
        } : undefined,
        keywords: [
            `squid-${template.toLowerCase()}`,
            template.toLowerCase(),
            'squid',
        ],
    }, null, 2));

    const packages = ['squid-plugins'];

    if(language === 'TypeScript') {

        packages.push('typescript');

        const tsconfigPath = join(projectPath, 'tsconfig.json');

        fs.writeFileSync(tsconfigPath, JSON.stringify({
            compilerOptions: {
                target: 'es5',
                module: 'commonjs',
                outDir: './dist',
                skipLibCheck: true
            },
            include: ['./src/**/*']
        }, null, 2));

        const srcPath = join(projectPath, 'src');
        const indexPath = join(srcPath, 'index.ts');

        const content = template === 'Plugin' ? typescriptPluginTemplate(name) : typescriptThemeTemplate(name);

        fs.mkdirSync(srcPath);
        fs.writeFileSync(indexPath, content);

    } else {

        const distPath = join(projectPath, 'dist');
        const indexPath = join(distPath, 'index.js');

        const content = template === 'Plugin' ? javascriptPluginTemplate(name): javascriptThemeTemplate(name);

        fs.mkdirSync(distPath);
        fs.writeFileSync(indexPath, content);
    }

    console.log('Installing packages. This might take a few seconds.');
    console.log(`Installing ${chalk.blue(packages.join(', '))}`);
    console.log(' ');

    const install = spawn(useYarn ? 'yarn' : 'npm', useYarn ? ['add', '--cwd', projectPath, '-D', ...packages] : ['i', '--prefix', projectPath, '--dev', ...packages], { stdio: 'inherit' });

    install.on('message', (msg) => console.log(msg))
    install.on('exit', () => {

        console.log(' ');
        console.log('Success!');

        process.exit(0);
    });
}
