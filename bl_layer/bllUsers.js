const MariaDBHelper = require('./db_leyer/MariaDBHelper');


const dbHelper = new MariaDBHelper('users');

const findUserInDatabase = async (userCode) => {
    return await dbHelper.findOne({ user_code: userCode });
};

const saveUserToDatabase = async (user) => {
    return await dbHelper.insertOne(user);
};

module.exports = { findUserInDatabase, saveUserToDatabase };
