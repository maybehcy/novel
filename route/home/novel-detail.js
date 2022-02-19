//导入文章集合
const { Novel } = require('../../model/novel');

//将评论集合构造函数进行导入
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    //接收首页传输过来的小说的id
    const novel_id = req.query.id;
    //根据id查询小说详细信息
    //author字段存储着user的信息，需要联合查询
    let novel = await Novel.findOne({ _id: novel_id }).populate('author').lean();
    // console.log(novel)

    //查询当前文章所对应的评论信息
    let comment = await Comment.find({ n_id: novel_id }).populate('u_id').lean();

    res.render('./home/novel-detail', {
        novel: novel,
        comment: comment
    });
}