//引入User集合构造函数
//把User对象解构出来
const { User } = require('../../model/user');

module.exports = async(req, res) => {

    //分页功能
    //从地址栏中接收客户端传递过来的当前页参数
    //如果用户没有传递过来页面默认1
    let page = req.query.page || 1;

    //每一页显示的数据条数
    let pagesize = 10;

    //查询数据的总数
    let count = await User.countDocuments({});
    // res.send('用户总数是' + count);
    //return;

    //总页数
    //Math.ceil向上取整，如得到结果为3.1则取4
    let total = Math.ceil(count / pagesize);
    // res.send('总页数是' + total);
    // return;

    //页码对应数据查询的开始位置
    //数据开始查询位置=（当前页-1）
    let start = (page - 1) * pagesize;

    //把所有用户查询出来返回一个数组，用user接收
    //limit()限制查询数量,传入每页显示的数据数量
    //skip()跳过多少条数据,传入显示数据的开始位置(从0开始)
    let users = await User.find({}).limit(pagesize).skip(start);
    //res.send(users);
    res.render('admin/user', {
        users: users,
        page: page,
        total: total,
        count: count
    });
}