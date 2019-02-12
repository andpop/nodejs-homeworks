const fs = require('fs');

fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.log('Ошибка чтения каталога');
  }
  files.forEach((item) => {
    console.log(item);
  });
});
