const uploadAzure = require("./azureupload");


const upload = async (name) => {
    try {
        // console.log(req.files);
        // console.log();
        const temp = await uploadAzure(name);
        // console.log(temp);
        return temp;
        //This temp link need to store into our MONGOS DATABASE.
    } catch (error) {
        console.log("error from /cloudupload.js");
        console.log(error);
        return "";
    }
}

module.exports = upload;
