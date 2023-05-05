const fs =  require('fs/promises')
const path = require('path')

const source = path.join(__dirname, 'files');
const output = path.join(__dirname, 'files-copy');

async function copyDir(from, to) {
  await fs.rm(to, {recursive:true, force:true})
  await fs.mkdir(to)
  const files = await fs.readdir(from) 
  for(let file of files) {
    await fs.copyFile(path.join(from, file), path.join(to, file))
    console.log(`${file} is copied`);
  }
}
copyDir(source, output)