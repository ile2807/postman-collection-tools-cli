const chalk = require('chalk');
const { exit } = require('process');
const jackal = require("jackal-postman");
const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');

const line = () => console.log(chalk.gray("---------------------------------------------------------------------"));

const help = () => {
    console.log(
        chalk.blue.bold("Welcome to Postman collections tools, this is how to use the application")
    );
    line();
    console.log(
        chalk.yellow("run jackal with the following parameters:")
    );
    line();
    console.log(
        chalk.cyan("[command] (mandatory)") + " Operation that will be performed, possible options:"
    );
    console.log(
        chalk.cyan("-s [source-collection.json] (mandatory when using t*, amcv and clr commands)") + " This is the starting point file to enrich with the end result variables, if not present when mergning, a blank collection is created and upgraded with the variables"
    );
    console.log(
        chalk.cyan("-f [source-folder] (mandatory when using m* commands)") + " This is a path to the folder that contains all source collections from where the application will get the collection variables"
    );
    console.log(
        chalk.cyan("-c [collections-list] (optionaly used when using m* commands)") + " This value overrides the -f flag. This is a list of collection files (with full path) separated with comma (,) This list is used the same way as the source-folder"
    );
    console.log(
        chalk.cyan("-o [output-collection.json] (mandatory)") + " This is a filename where the result collection will be written"
    );
    console.log(
        chalk.yellow("    clr") + " Removes all repeating occurences of absolutely the same requests (name included), only one will remain. The remaining instance is the first occurence that the cleanup algorithm encounters while analysing. Scope of comparing duplicates is the whole collection with all folders and subfolders. With this command, the -f flag is not used"
    );
    console.log(
        chalk.yellow("    clv") + " Removes all unused collection variables from collection. With this command, the -f flag is not used"
    );
    console.log(
        chalk.yellow("    t200") + " Adds test (for HTTP respnse 200) to all requests of the source collection and saves to the output collection. With this command, the -f flag is not used"
    );
    console.log(
        chalk.yellow("    ts") + " Adds smart tests to all requests of the source collection and saves to the output collection. Smart tests are created by using the saved responses as examples in the collection. This command analyses the saved responses and creates tests to match those values. Currently this command supports only JSON response testing. With this command, the -f flag is not used"
    );
    console.log(
        chalk.yellow("    amcv") + " Appends missing collection variables that are refferenced in all requests but are not present in the collection. With this command, the -f flag is not used"
    );
    console.log(
        chalk.yellow("    arph") + "Appends request payload hash to all requests,  With this command, the -f flag is not used"
    );
    console.log(
        chalk.yellow("    mev") + " Merges all collection variables from all source folder collections to an output environment file. If no source environment is specified, a blank one will be used as starting point"
    );
    console.log(
        chalk.yellow("    mv") + " Merges variables from all source folder collection in the collection variables of the output collection"
    );
    console.log(
        chalk.yellow("    mr") + " Merges all requests from all source folder collection into the output collection, collection variables are not transfered, only requests"
    );
    console.log(
        chalk.yellow("    mc") + " Merges each collection requests from all collections in the source folder in a separate folder in the output collection. Collection variables with this command are setup in the PreRequest script of each requests folder"
    );
    console.log(
        chalk.yellow("    gmd") + " Generates description for all requests, folders and collection,  With this command, the -f flag is not used"
    );
    console.log(
        chalk.yellow("    emd") + " Exports descriptions into one MD file,  With this command, the -f flag is not used"
    );
    console.log(
        chalk.yellow("    epdf") + " Exports descriptions into one PDF file, folders and collection,  With this command, the -f flag is not used"
    );
    line();
    console.log(
        chalk.gray.bold("Example:") + " jackal -m merge-variables -f ./examples -o result.json"
    );
    line();
    exit();
}

const displayVersion = () => {
    var pjson = require('../package.json');
    console.log(chalk.cyan.bold(pjson.version));
    exit();
}

async function exportDescriptionPDF(sourceFileName, targetPdfFile) {
    jackal.exportDescriptionMD(sourceFileName,"temp.md");
    const pdf = await mdToPdf({ path: 'temp.md' }).catch(console.error);
	if (pdf) {
        fs.writeFileSync(targetPdfFile, pdf.content);
        return "OK";
	}
    return "PDF creation error occurred";
}

module.exports = {
    help: help,
    line: line,
    version:displayVersion,
    exportDescriptionPDF:exportDescriptionPDF
};