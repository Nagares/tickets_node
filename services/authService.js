const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();



async function authenticate() {
    try {
        
        const authPayload = {
            login: process.env.LOGIN,
            password: process.env.PASSWORD,
        };

        const response = await axios.post( process.env.AUTH_URL, authPayload);

        // Обработка успешного ответа
        if (response.data.status === 'OK') {
            const token = response.data.response.token;
            console.log('Успешная аутентификация! Токен:', token);
            return token;
        } else {
            console.error('Ошибка аутентификации:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Произошла ошибка при аутентификации:', error.message);
        return null;
    }
}

module.exports = { authenticate };