const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8')
stdout.write('Enter text \n')

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    sayBye()
  } else {
    output.write(data)
  }
} )

process.on('SIGINT', ()=> {
  sayBye()
 })

 function sayBye() {
  stdout.write('good luck!');
  process.exit()
 }
