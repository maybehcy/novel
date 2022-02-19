 //引入mongoose第三方模块
 const mongoose = require('mongoose');

 //创建集合规则,Schema构造函数，所以要用new去创建这个实例
 const commentSchema = new mongoose.Schema({
     //小说id：表示当前评论属于哪一篇小说
     //存储小说的id
     n_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Novel'
     },
     //用户id：当前评论是由谁评论的
     //存储用户的id
     u_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     },
     //评论时间
     time: {
         type: Date
     },
     //评论内容
     content: {
         type: String
     }
 });


 const Comment = mongoose.model('Comment', commentSchema)

 //开放这个集合对象，作为模块成员进行导出
 module.exports = {
     Comment
 }