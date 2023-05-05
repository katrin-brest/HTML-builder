const fs =  require('fs/promises')
const path = require('path')

async function getFiles() {
  try {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});
    for(let file of files) {
      if(file.isFile()) {
        const name = file.name.slice(0, file.name.lastIndexOf('.'))
        const ext = path.extname(file.name).slice(1)
        const st = await fs.stat(path.join(__dirname, 'secret-folder', file.name))
        const size = (st.size / 1024)
        console.log(`${name} - ${ext} - ${size}kb`)
      }
    }
  }
  catch(error) {
    console.log(error)
  }
}
getFiles()
