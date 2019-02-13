const fs = require('fs');

function getAllFiles (folderName) {
  fs.readdir(folderName, (err, files) => {
    if (err) {
      console.log('Ошибка чтения каталога');
      throw err;
    }

    for (let file of files) {
      fs.stat(folderName + '/' + file, (err, stats) => {
        if (err) throw err;

        if (!stats.isDirectory()) {
          console.log(file);
        } else {
          getAllFiles(folderName + '/' + file);
        }
      });
    }
  });
}

getAllFiles(__dirname);
