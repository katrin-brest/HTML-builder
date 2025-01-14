const fsProm =  require('fs/promises')
const fs =  require('fs')
const path = require('path')

async function buildPage(folder) {
  await fsProm.rm(folder, {force:true, recursive:true})
  await fsProm.mkdir(folder)
  
  // create and fill index.html
  encodeFile(path.join(__dirname, 'template.html'), folder) 

  // create and fill style.css
  mergeStyles(folder)
  
 // copy assets
  await fsProm.mkdir(path.join(folder, 'assets'))
  copyFolder(path.join(__dirname, 'assets'), path.join(folder, 'assets'))
}

async function copyFolder(input, output) {
  const folder = await fsProm.readdir(input, {withFileTypes:true})
  for (let elem of folder) {
    if(elem.isFile()) {
      await fsProm.copyFile(path.join(input, elem.name), path.join(output, elem.name))
    } else {
      await fsProm.mkdir(path.join(output, elem.name))
      copyFolder(path.join(input, elem.name), path.join(output, elem.name))
    }
  }
}

async function encodeFile(file, outputDir) {
  let data = ''
  const stream = fs.createReadStream(file, 'utf-8')
  stream.on('data', chunk => data += chunk)
  stream.on('end', async() => {
    const templates = data.match(/{{+[a-z]+}}/gi)
    for(let template of templates) {
      const file = await fsProm.readFile(path.join(__dirname, 'components', `${template.slice(2, -2)}.html`))
      data = data.replace(template, file.toString())
    }
    await fsProm.writeFile(path.join(outputDir, 'index.html'), data)
  })
}

async function mergeStyles (folder) {
  let files = await fsProm.readdir(path.join(__dirname, 'styles'), {withFileTypes:true})
  files = files.filter(file => file.isFile() && path.extname(file.name) === '.css').map( file => fsProm.readFile(path.join(__dirname, 'styles', file.name)))
  let result = await Promise.all(files)
  await fsProm.writeFile(path.join(folder, 'style.css'), result.join('\n'), 'utf-8')
}


buildPage(path.join(__dirname, 'project-dist')).catch(error => console.log(error))