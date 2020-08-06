

const dboperations = {};
//MySQL connectors
const sqldb = require('./db.config');
const Job = sqldb.Job;

//Redis connectors
const redisdb = require('./dbconnect');
const redisconn = redisdb.createConn();

dboperations.setStatus = function setStatus(clientobj, videoId, source, preset, createDate, displayStatus) {

    clientobj.hset("status", videoId, JSON.stringify({"source": source, "preset": preset, "created": createDate, "displayStatus": displayStatus}));
    
}

dboperations.setStatus = function setStatus(videoId, source, preset, createDate, displayStatus) {
    Job.create({
        "videoId": videoId,
        "source": source,
        "preset": preset,
        "created": createDate,
        "displayStatus": displayStatus
    }).then( Job => {
        if (Job) {
            console.log("Success");
        }}).catch(err => {
        console.log(err);
    //res.status(500).send('Error -> ' + err);
  });
}

dboperations.updateStatus = function updateStatus(jobId) {

  Job.findOne({ 
      where: { 
          videoId: jobId
        } 
    }).then( Job => {
        if (Job) {
            Job.update({ 
              displayStatus: 'Completed'
            })
    }
    }).catch(err => {
        console.log(err);
  });
}

dboperations.getStatusAll = function getStatusAll() {
    Job.findAll().then(function (alljobs) {
        console.log(alljobs);    
    }).catch( err => {
        console.log("Error:" + err);
    });
}

dboperations.setProgress = function setProgress(videoId, progress) {

    redisconn.hset("progress", videoId, progress);
}

dboperations.getProgressAll = function getProgressAll (clientobj) {

    redisconn.hgetall("status", function(err, object) {
        console.log(object);
    });
}

module.exports = dboperations;