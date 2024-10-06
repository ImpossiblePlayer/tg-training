const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();

// Замените на ваш Telegram Bot Token и Chat ID
const TELEGRAM_BOT_TOKEN = '7899702897:AAGn4exdP9z__2HQ5lBxMDuJDxip9qfXBgs';
const TELEGRAM_CHAT_ID = '855655252';

// Middleware для обработки данных формы
app.use(bodyParser.urlencoded({ extended: true }));

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // Папка для шаблонов


// Маршрут для обработки формы
app.post('/send-telegram', (req, res) => {
    const { name, phone } = req.body;
    const message = `Новая регистрация:\nИмя: ${name}\nТелефон: ${phone}`;

    // Отправляем запрос к Telegram API
    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message
    })
    .then(response => {
        console.log('Сообщение отправлено в Telegram:', response.data);
        res.status(200).render('success', { name, phone });  // Рендерим шаблон с данными
    })
    .catch(error => {
        console.error('Ошибка отправки сообщения в Telegram:', error);
        res.status(500).render('error');  // Рендерим шаблон ошибки
    });
});


// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});