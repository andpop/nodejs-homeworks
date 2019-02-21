const http = require('http');
require('dotenv').config();

const INTERVAL_TIME_DEFAULT = 1000;
const STOP_INTERVAL_TIME_DEFAULT = 4000;
const PORT_NUMBER = 8080;

let intervalTime = process.env.INTERVAL_TIME || INTERVAL_TIME_DEFAULT;
let stopIntervalTime = process.env.STOP_INTERVAL_TIME || STOP_INTERVAL_TIME_DEFAULT;

http.createServer((req, res) => {
  let timer = setInterval(() => {
    console.log(Date());
  }, intervalTime);

  setTimeout(() => {
    clearInterval(timer);
    res.end(Date());
  }, stopIntervalTime);
}).listen(PORT_NUMBER);
