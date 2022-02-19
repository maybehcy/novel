// 导入bcrypt模块
const bcrypt = require('bcrypt');
//引入模块
const Joi = require('joi');
//引用用户集合的构造函数
//通过对象解构方式得到
const { User } = require('../../model/user')


module.exports = async(req, res, next) => {

    //验证用户信息模块
    //定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不正确')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin', 'author').required().error(new Error('角色不正确')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值不正确'))
    }

    //异步函数错误信息通过try和catch捕获
    try {
        //实施验证
        //validate验证方法返回promise对象，参数1是需要验证的数据，参数2就是规则
        //验证通过返回验证的对象，验证失败抛出异常
        //使用第三方模块验证用户输入页面的内容
        await Joi.validate(req.body, schema);
    } catch (e) {
        //验证没有通过
        //重定向会用户添加页面
        //方法1：把错误信息通过地址栏的方式传递过来，通过req.query的方法获取地址栏的信息
        //?代表传递的参数
        return res.redirect('/admin/user-edit?message=' + e.message)

        //方法2：es6的模板字符串来解析
        // res.redirect(`/admin/user-edit?message=${e.message}`)

        //方法3：next方法只传递一个参数并且是字符串
        //JSON.stringify(),将对象数据类型转换成字符串
        //return阻止程序向下执行
        // return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }))
    }


    //根据req.body.email用户传过来的邮箱地址查询数据库中用户是否存在
    //findOne返回一个对象，如果查到则返回这个对象，如果没有则返回null
    //通过异步函数的方式得到这个方法的返回值
    let user = await User.findOne({ email: req.body.email });
    //如果用户已经存在，邮箱以被占用
    if (user) {
        //重定向会用户添加页面
        //把错误信息通过地址栏的方式传递过来，通过req.query的方法获取地址栏的信息
        //?代表传递的参数
        return res.redirect('/admin/user-edit?message=邮箱地址被占用')
            //return阻止程序向下执行
            // return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }))

    }

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
    const pass = await bcrypt.hash(req.body.password, salt);
    //因为要将加密后的密码写回数据库
    req.body.password = pass;
    // res.send(req.body);
    //将用户信息添加到数据库中
    await User.create(req.body);
    //重定向到用户列表页面
    res.redirect('/admin/user');
}