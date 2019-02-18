const fs = require('fs');
const path = require('path');
const folders = {
  input: '',
  output: ''
};

const NO_INPUT_FOLDER_ARGUMENT = 1;
const NO_OUTPUT_FOLDER_ARGUMENT = 2;
const NO_INPUT_FOLDER = 3;
const OUTPUT_FOLDER_CREATE_ERROR = 4;

function parseArguments () {
  const program = require('commander');
  program
    .option('-i --input-folder <input-folder>', 'Input folder path')
    .option('-o --output-folder <output-folder>', 'Output folder path')
    .parse(process.argv);
  if (!program.inputFolder) {
    console.log('Please set input folder: \n -i folderName or \n --inputFolder=folderName');
    process.exit(NO_INPUT_FOLDER_ARGUMENT);
  }
  if (!program.outputFolder) {
    console.log('Please set output folder: \n -o folderName or \n --outputFolder=folderName');
    process.exit(NO_OUTPUT_FOLDER_ARGUMENT);
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

function getOutFolderForFile (filename) {
  let folderName = filename.charAt(0).toUpperCase();
  return path.join(folders.output, folderName);
}

function copyFile (fullFilename) {
  let outFolder, outputFileName;
  let file = path.basename(fullFilename);
  outFolder = getOutFolderForFile(file);
  outputFileName = path.join(outFolder, file);
  if (!fs.existsSync(outFolder)) {
    try {
      fs.mkdirSync(outFolder);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  fs.copyFileSync(fullFilename, outputFileName);

  console.log(`${fullFilename} -> ${outputFileName}`);
}

function getAllFiles (folderName) {
  fs.readdir(folderName, (err, files) => {
    if (err) {
      console.error(`Input folder (${folders.input}) read error.`);
      throw err;
    }

    for (let file of files) {
      let fullName = path.join(folderName, file);
      fs.stat(fullName, (err, stats) => {
        if (err) throw err;

        if (!stats.isDirectory()) {
          copyFile(fullName);
        } else {
          getAllFiles(fullName);
        }
      });
    }
  });
}

parseArguments();
checkInputFolder(folders.input);
makeOutputFolder(folders.output);
console.log(`Copying files: ${folders.input} => ${folders.output}`);
getAllFiles(folders.input);
