# Серверная часть для домашней страницы музыканта
Реализована на Koa.js в духе MVC

### Возможности
* Данные хранятся в локальной JSON-БД models/work3-db.json
* Есть админка для ввода и изменения данных. Доступна только авторизованному пользователю
* С главной страницы можно отправить сообщение по электронной почте.

### Структура проекта
**/config** Настройки сессий и smtp для отправки сообщений.  
**/controllers** Контроллеры для главной страницы, формы регистрации и админки  
**/libs** Вспомогательные функции.  
**/models** Консольная утилита addAdmin.js для ввода и сохранения в БД учетных данных администратора.
База данных work3-db.json. Модели для товаров, скилов и пользователя.  
**/public/assets** CSS и JavaScript для клиента.  
**/public/upload** Загружаемые от клиента картинки для товаров.  
**/routes** Роуты на все возможные маршруты.  
**/views** Шаблоны страниц для рендеринга (шаблонизатор Pug).


### Запуск
```node app.js``` или ```nodemon --ignore models/work3-db.json app.js```  
По умолчанию сервер слушает порт 3000. 
