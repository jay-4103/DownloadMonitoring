const upload = require("./cloudupload");
const fileData = require("./model");

const reading = async (req, res) => {
    try {
        console.log("Hello");
        console.log(req.body);
        console.log(req.files);

        const file = req.files.paper;
        const url = await upload(file.tempFilePath);
        console.log(url);

        const x = req.body.fileNameWithoutExtension;
        const y = req.body.arnumber1;

        const newData = new fileData({
            arnumber:y,
            fileName:x,
            fileDownloadUrl:url
        });

        const saved = await newData.save();
        res.status(200).send();
    } catch (error) {
        console.log("Error from main js");
        console.log(error);
        res.status(500).json({ 'error': 'An error occured during reading the file.' });
    }
}

module.exports = reading;
