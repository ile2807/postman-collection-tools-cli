# Jackal tools

[![Ask me anything](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/ile2807/postman-collection-tools) [![Version](https://img.shields.io/npm/v/jackal-postman)](https://www.npmjs.com/package/jackal-postman-tools) [![Downloads](https://img.shields.io/npm/dt/jackal-postman-tools)](https://www.npmjs.com/package/jackal-postman-tools)

Jackal tools is an utility application that manipulates `Postman collections`.

This application has multiple features distinguished by the `command` parameter (see below).
It combines collection items from [Postman](https://www.postman.com/) collections located in the `source` folder and appends into the `target` collection. The application is mainly focused on collection feature aggregations, and maintenance of single collections. 
All merge commands are using ***one output collection from many source collections***, and the rest of the commands are ***one input collection to one output collection***.

## How to use it

To run the application just execute the application with the correct command line arguments

### Install and execute

```bash
npm i jackal-postman-tools -g

jackal [command] -f [source-folder] -s [start-file] -o [output-collection] -c [source-collections]
```

### As node application from git repository

```bash
git clone https://github.com/ile2807/postman-collection-tools-cli.git

cd postman-collection-tools-cli

node app.js [command] -f [source-folder] -s [start-file] -o [output-collection] -c [source-collections]
```

### Help

To see the help menu, just execute
```Bash
jackal -h
```

## Commands options

|Command   |Meaning   |Behavior   |
|---|---|---|
|`mv`  |Merge collection variables  |Merges all variables from all source folder collections in the collection variables of the output collection   |
|`mev` |Merge collection variables in an environment file| Merges all collection variables from all source folder collections to an output environment file. If no source environment is specified, a blank one will be used as starting point|
|`mr`   |Merge collection requests   |Merges all requests from all source folder collections into the output collection, collection variables are not transfered, only requests  |
|`mc` |Merge collection in folders |Merges each collection requests from all collections (from the source folder) in a separate folder in the output collection. Collection variables with this command are setup in the PreRequest script of each requests folder|
|`ts`|Append smart test assertions|Adds response validation asserts to all requests of the source collection and saves to the output collection. ***Smart tests are generated by using the saved responses as [examples](https://learning.postman.com/docs/sending-requests/responses/) in the collection***. This command analyses the saved responses and creates tests to match those values. Currently this command supports only JSON and XML response testing. With this command, the -f flag is not used|
|`t200`     |Append HTTP 200 test assertions      |Adds test asserts (to check if response HTTP code is 200) to all requests of the source collection and saves to the output collection. With this command, the -f flag is not used 
|`clr`          |Remove duplicate requests   |All repeating occurences of absolutely the same requests (including name) will be removed, only one will remain. The remaining instance is the first occurence that the cleanup algorithm encounters while analysing. 
|`clv`          |Remove unused collection variables   |Removes all unused collection variables from the collection. It goes through the whole collection and looks for used variables. Then removes all collection variables that are not referenced anywhere in the collection. With this command, the `sourceFolder` is not used |
|`arph`|Append request payload hash| Appends code in PreRequest code that hashes the request body with `hashPassword` variable value. This hash is then added to the request as `PayloadHash` header. 
|`amcv`|Append missing collection variables|Appends missing collection variables that are refferenced in all requests but are not present in the collection. With this command, the -f flag is not used|
|`ged`|Generate MD descriptions in collection|Generates MD descriptions on collection and requests, the description is in MD format and is saved in the output collection file. This command saves the MD descriptions in the collection file. To export these descriptions in a separate MD or PDF file use `emd` or `epdf` respectively. With this command, the `sourceFolder` is not used|
|`emd`|Generate MD document from collection|Creates summary Markdown document from all the collection descriptions. ***This feature does not automatically generate descriptions***.  It only collects descriptions of all elements of the collection and creates one summary Markdown file. With this command, the `sourceFolder` is not used|
|`epdf`|Generate PDF document from collection|Creates PDF document from all the collection descriptions. ***This feature does not automatically generate descriptions***. It collects descriptions of all elements of the collection and creates one summary PDF document file. With this command, the `sourceFolder` is not used|
|`oapi`|Generate [OpenApi](https://swagger.io/specification/) specification|Creates OpenApi yaml document from the `sourceFile`. It uses [postman-to-openapi](https://www.npmjs.com/package/postman-to-openapi) to generate the output. With this command the `sourceFolder` is not used|

> Commands can be combined by executing them one after the other and using the output collection of the first execution as a source collection of the next exection.

Example:

```Bash
jackal mr -f ./examples -o outTemp.json
jackal mv -f ./examples -s outTemp -o out.json
```


## After the execution

```Bash
      _                  _              _ 
     | |   __ _    ___  | | __   __ _  | |
  _  | |  / _` |  / __| | |/ /  / _` | | |
 | |_| | | (_| | | (__  |   <  | (_| | | |
  \___/   \__,_|  \___| |_|\_\  \__,_| |_|

Source collections folder > ./examples
Source collections > undefined
Start file to be upgraded > Blank collection
Target collection > test.json
Command > merge-requests
---------------------------------------------------------------------  
Done
---------------------------------------------------------------------   
```
and the Output collection will be populated with the aggregated variables

## How does it work

### Merging commands
Merge commands take initial file (or start with blank if not provided), take the features from the source folder collections or the set of provided collections and insert the features. The altered content is then saved in the output file.

![Using the merge commands](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/ile2807/postman-collection-tools-cli/main/mergeFeatures.iuml)

### Altering commands
Altering commands take initial file, perform the command and save the altered content in the output file.

![Using the merge commands](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/ile2807/postman-collection-tools-cli/main/otherFeatures.iuml)

## Parameters

### Start file `-s`
`startFile` is considered any existing postman collection or postman environment file. This will will be the starting point to enhance with Jackal commands

### Source folder `-f`
`sourceFolder` is a path on a local drive that will be used as a source of collections whos features will be added to the `startFile`, see the commands above for more info. 
> NOTE: the scanning of files in this folder is ***not recursive***, only the *.json located directly into this folder will be considered for usage.

### Source collections `-c`
`sourceCollections` is a substitute for `sourceFolder`. It is suppose to be a list of collection files separated with comma (,). If this parameter is present in the function call, the `sourceFolder` value is ignored.

### Output file `-o`
`outputFile` is a path where we want the resulting collection/environment to be saved by the Jackal. This location should be accessible by the Jackal. This parameter is required in all use cases.


## Commands and needed parameters

:question: = Optional
:heavy_check_mark: = Required
:x: = Not used
|Command   |`-s`| `-f` either or `-c`| `-o`|
|---|---|---|---|
|`mv`|:question: Blank collection|:heavy_check_mark:|:heavy_check_mark:|
|`mev`|:question: Blank environment|:heavy_check_mark:|:heavy_check_mark:|
|`mr`|:question: Blank collection|:heavy_check_mark:|:heavy_check_mark:|
|`mc`|:question: Blank collection|:heavy_check_mark:|:heavy_check_mark:|
|`clr`|:heavy_check_mark:|:x:|:heavy_check_mark:|
|`clv`|:heavy_check_mark:|:x:|:heavy_check_mark:|
|`arph`|:heavy_check_mark:|:x:|:heavy_check_mark:|
|`amcv`|:heavy_check_mark:|:x:|:heavy_check_mark:|
|`t200`|:heavy_check_mark:|:x:|:heavy_check_mark:|
|`ts`|:heavy_check_mark:|:x:|:heavy_check_mark:|
|`ged`|:heavy_check_mark:|:x:|:heavy_check_mark:|
|`emd`|:heavy_check_mark:|:x:|:heavy_check_mark:|
|`epdf`|:heavy_check_mark:|:x:|:heavy_check_mark:|

## NOTES
- The application will only append features in the `outputFile` 
- You can use the `outputFile` as a `startFile`, in this case the `startFile` **will be altered and overwritten**
- Source of Collection Variables/Requests are all the collections (*.json) located in the Source folder **NOT recursive**
- Duplicate (name and value) items **will not** be added in the `outputFile` multiple times
- If values are different in two same named items then both will be added to the `outputFile`
- Empty variables are not added 
- When using **ts** command, the source collection must have saved responses as [examples](https://learning.postman.com/docs/sending-requests/responses/), otherwise the generation does not work, there is nothing go analyze
- When using the t* commands, the source collection is not altered in any way other than appending test assertions in the `Test` part of ***requests only***. The assertions are added beside existing `Test` code.
- This application does not alters source collections, the changes are only streamed to the output collection.
- The `mev` command works with environment files, both the source and the output files ***are not*** collection files, but [Postman environment files](https://learning.postman.com/docs/sending-requests/managing-environments/)
- `sourceCollections` is a substitute for `sourceFolder`. The commands that need these values at least one is mandatory (either or). It is useless to specify both, specifying `sourceCollections` overrides the `sourceFolder` value.
- `clr` and `clv` are removing features from the `inputFile` and saves the cleaned up file in the `outputFile
- - `arph` is self contained, it will not cause any problems if added and some values missing in the collection like the `hashPassword`
