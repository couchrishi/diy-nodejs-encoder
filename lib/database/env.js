const env = {

    host: process.env.SOCKET_PATH,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: '3306',
    dialect: 'mysql',
    dialectOptions: {
        socketPath: process.env.SOCKET_PATH
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;