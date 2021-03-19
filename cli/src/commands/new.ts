import { Arguments, Argv, CommandModule } from 'yargs';
import inquirer from 'inquirer'
import { resolveArgPath } from '../utils/utils';
import { initializeProject, Language, Template } from '../new/new';

export const newCommand: CommandModule = {

    command: 'new [name]',
    describe: 'Initialize a new theme or plugin',
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

        inquirer.prompt([
            {
                type: 'input',
                message: 'Plugin / theme name:',
                default: name,
                name: 'name',
            },
            {
                type: 'list',
                message: 'Type of project:',
                choices: ['Plugin', 'Theme'] as Template[],
                default: 'Plugin' as Template,
                name: 'template',
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
            const { template, language }: { template: Template, language: Language } = answers

            initializeProject(name, path, useYarn, template, language);
        });
    },
};
