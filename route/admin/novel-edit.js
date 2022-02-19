//导入文章集合模块
const { Novel } = require('../../model/novel');

module.exports = (req, res) => {


    res.render('admin/novel-edit');
}