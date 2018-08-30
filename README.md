# miniapp-page 
创建小程序目录及四个文件

[![npm](https://img.shields.io/npm/v/miniapp-page.svg)](https://www.npmjs.com/package/miniapp-page)
[![npm](https://img.shields.io/npm/dt/miniapp-page.svg)](https://www.npmjs.com/package/miniapp-page)
[![GitHub license](https://img.shields.io/github/license/lushuhao/miniapp-page.svg)](https://github.com/lushuhao/miniapp-page/blob/master/LICENSE)

## 开始上手

### 安装

```shell
npm i -g miniapp-page
```

### 使用示例
在命令行输入
```npm
miniapp-page -h
wx -h
```
输出 user/test $ miniapp-page -h
```text
Usage: miniapp-page [command] <options ...>
  
miniapp-page | wx <path> <file> 
create one dir to ./path
create four files to ./path/file, file.js、file.json、file.wxss、file.wxml

Options:

  -V, --version  output the version number
  -v, --version  show miniapp-page current version
  -h, --help     output usage information
```

```npm
miniapp-page dir file
wx dir file
```
```npm
miniapp-page dir/dir2 file
wx dir/dir2 file
```

命令行运行在/user/test目录下

会在当前目录下递归创建目录，并生成四个文件，如下

```text
创建文件夹： ./dir
文件创建成功： file.wxml
文件创建成功： file.json
文件创建成功： file.wxss
文件创建成功： file.js
```

```text
创建文件夹： ./dir
创建文件夹： ./dir/dir2
文件创建成功： file.wxml
文件创建成功： file.json
文件创建成功： file.wxss
文件创建成功： file.js
```

## 开源证书

[**The MIT License**](http://opensource.org/licenses/MIT).
