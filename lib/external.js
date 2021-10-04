const postmanToOpenApi = require('postman-to-openapi')

function generateOpenApi(sourceFileName, targetCollectionName) {
    return postmanToOpenApi(sourceFileName, targetCollectionName, { defaultTag: 'General' })
}

module.exports = {
    generateOpenApi: generateOpenApi,
};