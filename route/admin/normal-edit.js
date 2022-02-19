//引入User集合构造函数
//把User对象解构出来
const { User } = require('../../model/user');
module.exports = async(req, res) => {

    const { id, message } = req.query
    const user = await User.findOne({ _id: id })
    res.render('admin/normal-edit', {
        user: user,
        message: message
    })

}