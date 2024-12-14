const mysql = require('mysql2/promise');

class MariaDBHelper {
  constructor(tableName) {
    this.config = {
      host: process.env.DB_HOST, // Хост базы данных
      user: process.env.DB_USER, // Имя пользователя базы данных
      password: process.env.DB_PASSWORD, // Пароль пользователя базы данных
      database: process.env.DB_NAME, // Имя базы данных
    };
    this.tableName = tableName;
    this.connection = null;
  }

  // Метод подключения к базе данных
  async connect() {
    try {
      if (!this.connection) {
        this.connection = await mysql.createConnection(this.config);
        console.log('MariaDB Connected...');
      }
    } catch (error) {
      console.error('MariaDB Connection Error:', error);
      throw error;
    }
  }

  // Метод отключения от базы данных
  async disconnect() {
    try {
      if (this.connection) {
        await this.connection.end();
        console.log('MariaDB Disconnected...');
        this.connection = null;
      }
    } catch (error) {
      console.error('MariaDB Disconnection Error:', error);
    }
  }

  // Метод для поиска одной записи
  async findOne(filter) {
    try {
      await this.connect();

      const keys = Object.keys(filter).join(' AND ');
      const values = Object.values(filter);

      const [rows] = await this.connection.execute(
        `SELECT * FROM \`${this.tableName}\` WHERE ${keys} LIMIT 1`,
        values
      );

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error finding record:', error);
      throw error;
    } finally {
        await this.disconnect(); // Закрываем соединение
    }
  }

  // Метод для вставки одной записи
  async insertOne(document) {
    try {
      await this.connect();

      const keys = Object.keys(document).join(', ');
      const placeholders = Object.keys(document).map(() => '?').join(', ');
      const values = Object.values(document);

      const [result] = await this.connection.execute(
        `INSERT INTO \`${this.tableName}\` (${keys}) VALUES (${placeholders})`,
        values
      );

      return result;
    } catch (error) {
      console.error('Error inserting record:', error);
      throw error;
    } finally {
        await this.disconnect(); // Закрываем соединение
    }
  }

  async insertMany(documents) {
    try {
      await this.connect();

      if (!Array.isArray(documents) || documents.length === 0) {
        throw new Error('Documents must be a non-empty array');
      }

      const keys = Object.keys(documents[0]).join(', ');
      const placeholders = Object.keys(documents[0]).map(() => '?').join(', ');
      const values = documents.map(doc => Object.values(doc));

      const query = `INSERT INTO \`${this.tableName}\` (${keys}) VALUES (${placeholders})`;

      for (const valueSet of values) {
        await this.connection.execute(query, valueSet);
      }

      console.log(`${documents.length} records inserted successfully.`);
    } catch (error) {
      console.error('Error inserting multiple records:', error);
      throw error;
    } finally {
      await this.disconnect();
    }
  }

  async getLastRecord() {
    try {
      await this.connect();

      const [rows] = await this.connection.execute(
        `SELECT * FROM \`${this.tableName}\` ORDER BY id DESC LIMIT 1`
      );

      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error fetching last record:', error);
      throw error;
    } finally {
      await this.disconnect(); // Закрываем соединение
    }
  }
}




module.exports = MariaDBHelper;
