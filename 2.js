let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (cmd) {
  console.log('You just typed: ' + cmd);
});

rl.close();
