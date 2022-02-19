//引入User集合构造函数
//把User对象解构出来
const { User } = require('../../model/user');

module.exports = async(req, res) => {
    const { username } = req.body
        //模糊查询
    const users = await User.find({ username: { $regex: username } })
        //console.log(req.body.username)
        //console.log(req.url)
        //查询出来的数据总数
    const length = users.length
    res.render('admin/user-search', {
        users: users,
        url: req.url,
        length: length
    });

}