//引入User集合构造函数
//把User对象解构出来
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    const { id } = req.query
    await User.findOneAndDelete({ _id: id })
    res.redirect('/admin/logout')
}