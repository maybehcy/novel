const { Novel } = require('../../model/novel')
    //导入分页模块
const pagenation = require('mongoose-sex-page')
module.exports = async(req, res) => {

    //接收客户端传过来的page
    const page = req.query.page;
    //因为对数据库操作属于异步操作，使用回调函数或者promise对象接收异步方法的返回值
    //使用最好的方法使用异步函数
    //查询所有文章数据
    //返回一个数组
    //在mongoose中使用populate方法实现集合关联时，导致模板引擎无法渲染，
    //这是因为当集合联合查询和渲染页面模板同时进行会导致两者冲突，从而导致无法渲染页面
    //page:当前页，想查询哪一页就把页数放到page方法里面
    //size:每页显示的数据条数
    //display:客户端要显示的页码数量，如：1-8，8-16......
    //exec:先数据库发出查询请求
    //因为author字段存着文章作者user的的信息，联合查询
    let novels = await pagenation(Novel).find().page(page).size(6).display(5).populate('author').exec();
    // console.log(novels);
    // return;
    novels = JSON.stringify(novels);
    novels = JSON.parse(novels);
    res.render('./home/novel-home', {
        novels: novels
    });
}