//将评论集合构造函数进行导入
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    //res.send(req.body);
    //接收客户端传递过来的参数
    const { content, u_id, n_id } = req.body;
    //将评论信息存储到Comment集合中：
    await Comment.create({
            content: content,
            u_id: u_id,
            n_id: n_id,
            time: new Date()
        })
        //重定向回小说详情页面
    res.redirect('/home/novel-detail?id=' + n_id);
}