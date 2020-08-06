const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('encoderjobs','root','saibalaji', {
    host: '',
    port: '3306',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Job = require('./job.model.js')(sequelize, Sequelize);

module.exports = db;