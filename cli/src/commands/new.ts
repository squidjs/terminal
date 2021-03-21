import { Arguments, Argv, CommandModule } from 'yargs';
import inquirer from 'inquirer'
import { resolveArgPath } from '../utils/utils';
import { initializeProject, Language, PackageType } from '../new/new';
import chalk from 'chalk';

export const newCommand: CommandModule = {

    command: 'new [name]',
    describe: 'Initialize a package',
    builder: (args: Argv) => {

        return args
            .option('path', {

                alias: 'p',
                type: 'string',
                describe: 'The path where to initialize the project',
            })
            .option('npm', {

                type: 'boolean',
                describe: 'Use NPM instead of Yarn (not recommanded)',
            });
    },
    handler: (args: Arguments) => {

        let name = args.name as string;
        const path = resolveArgPath(args);
        const useYarn = !args.npm;

        if(!useYarn) {

            console.log(chalk.red('NPM is not yet supported to install packages.'));
            return;
        }

        inquirer.prompt([
            {
                type: 'input',
                message: 'Package name:',
                default: name,
                name: 'name',
            },
            {
                type: 'list',
                message: 'Type of project:',
                choices: ['Plugin', 'Theme'] as PackageType[],
                default: 'Plugin' as PackageType,
                name: 'packageType',
            },
            {
                type: 'list',
                message: 'Language:',
                choices: ['TypeScript', 'JavaScript'] as Language[],
                default: 'TypeScript' as Language,
                name: 'language',
            },

        ]).then((answers) => {

            name = answers.name;
            const { packageType, language }: { packageType: PackageType, language: Language } = answers

            initializeProject(name, path, useYarn, packageType, language);
        });
    },
};
