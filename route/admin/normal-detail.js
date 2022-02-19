//引入User集合构造函数
//把User对象解构出来
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    const { username } = req.query
    const users = await User.find({ username: username })
        // console.log(username)
        // console.log(users)
    res.render('admin/normal-detail', {
        users: users
    })
}