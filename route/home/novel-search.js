//导入文章集合模块
const { Novel } = require('../../model/novel');

module.exports = async(req, res) => {
    if (req.method == 'POST') {
        const { title } = req.body
            // console.log(req.body)
        const novels = await Novel.find({ title: { $regex: title } })
            // console.log(novels)
        res.render('home/novel-search', {
            novels: novels
        });
    } else {
        const novels = await Novel.find({ novel_type: req.query.novel_type })
            // console.log(req.query.novel_type)
            // console.log(novels)
        res.render('home/novel-search', {
            novels: novels
        });
    }


}