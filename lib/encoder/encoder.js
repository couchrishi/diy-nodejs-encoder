
require('dotenv').config();
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const log = require('../log');
const lib = require('../helpers');
const constants = require('../constants');
var notifier = require('../notifier.js')

const encoder = {};

encoder.encode = function encode(inputFile, outputFile) {
  
  const startTime = Date.now();

    const ffmpegCommand = ffmpeg()
      .input(inputFile)
      .videoBitrate(1000)
      .videoCodec('libx264')
      .size('640x480')
      .audioCodec('libmp3lame')
      .audioBitrate('128k')
      .audioFrequency(22050)
      .withOutputOptions('-force_key_frames expr:gte(t,n_forced*2)')
      .outputOption('-x264-params keyint=48:min-keyint=48:scenecut=0:ref=5:bframes=3:b-adapt=2')
      .on('progress', (info) => {
        const message = {};
        message.type = constants.WORKER_MESSAGE_TYPES.PROGRESS;
        message.message = `Encoding: ${Math.round(info.percent)}%`;
        notifier.emit('progress', message, Math.round(info.percent));
      })
      .on('end', () => {
        const message = {};
        message.type = constants.WORKER_MESSAGE_TYPES.DONE;
        const endTime = Date.now();
        message.message = `Encoding finished after ${(endTime - startTime) / 1000} s`;
        notifier.emit('end', message, outputFile);
      })
      .on('error', (err, stdout, stderr) => {
        const message = {};
        message.type = constants.WORKER_MESSAGE_TYPES.ERROR;
        message.message = `An error occurred during encoding. ${err.message}`;
        log.error(`Error: ${err.message}`);
        log.error(`ffmpeg output: ${stdout}`);
        log.error(`ffmpeg stderr: ${stderr}`);
        notifier.emit('error', message, outputFile);
        
      })
      .save(outputFile);
    };

module.exports = encoder;