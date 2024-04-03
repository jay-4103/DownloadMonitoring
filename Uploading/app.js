const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const cloudUpload = require("./cloudupload");
const reading = require('./main');
// const GoogleUpload = require("./googleupload");



// require("./auth");
require("./connect");
require("./connection");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for handling file uploads
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Route for testing
app.post("/test", (req, res) => {
    res.send("Test route reached successfully");
});


app.post("/reading",reading)


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
