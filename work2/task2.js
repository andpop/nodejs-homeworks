const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const Events = require('events');
const util = require('util');

const NO_INPUT_FOLDER_ARGUMENT = 1;
const NO_OUTPUT_FOLDER_ARGUMENT = 2;
const NO_INPUT_FOLDER = 3;
const OUTPUT_FOLDER_CREATE_ERROR = 4;

const folders = {
  input: '',
  output: ''
};

let isDeleteInputFolder = false;

function parseArguments () {
  const program = require('commander');
  program
    .option('-i --input-folder <input-folder>', 'Input folder path')
    .option('-o --output-folder <output-folder>', 'Output folder path')
    .option('-d --delete-input-folder', 'Delete input folder after copying files')
    .parse(process.argv);
  if (!program.inputFolder) {
    console.log('Please set input folder: \n -i folderName or \n --inputFolder=folderName');
    process.exit(NO_INPUT_FOLDER_ARGUMENT);
  }
  if (!program.outputFolder) {
    console.log('Please set output folder: \n -o folderName or \n --outputFolder=folderName');
    process.exit(NO_OUTPUT_FOLDER_ARGUMENT);
  }
  if (program.deleteInputFolder) {
    isDeleteInputFolder = true;
  }
  folders.input = program.inputFolder;
  folders.output = program.outputFolder;
}

function checkInputFolder (folder) {
  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
    console.log(`There is no input folder: ${folder}`);
    process.exit(NO_INPUT_FOLDER);
  }
}

function makeOutputFolder (folder) {
  if (!fs.existsSync(folder)) {
    try {
      fs.mkdirSync(folder);
    } catch (err) {
      console.log(`Output folder (${folder}) creation error.`);
      process.exit(OUTPUT_FOLDER_CREATE_ERROR);
    }
  }
}

function getOutFolderForFile (filename, toFolder) {
  let folderName = filename.charAt(0).toUpperCase();
  return path.join(toFolder, folderName);
}

function copyFile (fullFilename, toFolder) {
  let outFolder, outputFileName;
  let file = path.basename(fullFilename);

  outFolder = getOutFolderForFile(file, toFolder);
  outputFileName = path.join(outFolder, file);
  if (!fs.existsSync(outFolder)) {
    try {
      fs.mkdirSync(outFolder);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  fs.copyFile(fullFilename, outputFileName, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(`${fullFilename} -> ${outputFileName}`);

    numberFileToCopy--; // Файл скопирован - уменьшаем счетчик

    if (numberFileToCopy < 1) {
      eventEmitter.emit('last_file_is_copied');
    }
  });
}

function copyAllFiles (fromFolder, toFolder) {
  fs.readdir(fromFolder, (err, files) => {
    if (err) {
      console.error(`Input folder (${fromFolder}) read error.`);
      throw err;
    }

    for (let file of files) {
      let fullName = path.join(fromFolder, file);

      const stat = util.promisify(fs.stat);

      stat(fullName)
        .then(stats => {
          if (!stats.isDirectory()) {
            numberFileToCopy++; // Найден еще один файл для копирования - увеличиваем счетчик
            copyFile(fullName, toFolder);
          } else {
            copyAllFiles(fullName, toFolder);
          }
        })
        .catch(err => {
          throw err;
        });
    }
  });
}

const eventEmitter = new Events();
eventEmitter.on('last_file_is_copied', () => {
  if (isDeleteInputFolder) {
    rimraf(folders.input, (err) => {
      if (err) throw err;
    });
  }
});

// =======================================================================================
parseArguments();
checkInputFolder(folders.input);
makeOutputFolder(folders.output);

console.log(`Copying files: ${folders.input} => ${folders.output}`);
console.log('---------------------------------------------------------------------------');

let numberFileToCopy = 0; // Количество файлов, которые еще не скопированы

try {
  copyAllFiles(folders.input, folders.output);
} catch (err) {
  console.error('Error: ', err);
}
