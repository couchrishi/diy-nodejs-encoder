const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('encoderjobs','root','saibalaji', {
    host: '127.0.0.1',
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

//Passing the User Model to the DB connection object
db.Job = require('./job.model.js')(sequelize, Sequelize);

//Setting the associations for user which belongs to one or many roles
//db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

module.exports = db;