# miniapp-page 
创建小程序目录及四个文件

## 开始上手

### 安装

```shell script
npm i -g @xmly/miniapp-page
```

### 使用示例
在命令行输入 
如果mp没有被占用，可以直接简写mp
```shell script
miniapp-page -h
mp -h
```

默认创建微信小程序模版
```shell script
mp -t wx
```

路径必须输入，文件名可选，不传以路径的最后一个目录名
可传入多个文件名，批量生成

```shell script
mp dir  // = mp dir dir
mp dir file
mp dir/dir2 file
mp dir a b 
```
手动指定生成component
```shell script
mp -c
mp dir/components/a b
```

路径中包含component，即被识别为创建组件，*.js，*.json代码有所不同
```js
/component/i.test(dirPath) // dirPath 为输入的路径
```

命令行运行在/user/test目录下
会在当前目录下递归创建目录，并生成四个文件，如下

```shell
// mp dir
创建文件夹： ./dir
文件创建成功： dir.wxml
文件创建成功： dir.json
文件创建成功： dir.wxss
文件创建成功： dir.js
```

```shell
// mp dir/dir2 a b
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
