const program = require('commander')
const fs = require('fs')
const colors = require('ansi-colors')
const log = require('fancy-log')

const { name, bin, version } = require('../package.json')
const bins = Object.keys(bin).join(' | ')

function createFile() {
  let [dir, ...fileArray] = program.args
  const path = `./${dir}/`
  fileArray = fileArray[0] // 保留输入的可变参数
  const fileName = dir.split('/').pop()
  // 没有输入文件名，获取最后一个目录名
  !fileArray.length && fileArray.push(fileName)

  let fileList = fileArray.map(file => {
    return createWxFileList(dir, file)
  })

  extendDir(path)

  fileList = Array.prototype.concat(...fileList)
  fileList.forEach(item => {
    fs.writeFile(`${path}/${item.file}`, item.content, (err) => {
      if (err) {
        log(colors.red(err))
      }
      log(colors.green('文件创建成功：'), `${item.file}`)
    })
  })
}

// 递归创建目录
function extendDir(path) {
  if (!path || fs.existsSync(path)) return
  const dirList = path.split('/')
  dirList.reduce((pathName, dir) => {
    if (!fs.existsSync(pathName)) {
      fs.mkdirSync(pathName)
      log(colors.green('创建文件夹：'), pathName)
    }
    return `${pathName}/${dir}`
  })
}

const createWxFileList = (dir, file) => {
  let jsContent = '', jsonContent = ''
  switch (dir) {
  case 'components':
    jsContent = 'Component({})'
    jsonContent = '{\n  "component": true\n}'
    break
  default:
    jsContent = 'Page({})'
    jsonContent = `{\n  "navigationBarTitleText": "${file}"\n}`
    break
  }
  return [
    {
      file: `${file}.js`,
      content: jsContent
    },
    {
      file: `${file}.json`,
      content: jsonContent
    },
    {
      file: `${file}.wxml`,
      content: `<view class="${file}"></view>`
    },
    {
      file: `${file}.wxss`,
      content: `.${file}{}`
    }
  ]
}

program.usage('[command] <options ...>')

program
  .version(version)
  .option('-v, --version', `show ${name} current version`)
  .arguments('<path> [file...]')
  .description(`${bins} <path> [file] \n  create one dir to ./path\n  create four files to ./path/file, file.js、file.json、file.wxss、file.wxml`)
  .action(createFile)

program.parse(process.argv)