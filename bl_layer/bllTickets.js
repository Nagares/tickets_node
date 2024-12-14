const MariaDBHelper = require('./db_leyer/MariaDBHelper');


const dbHelper = new MariaDBHelper('tickets');

const insertManyTickets = async (tickets) =>{
    try {
      await dbHelper.insertMany(tickets);
      console.log('Все tickets успешно сохранены.');
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  }
  module.exports = { insertManyTickets };