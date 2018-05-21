const ReadLineByLine = require('./read.js'),
      fs = require('fs'),
      readline = new ReadLineByLine('./data.txt');

readline.on('error', function (err) {
    console.log(err);
});

readline.on('line', function (line) {

    //Asynchronous 
    fs.appendFile('./xxx.txt', line+'\r\n', (err) => {
        if(err) return console.log(err);
        readline.next();
    });

    //Synchronous 
    //fs.appendFileSync('./xxx.txt', line+'\r\n');
    //readline.next();
});

readline.on('end', function () {
	// All lines are read, file is closed now.
    console.log('end');
});





