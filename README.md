# gulp 项目建立规范
***

## LiveReload使用流程

* 安装[Chrome LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
* 通过npm安装http-server ，快速建立http服务 
  > npm install http-server -g
* 通过cd找到发布环境目录dist
* 运行http-server，默认端口是8080
* 访问路径localhost:8080
* 再打开一个cmd，通过cd找到项目路径执行gulp，清空发布环境并初始化
* 执行监控 gulp watch
* 点击chrome上的LiveReload插件，空心变成实心即关联上，你可以修改css、js、html即时会显示到页面中。


##browser-sync与gulp-livereload的区别
* 前者自带web服务器,后者需要配合其他web服务(如http-server express等).
* 前者不需要安装插件，后期需要安装浏览器插件或者桌面插件
* browser-sync 需要页面有body元素
* 总结后者更灵活，可以配合express等开发程序。前者更方便，如果只是单纯的静态页面(不需要后台渲染)开发可以优先使用


##常用模块
var gulp = require('gulp'); //基础库
var imagemin = require('gulp-imagemin'); //图片压缩
var sass = require('gulp-sass'); //sass
var minifycss = require('gulp-minify-css'); //css压缩
var jshint = require('gulp-jshint'); //js检查
var uglify = require('gulp-uglify'); //js压缩
var rename = require('gulp-rename'); //重命名
var concat = require('gulp-concat'); //合并文件
var nodemon = require('gulp-nodemon'); //监控文件修改，重启node服务
var livereload = require('gulp-livereload'); // 浏览器同步
var rimraf = require('rimraf'); //删除文件夹里面的文件
var rjs = require('gulp-requirejs');//压缩requirejs
gulp-react     //react
gulp-babel    //react
gulp-sourcemap  //调试源代码
browser-sync    //浏览器同步

