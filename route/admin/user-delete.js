//引入User集合构造函数
//把User对象解构出来
const { User } = require('../../model/user');
//导入文章集合模块
const { Novel } = require('../../model/novel');
//将评论集合构造函数进行导入
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    //获取要删除的用户id
    //res.send(req.query.id);
    // return;
    //根据id删除用户
    const id = req.query.id
    await User.findOneAndDelete({ _id: id });


    //根据用户id删除对应的小说
    // await Novel.deleteMany({ author: req.query.id })
    //根据用户id删除改用户发布过的评论
    // await Comment.deleteMany({ u_id: req.query.id })
    //重定向会用户列表页面
    res.redirect('/admin/novel-delete?id=' + id);
}