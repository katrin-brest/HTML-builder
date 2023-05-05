const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8')
stdout.write('Enter text \n')

stdin.on('data', (data) => {
  const dataStr = data.toString()
  if (dataStr.includes('exit')) {
    stdout.write('good luck!')
    process.exit()
  } else {
    output.write(data)
  }
} )

process.on('SIGINT', ()=> {
  stdout.write('good luck!');
  process.exit()
 })
