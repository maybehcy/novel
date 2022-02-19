//引入express框架
const express = require('express');
//创建博客展示页面路由对象admin
const admin = express.Router();

//在admin路由对象下挂载二级路由
//参数1请求路径，参数请求处理函数(参数1请求对象，参数2响应对象)

//渲染用户登录页面
admin.get('/login', require('./admin/loginPage'));

//实现登录功能，使用post请求
admin.post('/login', require('./admin/login'));

//渲染用户列表页面
admin.get('/user', require('./admin/userPage'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

//渲染用户编辑或者用户添加页面
admin.get('/user-edit', require('./admin/user-edit'));

//创建实现用户添加路由
admin.post('/user-Add', require('./admin/user-Add'));

//用户信息修改路由
admin.post('/user-modify', require('./admin/user-modify'));

//建立删除用户功能路由
admin.get('/delete', require('./admin/user-delete'));

//渲染查询用户页面
admin.post('/user-search', require('./admin/user-search'));

//渲染小说列表页面
admin.get('/novel', require('./admin/novel'));

//渲染小说分类页面
admin.get('/novel-class', require('./admin/novel-class'))

//渲染小说编辑页面
admin.get('/novel-edit', require('./admin/novel-edit'));

//渲染小说修改页面
admin.get('/novel-modify', require('./admin/novel-modify'))

//建立小说修改路由
admin.post('/novel-modify', require('./admin/novel-modify'))

//实现小说添加功能的路由
admin.post('/novel-add', require('./admin/novel-add'))

//实现小说删除功能的路由
admin.get('/novel-delete', require('./admin/novel-delete'))

//渲染普通用户主页
admin.get('/normal-detail', require('./admin/normal-detail'))

//渲染修改普通用户的页面
admin.get('/normal-edit', require('./admin/normal-edit'))

//修改普通用户路由
admin.post('/normal-modify', require('./admin/normal-modify'))

//删除普通用户的页面路由
admin.get('/normal-delete', require('./admin/normal-delete'))
    //把路由对象作为模块成员进行导出
module.exports = admin;