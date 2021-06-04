const parseArgs = require('minimist');
const args = parseArgs(process.argv.slice(2));
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { exit } = require('process');
const { help, line, version } = require('./lib/helper');
const { validateParametersSourceFile, validateParametersSourceFolder } = require('./lib/validation');
const outputFileName = args.o;
const collectionsFolder = args.f;
const jackal = require("jackal-postman");
const command = process.argv.slice(2)[0];
const sourceFileName = args.s;
const collectionNamesList = args.c;
clear();

if (args.v || args.version) {
    version();
}

console.log(
    chalk.yellow(
        figlet.textSync('Jackal', { horizontalLayout: 'full' })
    )
);

if (args.h || args.help) {
    help();
}

if (command === undefined) help();

if (command.startsWith("t") || command.startsWith("cl") || command.startsWith("amcv")) {
    if (!validateParametersSourceFile(sourceFileName, outputFileName)) exit();
} else {
    if (!validateParametersSourceFolder(collectionsFolder, outputFileName, collectionNamesList)) exit();
}
console.log('Source collections folder > ' + chalk.cyan(collectionsFolder));
console.log('Source collections > ' + chalk.cyan(collectionNamesList));
console.log('Start file > ' + chalk.cyan(sourceFileName));
console.log('Target collection > ' + chalk.cyan(outputFileName));
console.log('Command > ' + chalk.cyan(command))
line();
jackal.run(command, sourceFileName, collectionsFolder, outputFileName, collectionNamesList).then(executionResult => {
    if (executionResult instanceof Set) {
        executionResult.forEach(e => console.log(chalk.yellow(e)));
    } else {
        console.log("Execution: " + chalk.yellow(executionResult));
    }
}).catch(err=>console.log(err));




