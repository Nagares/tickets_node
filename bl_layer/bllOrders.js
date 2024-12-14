const MariaDBHelper = require('./db_leyer/MariaDBHelper');


const dbHelper = new MariaDBHelper('orders');

const findUserInDatabase = async (orderCode) => {
    return await dbHelper.findOne({ order_code: orderCode });
};

const saveUserToDatabase = async (order) => {
    return await dbHelper.insertOne(order);
};

module.exports = { findUserInDatabase, saveUserToDatabase };
