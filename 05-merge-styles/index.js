const fs =  require('fs/promises')
const path = require('path')

const styles = path.join(__dirname, 'styles')

async function mergeStyles (folder) {
  const projectDist = path.join(__dirname, 'project-dist','bundle.css')
  await fs.rm(projectDist, {force:true})
  const bundle = await fs.writeFile(projectDist, '', 'utf-8')
  const files = await fs.readdir(folder, {withFileTypes:true})
  for(let file of files) {
    if(file.isFile() && path.extname(file.name) === '.css') {
      const style = await fs.readFile(path.join(folder, file.name) , 'utf-8')
      await fs.appendFile(projectDist, style, 'utf-8')
     }
  }
}

mergeStyles(styles)