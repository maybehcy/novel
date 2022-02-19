//将评论集合构造函数进行导入
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    //点击删除按钮，把对应得评论id与评论对应的文章id通过地址栏传递
    //通过对象解析，获取地址栏的参数
    const { comment_id, novel_id } = req.query;
    //删除对应的评论
    await Comment.findOneAndDelete({ _id: comment_id })
        //返回对应的文章详情页面
    res.redirect('/home/novel-detail?id=' + novel_id)
}