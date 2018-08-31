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
如果wx没有被占用，可以直接简写wx
```shell
miniapp-page -h
wx -h
```

路径必须输入，文件名可选，不传以路径的最后一个目录名
可传入多个文件名，批量生成

```shell
wx dir  // = wx dir dir
wx dir file
wx dir/dir2 file
wx dir a b 
```
路径中包含component，即被识别为创建组件，*.js，*.json代码有所不同
```js
/component/i.test(dirPath) // dirPath 为输入的路径
```

```shell
wx dir/component a
wx dir/Component a
wx dir/components a
wx dir/components/a b
```

命令行运行在/user/test目录下
会在当前目录下递归创建目录，并生成四个文件，如下

```shell
// wx dir
创建文件夹： ./dir
文件创建成功： dir.wxml
文件创建成功： dir.json
文件创建成功： dir.wxss
文件创建成功： dir.js
```

```shell
// wx dir/dir2 a b
创建文件夹： ./dir
创建文件夹： ./dir/dir2
文件创建成功： a.wxml
文件创建成功： a.json
文件创建成功： a.wxss
文件创建成功： a.js
文件创建成功： b.wxml
文件创建成功： b.json
文件创建成功： b.wxss
文件创建成功： b.js
```

### pages 和 components代码区别
```js
Page({
  // ...
})
```
```js
Component({
  // ...
})

```

## 开源证书

[**The MIT License**](http://opensource.org/licenses/MIT).
