require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const constants = require('./constants');
const path = require('path');
const cwd = path.join(__dirname, '..');
const lib = {};


lib.getSourceAsset =  async function getSourceAsset(srcFilename,outputLoc) {
    
    bucketName = constants.GCS_INFO.INPUT_BUCKET_NAME;
    const storage = new Storage();
    var status = {};
    const options = {
        destination: outputLoc,
        };
        
    try {
        res =  await storage.bucket(bucketName).file(srcFilename).download(options);
        console.log(
            `gs://${bucketName}/${srcFilename} downloaded to ${outputLoc}`
        );
    }
    catch (err) {
        console.log(err)
        res =  "Error"
    }
    return res;
    }
   
lib.uploadAsset = async function uploadAsset(destFileloc) {
    bucketName = constants.GCS_INFO.OUTPUT_BUCKET_NAME;
    const storage = new Storage();
    const bucket = storage.bucket(bucketName);
    res = await bucket.upload(destFileloc, function(err, file) {
            if (err) throw new Error(err);
            return res;
        });

}

lib.trimOutputpath = function trimOutputpath(filename) {
    var str = filename.toString();
    namearr = str.split('.'); 
    namearr.pop(); 
    return namearr.join('.');
}

module.exports = lib;
