# miniapp-create 
创建小程序目录及四个文件

[![npm](https://img.shields.io/npm/v/miniapp-create.svg)](https://www.npmjs.com/package/miniapp-create)
[![npm](https://img.shields.io/npm/dt/miniapp-create.svg)](https://www.npmjs.com/package/miniapp-create)
[![GitHub license](https://img.shields.io/github/license/lushuhao/miniapp-create.svg)](https://github.com/lushuhao/miniapp-create/blob/master/LICENSE)

## 开始上手

### 安装

```shell
npm i -g miniapp-create
```

### 使用示例
在命令行输入
```npm
	miniapp-create -h
```
输出 user/test $ miniapp-create -h
```text
	Usage: miniapp-create [command] <options ...>
    
	miniapp-create <path> <file> 
	create one dir to ./path
	create four files to ./path/file, file.js、file.json、file.wxss、file.wxml
	
	Options:
	
	  -V, --version  output the version number
	  -v, --version  show miniapp-create current version
	  -h, --help     output usage information
```

```npm
	miniapp-create dir file
```
```npm
	miniapp-create dir/dir2 file
```

命令行运行在/user/test目录下，会在当前目录下递归创建目录，并生成四个文件，如下

```text
	创建文件夹： ./dir
	创建文件夹： ./dir/file
	文件创建成功： file.wxml
	文件创建成功： file.json
	文件创建成功： file.wxss
	文件创建成功： file.js
```

```text
	创建文件夹： ./dir
	创建文件夹： ./dir/dir2
	创建文件夹： ./dir/dir2/file
	文件创建成功： file.wxml
	文件创建成功： file.json
	文件创建成功： file.wxss
	文件创建成功： file.js

```

## 开源证书

[**The MIT License**](http://opensource.org/licenses/MIT).