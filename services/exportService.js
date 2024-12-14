const axios = require('axios');
const dotenv = require('dotenv');
const EXPORT_USERS_URL = 'https://vidkrytyi.com.ua/api/users/export';
const EXPORT_ORDERS_URL = 'https://vidkrytyi.com.ua/api/orders/export';



dotenv.config();

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
    }



async function exportUsers(token) {
    try {
    const payload = {
    token: token,
    from: getCurrentDate(),
    };
    const response = await axios.post(EXPORT_USERS_URL, payload);

    if (response.data.status === 'OK') {
        console.log('Экспорт пользователей выполнен успешно:', response.data.response);

        response.then(async (data) => {
            for (const item of data) {
                // Переписываем данные в формат order
                const order = {
                    order_code: item.order_code,
                    user: item.user,
                    total_quantity: item.total_quantity,
                    product_id: item.product_id,
                };
        
                // Проверяем существование записи в базе данных
                const existingOrder = await findOrderInDatabase(order.order_code);
        
                // Если запись не найдена, сохраняем её
                if (!existingOrder) {
                    await saveOrderToDatabase(order);

                } else {
                    console.log(`Order с кодом ${order.order_code} уже существует.`);
                }
            }
        }).catch((error) => {
            console.error("Ошибка обработки данных:", error);
        }
        )






        return response.data.response;
    } else {
        console.error('Ошибка при экспорте пользователей:', response.data);
        return null;
    }
} catch (error) {
    console.error('Произошла ошибка при экспорте пользователей:', error.message);
    return null;
}}


async function exportOrders(token) {
    try {
    const payload = {
    token: token,
    status: 2,
    };
    const response = await axios.post(EXPORT_ORDERS_URL, payload);

    if (response.data.status === 'OK') {
        console.log('Экспорт заказов выполнен успешно:', response.data.response);
        return response.data.response;
    } else {
        console.error('Ошибка при экспорте заказов:', response.data);
        return null;
    }
} catch (error) {
    console.error('Произошла ошибка при экспорте заказов:', error.message);
    return null;
}}
module.exports = { exportUsers, exportOrders };