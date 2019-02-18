const fs = require('fs');
const path = require('path');
const folders = {
  input: '',
  output: ''
};

function getAllFiles (folderName) {
  fs.readdir(folderName, (err, files) => {
    if (err) {
      console.error('Ошибка чтения каталога');
      throw err;
    }

    for (let file of files) {
      fs.stat(path.join(folderName, file), (err, stats) => {
        if (err) throw err;

        if (!stats.isDirectory()) {
          let firstCharInFilename = file[0].toUpperCase();
          console.log(file, ' - ', firstCharInFilename);
        } else {
          getAllFiles(folderName + '/' + file);
        }
      });
    }
  });
}

function parseArguments () {
  const program = require('commander');
  program
    .option('-i --input-folder <input-folder>', 'Input folder path')
    .option('-o --output-folder <output-folder>', 'Output folder path')
    .parse(process.argv);
  if (!program.inputFolder) {
    console.log('Please set input folder: \n -i folderName or \n --inputFolder=folderName');
    process.exit(1);
  }
  if (!program.outputFolder) {
    console.log('Please set output folder: \n -o folderName or \n --outputFolder=folderName');
    process.exit(1);
  }
  folders.input = program.inputFolder;
  folders.output = program.outputFolder;
}

parseArguments();
getAllFiles(folders.input);
