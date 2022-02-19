//引入express框架
const express = require('express');
//创建用户注册路由对象regsiter
const regsiter = express.Router();

//渲染用户注册页面
regsiter.get('/user-regsiter', require('./regsiter/user-regsiter'));
//用户注册操作路由
regsiter.post('/user-regsiter', require('./regsiter/user-add'));
//把路由对象作为模块成员进行导出
module.exports = regsiter;