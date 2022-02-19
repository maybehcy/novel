//导入morgan第三方模块
const morgan = require('morgan');
//导入config模块，返回对象
const config = require('config');

//对dateformat第三方模块进行全局导入
//返回值是一个方法
//调用这个方法就可以对日期进行处理
//因为这个方法在模板里调用，需要依赖art-tempale模板引擎
const dateFormat = require('dateformat');
//导入art-tempate模板引擎
const template = require('art-template');
//向模板内部导入dateFormat方法
template.defaults.imports.dateFormat = dateFormat;

//引入express框架
const express = require('express');
//创建网站服务器
const app = express();

//引入数据库连接模块,数据库连接
require('./model/connect')

//导入第三方express-session模块，中间件函数
const session = require('express-session');
//传递一个调用session方法的参数
//拦截所有请求，把所有请求交给session方法去处理
//为请求对象下面添加一个session的属性，sessin属性的值是一个对象
//可以在用户登陆成功后保存用户信息
//我们向session中存储数据时，生成sessionid,当前存储数据的唯一标识
//将sessionid存储在客户端的cookie中
//当客户端再一次访问服务器端的时候
//方法会拿到客户端传递过来的cookie，并从cookie中提取sessionid
//根据sessionid找到用户信息，服务器端就知道访问服务器端的客户端是谁
//配置session,secret里面的值自定义
//在session方法中存储一个密钥secret,用来加密cookie信息
//当我们向客户端存储信息时，需要对数据进行加密，服务器端接收到cookie时，需要使用密钥进行解密
//客户端只能看到加密后的信息，提高数据的安全性
app.use(session({
  resave: false,
  secret: 'pass', //固定配置项，存储一个密钥，加密cookie信息
  saveUninitialized: false, //因为用户登录没登录都会生成cookie,所以改成false,当用户没有登录时不要保存cookie
  cookie: { maxAge: 24 * 60 * 60 * 1000 } //一天以后不登录自动退出登录，过期时间

}));


//导入系统模块处理路径
const path = require('path')
  //开放静态资
  //实现静态资源访问功能
  //拦截所有请求
  //路径写绝对路径源文件
  //__dirname指的是blog1目录
app.use(express.static(path.join(__dirname, 'public')))


//引入body-parser模块，用来处理post请求参数
const bodyPaser = require('body-parser');
//处理post请求参数
// 全局配置body-parser模块
//使用app.use拦截所有的请求
//对请求进行处理
//f使用query方法对参数进行处理，
//t使用第三方qs模块对参数进行处理
//都是将参数转换成对象类型
app.use(bodyPaser.urlencoded({ extended: false }))



//config模块会自动对运行环境进行判断，然后回去自动读取对应运行环境的配置文件中的信息
console.log(config.get('title'));

//morgan是一个中间件函数
app.use(morgan('dev'))


// 1.告诉express框架使用什么模板引擎渲染什么后缀的模板文件
//  1.模板后缀
//  2.使用的模板引擎
app.engine('art', require('express-art-template'))
  // 2.告诉express框架模板存放的位置是什么
app.set('views', path.join(__dirname, 'views'))
  // 3.告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');


//写在路由之前，登录拦截
//判断用户访问是否是登录
//当我们访问以admin开头的地址时
app.use('/admin', (req, res, next) => {
  //判断用户的登录状态,看一下session里面有没有存储username
  //如果用户不是登录的，，将请求重定向到登陆页面
  if (req.url != '/login' && !req.session.username) {
    res.redirect('/admin/login')
  } else {
    //用户是登录状态，将请求放行，匹配后面路由
    next();
  }
})

//导入三个路由对象
const home = require('./route/home');
const admin = require('./route/admin');
const regsiter = require('./route/regsiter');

//给路由对象匹配一个一级的请求路径
//使用app.use拦截所有的请求
//如果客户端的请求路径是由/home过来的，就去找home的路由
app.use('/home', home);
app.use('/admin', admin);
app.use('/regsiter', regsiter);

//一个网站服务器一定要监听端口，才能向外提供服务,一般默认端口是80端口
app.listen(3000);
console.log('网站服务器启动成功，请访问localhost:3000')