const { error } = require('console')
const fs =  require('fs/promises')
const path = require('path')

const styles = path.join(__dirname, 'styles')

async function mergeStyles (folder) {
  const projectDist = path.join(__dirname, 'project-dist','bundle.css')
  await fs.rm(projectDist, {force:true})
  const files = await fs.readdir(folder, {withFileTypes:true})
  const promises = files.filter(file => file.isFile() && path.extname(file.name) === '.css').map( file => fs.readFile(path.join(folder, file.name) , 'utf-8'))
  let result = await Promise.all(promises)
  await fs.writeFile(projectDist, result.join('\n'), 'utf-8')
}

mergeStyles(styles).catch(error => console.log(error))