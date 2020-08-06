const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    //host: env.host,
    //socketPath: env.socketPath,
    dialect: env.dialect,
    dialectOptions: env.dialectOptions,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
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