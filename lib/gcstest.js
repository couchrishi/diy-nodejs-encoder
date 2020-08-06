
const {Storage} = require('@google-cloud/storage');
const constants = require('./constants');


async function getSourceAsset(srcFilename,outputLoc) {
    console.log("I'm under gcs download");
  
    bucketName = constants.GCS_INFO.INPUT_BUCKET_NAME;
    //destFilename = constants.GCS_INFO.DEST_FILE_LOC + lib.trimOutputpath(srcFilename) + '.mp4';
    
    const storage = new Storage();
    var status = {};
    const options = {
     // The path to which the file should be downloaded, e.g. "./file.txt"
     destination: outputLoc,
     };
     
     try {
         console.log("Inside Try");
         await storage.bucket(bucketName).file(srcFilename).download(options);
         console.log(
             `gs://${bucketName}/${srcFilename} downloaded to ${outputLoc}`
         );
         //console.log(res);
         //status = "Success";
         //return(status);
     }
     catch (err) {
         console.log(err)
         // status = "Error";
         //return(status);
  
     }
         
     }

getSourceAsset('300.mp4', '/tmp/output/')