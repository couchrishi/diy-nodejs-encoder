
require('dotenv').config();
const {Storage} = require('@google-cloud/storage');
const {PubSub} = require('@google-cloud/pubsub');
const lib = require('./helpers');
const EventEmitter = require("events").EventEmitter;
const log = require('./log');
const constants = require('./constants');
const config = require('./config');
const encoder = require('./encoder/encoder');
const dboperations = require('./database/dboperations');
const fs = require('fs');
const uuid = require('uuid');
const notifier = require('./notifier.js')
const encoderEngine = {};

encoderEngine.startEncoder = function startEncoder(asset_name, cb) {
  log.info('Starting Job....');
  var dir1 = '/tmp/output';
  var dir2 = '/tmp/input';
  if (!fs.existsSync(dir1)){
      fs.mkdirSync(dir1);
  }
  if (!fs.existsSync(dir2)){
    fs.mkdirSync(dir2);
  }

  const inputLoc = '/tmp/input/' + asset_name;
  const outputLoc = '/tmp/output/' + lib.trimOutputpath(asset_name) + '.mp4';
  const jobid = uuid.v4();
  const source = "gs://" + constants.GCS_INFO.INPUT_BUCKET_NAME + '/' + asset_name;
  console.log(inputLoc, outputLoc, jobid, source);

  notifier
  .on('end', (message, outputLoc) => {
    console.log(message);
    lib.uploadAsset(outputLoc).then((response) => {

     dboperations.updateStatus(jobid, source, 'h.264', new Date().toUTCString(), 'Completed');
     
  }).catch(err => {
    console.log(err);
  });
  })

  .on('error', function () {
    console.log('Error');
  })

  .on('progress', (message, per) => {
    console.log(message);
    dboperations.setProgress(jobid, per);
  });   
  /** 
  lib.getSourceAsset(asset_name, inputLoc).then ((response) => {
    console.log(`Setting Redis hashset for ${jobid}`);
    dboperations.setStatus(dbconn, jobid, source, 'h.264', new Date().toUTCString(), 'Initialized');
    encoder.encode(inputLoc, outputLoc);

  });
  */
 lib.getSourceAsset(asset_name, inputLoc).then ((response) => {
  console.log(`Setting Redis hashset for ${jobid}`);
  dboperations.setStatus(jobid, source, 'h.264', new Date().toUTCString(), 'Initialized');
  encoder.encode(inputLoc, outputLoc);
  }).catch(err => {
    console.log(err);
  });
} 

module.exports = encoderEngine;