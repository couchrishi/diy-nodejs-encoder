

//const dboperations = require('./dboperations');
const db = require('./db.test.config.js');
const Job = db.Job;

db.sequelize.sync({force: false}). then(() => {
    console.log('Drop and Resync with {force: false}');
    //initial();
});

//dboperations.setStatus('id100', 'randomsource', 'h.264', new Date().toUTCString(), 'Initialized');
//dboperations.updateStatus('id100');

function getStatusAll() {
    Job.findAll().then(function (alljobs) {
        console.log(alljobs);
        console.log("Hi");
    
    }).catch( err => {
        console.log("Error:" + err);
    });
}

function deleteAll() {
    Job.destroy({
        where: {},
        truncate: true
    })
}

//getStatusAll()
deleteAll()

