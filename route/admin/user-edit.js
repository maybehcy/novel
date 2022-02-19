//引入User集合构造函数
//把User对象解构出来
const { User } = require('../../model/user');

module.exports = async(req, res) => {

    //因为把错误信息通过地址栏传递,所以从req.query这个对象中把message解构出来
    //获取地址栏中的id参数
    const { message, id, uId } = req.query;
    //判断地址栏是否存在id参数
    if (id) {
        //修改操作
        //根据id查询对应用户
        let user = await User.findOne({ _id: id })
            //res.send(user);
            //return;


        //参数2：把错误信息开放的模板当中去
        res.render('admin/user-edit', {
            message: message,
            user: user,
            //通过地址栏的方式把id传递出去
            link: '/admin/user-modify?id=' + id + '&uId=' + uId,
            title: '修改用户'
        });
    } else {
        //添加操作

        //参数2：把错误信息开放的模板当中去
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-Add',
            title: '添加用户'
        });
    }

}