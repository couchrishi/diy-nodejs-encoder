module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define('jobs', {
        videoId: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        source: {
            type: Sequelize.STRING
        },
        preset: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE
        },
        displayStatus: {
            type: Sequelize.STRING

        },
        
    });
    
    return Job;
}
