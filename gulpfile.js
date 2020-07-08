// 导入gulp
const gulp = require('gulp');

// 删除包
const del = require('del');

// css
// 根据浏览器自动加前缀
const autoprefixer = require('gulp-autoprefixer');
// 压缩css代码
const cssmin = require('gulp-cssmin');

// html
// 压缩html文件中的内容
const htmlmin = require('gulp-htmlmin');

// scss
const sass = require('gulp-sass'); // scss转css

// js
// es6转es5
const babel = require('gulp-babel');
// 压缩es6代码
const uglify = require('gulp-uglify');


// http
const webserver = require('gulp-webserver');

// 书写css压缩规则
const cssHandler = () => {
    return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}

// 书写html压缩规则

const htmlHandler = () => {
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
            removeAttributeQuotes:true, // 删除原生属性的引号
            removeComments:true, // 删除注释
            collapseWhitespace:true, // 删除空格
            minifyCSS:true, // 压缩css代码
            minifyJS:true, // 压缩html代码
            collapseBooleanAttributes:true // 简写值为布尔值的属性
        })
    .pipe(gulp.dest('./dist/pages'))
    )
}

const jsHandler = () => {
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}

const libHandler = () => {
    return gulp.src('./src/lib/**')
    .pipe(gulp.dest('./dist/lib'))
}

const interHandler = () => {
    return gulp.src('./src/interface/**')
    .pipe(gulp.dest('./dist/interface'))
}

const imagesHandler = ()=>{
    return gulp.src('./src/image/**') //"**"表示images下面的所有文件
    .pipe(gulp.dest('./dist/image'))  
}

const delHandler = () => {
    return del(['./dist'])
}

const webserverHandler = ()=>{
    return gulp.src('./dist')   //找到要作为服务器根目录的文件夹
    .pipe(webserver({
        port:8090,//端口号,0-6635之间,尽量不要用0-1023
        open:'./pages/index.html',//你默认打开的首页,路径从dist开始书写
        livereload:true,//热更新,就是当dist里面代码有变化的时候自动刷新浏览器
        proxies:[ //这个第三方模块还可以帮助我们配置代理
            //直接在使用webserver的时候添加一个配置项:   proxies:[]
            {
                source: '/asd', //表示请求的地址
                target: 'http://127.0.0.1/json.php'//你要代理的地址
            },
            {
                source: '/zxc', //表示请求的地址
                target: 'http://127.0.0.1/json.php'//你要代理的地址
            }
        ]
    }))
}

const watchHandler = () => {
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHandler);
    gulp.watch('./src/pages/*.html',htmlHandler);
    gulp.watch('./src/images/**',imagesHandler);
    gulp.watch('./src/lib/**',libHandler);
    gulp.watch('./src/lib/**',interHandler)
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(libHandler,interHandler,imagesHandler,cssHandler,htmlHandler,jsHandler),
    webserverHandler,
    watchHandler
)

module.exports.aa = cssHandler
module.exports.bb = htmlHandler
module.exports.cc = jsHandler
module.exports.dd = libHandler
module.exports.ee = delHandler
module.exports.ff = webserverHandler