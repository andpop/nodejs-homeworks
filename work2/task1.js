const http = require('http');
require('dotenv').config();

let intervalTime = process.env.INTERVAL_TIME;
let stopIntervalTime = process.env.STOP_INTERVAL_TIME;

http.createServer((req, res) => {
  console.log('Server is running...');

  let timer = setInterval(() => {
    console.log(Date());
  }, intervalTime);

  setTimeout(() => {
    clearInterval(timer);
    res.end(Date());
  }, stopIntervalTime);
}).listen(8081);
