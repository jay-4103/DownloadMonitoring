const mongoose = require('mongoose');

// Define the schema for your collection
const fileSchema = new mongoose.Schema({
    arnumber: {
        type: String,
    },
    fileName: {
        type: String,
    },
    fileDownloadUrl: {
        type: String,
    }
});

// Create a model using the schema
const File = mongoose.model('File', fileSchema);

module.exports = File;