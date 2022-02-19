//引入express框架
const express = require('express');
//创建博客展示页面路由对象home
const home = express.Router();
//在home路由对象下挂载二级路由
//参数1请求路径，参数请求处理函数(参数1请求对象，参数2响应对象)
//渲染小说首页的展示页面
home.get('/', require('./home/novel-home'));

//渲染小说详情展示页面
home.get('/novel-detail', require('./home/novel-detail'))

//创建评论功能路由
home.post('/comment', require('./home/novel-comment'))

home.get('/comment-delete', require('./home/novel-comment-delete'))

home.get('/novel-search', require('./home/novel-search'))

home.post('/novel-search', require('./home/novel-search'))
    //把路由对象作为模块成员进行导出
module.exports = home;