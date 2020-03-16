const program = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const colors = require('ansi-colors')
const log = require('fancy-log')

const {name, bin, version} = require('../package.json')
const bins = Object.keys(bin).join(' | ')

const mpTypes = require('./config')

/**
 * 创建文件
 */
function createFile() {
  const [dir, ...fileRestArray] = program.args

  const dirPath = dir.startsWith('./') ? dir : `./${dir}/`
  const fileArray = fileRestArray[0] // 保留输入的可变参数
  const fileName = path.basename(dir)
  // 没有输入文件名，获取最后一个目录名
  !fileArray.length && fileArray.push(fileName)
  let fileList = fileArray.map(file => {
    return createMPFileList(dir, file)
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
 * 创建小程序四个文件
 * @param dir
 * @param file
 * @returns {[file.js,file.json,file.html,file.css]}
 */
const createMPFileList = (dir, file) => {
  const {type} = program
  if (!mpTypes.hasOwnProperty(type)) {
    log(colors.red(`不支持${type}该类型的小程序创建, 默认创建wx小程序`))
    return []
  }
  const [js, json, html, css, templateType] = mpTypes[type]
  let jsContent = '', jsonContent = ''
  const isComponent = program.component || /component/i.test(dir)
  log(colors.cyanBright('生成小程序组件？'), colors.red(isComponent))
  if (isComponent) {
    jsContent = `./template/${templateType}/component.js`
    jsonContent = '{\n  "component": true\n}'
  } else {
    jsContent = `./template/${templateType}/page.js`
    jsonContent = `{\n  "navigationBarTitleText": "${file}"\n}`
  }
  return [
    {
      file: `${file}.${js}`,
      content: jsContent
    },
    {
      file: `${file}.${json}`,
      content: jsonContent
    },
    {
      file: `${file}.${html}`,
      content: `<view class="${file}"></view>`
    },
    {
      file: `${file}.${css}`,
      content: `.${file}{}`
    }
  ]
}

/**
 * 引导输入目录路径
 */
function inputFileName() {
  const questions = {
    type: 'input',
    name: 'fileName',
    message: '请输入生成模版文件名称?',
    default: path.basename(program.args[0]) || 'index',
  }
  inquirer
    .prompt(questions)
    .then(answer => {
      program.args.push([answer.fileName])
      createFile()
    })
}

/**
 * 引导输入目录路径
 */
function inputDirPath() {
  const dirPath = 'pages/index'
  const questions = {
    type: 'input',
    name: 'dirPath',
    message: '请输入生成模版目录地址?',
    default: dirPath,
  }
  inquirer
    .prompt(questions)
    .then(answer => {
      program.args = [answer.dirPath || dirPath]
      inputFileName()
    })
}

/**
 * 引导选择类型
 */
function selectType() {
  const questions = {
    type: 'list',
    name: 'type',
    message: '选择想要创建的小程序模版类型',
    choices: Object.keys(mpTypes)
  }
  inquirer
    .prompt(questions)
    .then(answer => {
      program.type = answer.type
      inputDirPath()
    })
}

program.usage('[command] <options ...>')

program
  .version(version)
  .option('-v, --version', `show ${name} current version`)
  .option('-t, --type <type>', 'select mini program type, ps: default wx swan my tt xm', 'wx')
  .option('-c, --component', 'create component dir')
  .arguments('<path> [file...]')
  .description(`${bins} <path> [file...] \n  create one dir to ./path\n  create four files file.js、file.json、file.css、file.html`)
  .action(createFile)

program.parse(process.argv)

// 默认提示选择小程序类型
if (process.argv.length === 2) {
  selectType()
} else if (program.args.length === 0) {
  inputDirPath()
}

