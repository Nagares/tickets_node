const MariaDBHelper = require('./db_leyer/MariaDBHelper');

const dbHelper = new MariaDBHelper('ticket_codes');

const insertManyTicketsCodes = async (ticketCodes) =>{
    try {
      await dbHelper.insertMany(ticketCodes);
      console.log('Все ticketsCodes успешно сохранены.');
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  }

  const getLastTicketsCodes = async () =>{
    try {
        const lastRecord = await dbService.getLastRecord(); 
        console.log('last ticketsCodes',lastRecord);
        return lastRecord;
     
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
      return null;
    }
  }

  module.exports = { insertManyTicketsCodes,getLastTicketsCodes };