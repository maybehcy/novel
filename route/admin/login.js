//导入用户集合构造函数
//把User对象解构出来
const { User } = require('../../model/user')

// 导入bcrypt模块,处理密码比对
const bcrypt = require('bcrypt');

//方法内部会检测请求中是否包含参数
//如果包含就会接收，并把参数转换成对象类型
//再为req对象添加一个属性body
//并将属性作为值的方式传给body
//在方法内部调用next,将控制权交给下一个中间件
// 接收请求
module.exports = async(req, res) => {
    //接收请求参数，使用第三方模块npm install body-parser
    //把参数中的email,password解构出来
    const { email, password } = req.body;

    //send方法内部http状态码为200,而邮箱错误客户端出现问题
    //状态码就不能为200，通过status改变状态码为400
    //res.status(400).send('<h4>邮件地址或者密码错误</h4>');
    //渲染模板来展示错误
    //阻止程序向下执行
    if (email.trim().length == 0 || password.trim().length == 0)
        res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' });



    //根据邮箱地址查询用户信息
    //es6中规定如果对象的属性与值相同，那么只写其中一个即可
    //通过异步函数的方式得到这个方法的返回值
    let user = await User.findOne({ email });
    //如果查询到用户,user变量值为对象类型，对象存储的是用户信息
    if (user) {
        //将客户端传递过来的密码和用户信息中的密码进行比对
        //compare方法
        //将参数1进行加密，然后与数据库的密码进行对比
        //返回一个boolean值
        //true比对成功
        //false比对失败
        //返回一个promise对象
        let isEqual = await bcrypt.compare(password, user.password)

        //如果对比成功
        if (isEqual) {
            //如果用户状态是启用状态就允许登录
            if (user.state == '0') {
                //把数据库的用户名存放在session这个对象中,session对象会为当前用户自动生成一个唯一的sessionId
                //并且把这个加密后sessionId存储到客户端的cookie中
                //为什么登陆成功后服务器端不认得客户端呢？
                //因为网站应用是基于http协议，是基于请求与响应的应用
                //这种应用有一个特点，在完成客户端与服务器端的请求与响应后
                //客户端与服务器端就断开了，没有联系了
                //称为http的无状态性
                req.session.username = user.username;
                //把user直接开放出来，就好像一个全局变量，其他页面可以直接拿到里面的内容
                req.app.locals.userInfo = user;
                if (user.role == 'normal') {
                    res.redirect('/home/')
                } else {
                    //登录成功后，重定向回用户列表
                    res.redirect('/admin/user')
                }
            } else {
                res.status(400).render('admin/error', { msg: '用户以被禁用，请联系管理员' });
            }
        } else {
            res.status(400).render('admin/error', { msg: '密码错误' });
        }
    } else { //如果没有查询到用户，user变量就为空
        res.status(400).render('admin/error', { msg: '邮件地址错误' });

    }
}