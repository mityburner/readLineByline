const ReadLineByLine = require('./read.js'),
      fs = require('fs'),
      readline = new ReadLineByLine('./all.txt');

readline.on('error', (err) => console.log(err));
readline.on('line', (line) => {
    //Asynchronous 
    fs.appendFile('./xxx.txt', line+'\r\n', (err) => {
        if(err) return console.log(err);
        readline.next();
    });

    // Synchronous 
    // fs.appendFileSync('./xxx.txt', line+'\r\n');
    // readline.next();
});
readline.on('end', () => console.log('end')); 





