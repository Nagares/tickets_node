const { authenticate } = require('./services/authService');
const { exportUsers, exportOrders } = require('./services/exportService');


(async () => {

    
    // const token = await authenticate();
   

    // if (token) {
    //     console.log('Теперь вы можете использовать токен для других операций.');
    //     const users = await exportUsers(token);
    //     const orders = await exportOrders(token);
    // } else {
    //     console.log('Аутентификация не удалась. Проверьте свои учетные данные.');
    // }
})();


