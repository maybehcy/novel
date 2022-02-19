const { User } = require('../../model/user');
// 导入bcrypt模块
const bcrypt = require('bcrypt');
module.exports = async(req, res) => {
    const { username, email, role, state, password, password1 } = req.body;
    const { id } = req.query;
    // console.log(id)
    let user = await User.findOne({ _id: id });
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
        res.redirect('/admin/logout')
    } else {
        res.redirect('/admin/normal-edit?message=密码比对失败或者没有再次确认密码，不能进行用户信息更改&id=' + id)
    }
}