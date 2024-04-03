const fs = require('fs');
const { google }= require('googleapis');

const apikeys = require('./apikeys.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];



new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
).then(()=>{
    console.log(x);
    console.log("Authorization Done");
}
).catch((e)=>{
    console.log("Not Authorized DRIVE")
    console.log(e);
});




module.exports = authorize;

