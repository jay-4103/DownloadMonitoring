const blob = require("@azure/storage-blob");


const AZURE_STORAGE_CONNECTION_STRING = 
  "DefaultEndpointsProtocol=https;AccountName=btechminiproject;AccountKey=lADlexCUcFK3GVt0xZhfxKPJHLeRzggdVBM+KsYrn60u6bUdEBTIW3ldEZZew7khL+qnaUgXsGrM+ASto+SjhQ==;EndpointSuffix=core.windows.net";

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw Error('Azure Storage Connection string not found');
}

// Create the BlobServiceClient object with connection string
const blobServiceClient = blob.BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

if(blobServiceClient){
    console.log("Azure Blob Connected");
}

module.exports = blobServiceClient;