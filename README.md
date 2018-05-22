# ReadLine By Line
a nodejs module to read data line by line.
## Installation:
```shell
npm install readlinebyline
```
## Usage:
Synchronous processing of lines:
```javascript
const fs = require('fs');
const ReadLineByLine = require('readlinebyline');
const readline = new ReadLineByLine('data.txt');

readline.on('error', (err) => console.log(err));
readline.on('line', (line) => {
    fs.appendFileSync('out.txt', line +'\r\n');
    readline.next();
});
readline.on('end', () => console.log('end'));

```
Asynchronous processing of lines:
```javascript
const fs = require('fs');
const ReadLineByLine = require('readlinebyline');
const readline = new ReadLineByLine('data.txt');

readline.on('error', (err) => console.log(err));
readline.on('line', (line) => {
    fs.appendFile('out.txt', line +'\r\n', (err) => {
        if(err) return console.log(err);
        readline.next();
    });
});
readline.on('end', () => console.log('end')); 

```



