const path = require('path');
const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, 'work3-db.json'));
const db = low(adapter);

// Пробовал инициализировать пустой файл - получилось, но запись в него шла постоянно, nodemon перегружался постоянно
// Получилось так: nodemon --ignore models/work3-db.json app.js
db.defaults({ products: [], skills: {} }).write();

module.exports = db;
