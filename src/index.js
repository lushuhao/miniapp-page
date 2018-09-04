const program = require('commander')
const fs = require('fs')
const path = require('path')
const colors = require('ansi-colors')
const log = require('fancy-log')

const { name, bin, version } = require('../package.json')
const bins = Object.keys(bin).join(' | ')

function createFile() {
  const [dir, ...fileRestArray] = program.args
  const dirPath = `./${dir}/`
  const fileArray = fileRestArray[0] // 保留输入的可变参数
  const fileName = path.basename(dir)
  // 没有输入文件名，获取最后一个目录名
  !fileArray.length && fileArray.push(fileName)

  let fileList = fileArray.map(file => {
    return createWxFileList(dir, file)
  })

  extendDir(dirPath)

  fileList = Array.prototype.concat(...fileList)
  fileList.forEach(item => {
    if (path.extname(item.file) === '.js') {
      fs.copyFile(path.resolve(__dirname, item.content), path.resolve(dirPath, item.file), (err) => {
        handleError(err, item)
      })
    } else {
      fs.writeFile(`${dirPath}${item.file}`, item.content, (err) => {
        handleError(err, item)
      })
    }
  })
}

function handleError(err, item) {
  if (err) {
    log(colors.red('文件创建失败：'), item.file)
    return log(colors.red(err))
  }
  log(colors.green('文件创建成功：'), item.file)
}

/**
 * 递归生成目录
 * @param path
 */
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

/**
 * 创建微信四个文件
 * @param dir
 * @param file
 * @returns {[file.js,file.json,file.wxml,file.wxss]}
 */
const createWxFileList = (dir, file) => {
  let jsContent = '', jsonContent = ''
  const componentTest = /component/i
  log(colors.cyanBright('生成小程序组件？'), colors.red(componentTest.test(dir)))
  if (componentTest.test(dir)) {
    jsContent = './init/component.js'
    jsonContent = '{\n  "component": true\n}'
  }else {
    jsContent = './init/page.js'
    jsonContent = `{\n  "navigationBarTitleText": "${file}"\n}`
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