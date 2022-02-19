// 导入bcrypt模块
const bcrypt = require('bcrypt');

//引入User集合构造函数
//把User对象解构出来
const { User } = require('../../model/user');

module.exports = async(req, res, next) => {
    //res.send('ok');
    //return;
    //接收客户端表单传递过来的请求参数 
    //把参数对象解构出来
    const { username, email, role, state, password, password1 } = req.body;
    //console.log(req.body)
    //因为id是通过get方法地址栏的方式接收过来的
    //即将要修改的用户id
    const { id, uId } = req.query;
    // console.log(req.query)
    //res.send(body.password);
    let user = await User.findOne({ _id: id });
    //res.send(user);

    //将客户端表单传递过来的密码和数据库用户信息中的密码进行比对
    //compare方法
    //将参数1进行加密，然后与数据库的密码进行对比
    //返回一个boolean值
    //true比对成功
    //false比对失败
    //一个promise对象
    //而且新的密码或者确认密码不能为空
    let isValue = await bcrypt.compare(password, user.password);
    if (isValue && password1.trim() !== '') {
        //res.send('密码比对成功')
        //将用户信息更新到数据库中
        //参数1根据客户端传来的id，去更改当前id的字段

        // 生成随机字符串
        //genSalt方法接收一个数值作为参数
        //数值越大，生成的随机字符串复杂度越高
        //数值越小，生成的随机字符串复杂度越低
        //默认值是10 
        //返回值是promise对象
        //返回生成的随机字符串
        const salt = await bcrypt.genSalt(10)

        // 使用随机字符串对密码进行加密
        //参数1明文,参数2随机字符串
        const pass = await bcrypt.hash(password1, salt);
        //因为要将加密后的密码写回数据库

        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            password: pass,
            role: role,
            state: state
        });
        //如果当前修改的用户id与登录的人的id一样，就重定向会登录页面
        if (user.id == uId) {
            return res.redirect('/admin/logout')
        } else {
            //不一样就重定向到用户列表页面
            res.redirect('/admin/user')
        }
    } else {
        //密码比对失败
        //res.send('密码比对失败')
        res.redirect('/admin/user-edit?message=密码比对失败或者没有再次确认密码，不能进行用户信息更改&id=' + id)
            // let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息更改', id: id };
            // next(JSON.stringify(obj));
    }
}