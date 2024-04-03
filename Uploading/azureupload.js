const blob = require("@azure/storage-blob");
const fs = require('fs');


const blobServieient = require("./connection");
const blobServiceClient = require("./connection");


// Create a unique name for the blob

const docsUpload = async (name) => {

    try {

        console.log(blobServiceClient);

        const containerClient = blobServiceClient.getContainerClient("researchpaper");
        
        const blockBlobClient = containerClient.getBlockBlobClient(name);

        // console.log(
        //     \nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}
        // );

        const url = blockBlobClient.url;

        const uploadBlobResponse = await blockBlobClient.uploadFile(name);

        // console.log(
        //     Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}
        // );

        // console.log(url);
        
        return url;

    } catch (error) {
        console.log("This is error from ./blob/azureBlob.js");
        console.log(error);
        return "";
    }
}





module.exports = docsUpload;