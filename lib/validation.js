const chalk = require('chalk');
const { line } = require('./helper');
const fs = require('fs');

const validateParametersSourceFolder = (sourceFolder, outputFileName, collectionsFileList) => validateOutputFile(outputFileName) && (validateSourceFolderOrCollections(sourceFolder, collectionsFileList));

const validateParametersSourceFile = (sourceFileName, outputFileName) => validateOutputFile(outputFileName) && validateSourceFile(sourceFileName);

const validateSourceFolderOrCollections = (sourceFolder, collectionsFileList) => {
    if ((collectionsFileList == undefined && sourceFolder == undefined) || collectionsFileList == true || sourceFolder == true) {
        console.log(
            chalk.red.bold("Parameters error")
        );
        line();
        console.log("You must provide source folder with existing collections, or list of source collection files separated with comma. Use the -f option followed by the source folder path, or -c option followed by the source collection list, separated by comma (,). Use the -h to see help");
        line();
        return false;
    } else {
        if (sourceFolder !== undefined && !checkIfFolderExists(sourceFolder)) {
            console.log(
                chalk.red.bold("Parameters error")
            );
            line();
            console.log("The specified source folder does not exist or is not a folder, use -h to see help");
            line();
            return false;
        }
        else {
            return true;
        }
    }
}

const validateOutputFile = outputFileName => {
    if (outputFileName == undefined) {
        console.log(
            chalk.red.bold("Parameters error")
        );
        line();
        console.log("You must provide target file, use -o option followed by the output file path, or -h to see help");
        line();
        return false;
    } else {
        return true;
    }
}

const validateSourceFile = sourceFileName => {
    if (sourceFileName == undefined) {
        console.log(
            chalk.red.bold("Parameters error")
        );
        line();
        console.log("You must provide source file, use the -s option followed by the source folder path, or -h to see help");
        line();
        return false;
    } else {
        if (!checkIfFileExists(sourceFileName)) {
            console.log(
                chalk.red.bold("Parameters error")
            );
            line();
            console.log("The specified source file does not exist or is not a file, use -h to see help");
            line();
            return false;
        }
        else {
            return true;
        }
    }
}

const checkIfFileExists = sourceFileName => fs.existsSync(sourceFileName) && fs.lstatSync(sourceFileName).isFile();
const checkIfFolderExists = sourceFolder => fs.existsSync(sourceFolder) && fs.lstatSync(sourceFolder).isDirectory();

module.exports = {
    validateParametersSourceFolder: validateParametersSourceFolder,
    validateParametersSourceFile: validateParametersSourceFile,
    checkIfFileExists:checkIfFileExists
}