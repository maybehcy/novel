//导入文章集合模块
const { Novel } = require('../../model/novel');
//将评论集合构造函数进行导入
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    //获取要删除的小说id
    // res.send(req.query.id);
    // return;
    //根据id删除小说
    // await Novel.findOneAndDelete({ _id: req.query.id })
    //根据小说的id删除对应的评论
    if (req.query.novel_id) {
        await Novel.findOneAndDelete({ _id: req.query.novel_id })
        await Comment.deleteMany({ n_id: req.query.novel_id })
    } else {
        const novel = await Novel.find({ author: req.query.id })
        console.log(novel)
        await Novel.deleteMany({ author: req.query.id })
        for (var i = 0; i <= novel.length - 1; i++) {
            console.log(novel[i]._id)
            await Comment.deleteMany({ n_id: novel[i]._id })
        }
    }
    //重定向会用户列表页面
    res.redirect('/admin/novel');
}