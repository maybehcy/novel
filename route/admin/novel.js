//导入文章集合
const { Novel } = require('../../model/novel');

//导入npm install mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    //接收客户端传递过来的页码
    const page = req.query.page;



    //查询所有文章数据
    //返回一个数组
    //在mongoose中使用populate方法实现集合关联时，导致模板引擎无法渲染，
    //这是因为当集合联合查询和渲染页面模板同时进行会导致两者冲突，从而导致无法渲染页面
    //page:当前页，想查询哪一页就把页数放到page方法里面
    //size:每页显示的数据条数
    //display:客户端要显示的页码数量，如：1-8，8-16......
    //exec:先数据库发出查询请求

    let novels = await pagination(Novel).find({}).page(page).size(10).display(5).
    populate('author').exec();
    //console.log(novels);
    // res.send(novels);
    // return;
    novels = JSON.stringify(novels);
    novels = JSON.parse(novels);
    //渲染文章列表
    res.render('admin/novel', {
        novels: novels,
        total: novels.total
    });
}