const mongoose = require('mongoose');
const { PROD_DB_URL } = require('./server.config');

const connectToDB = async () => {
    try {
        await mongoose.connect(PROD_DB_URL);
    } catch (error) {
        console.error("Unable to connect to the DB");
        console.error(error);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectToDB;