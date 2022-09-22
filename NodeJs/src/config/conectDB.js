

const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('d5al4obbk7ugeh', 'uzugkofcaficrf', '4ca33dacdda07433c332beb49217bec210522b9cab55894dbe05fee40f831641', {
    host: 'ec2-3-229-165-146.compute-1.amazonaws.com',
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
      }
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;