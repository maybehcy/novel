 //1.引入mongoose第三方模块
 const mongoose = require('mongoose');

 //2.创建文章集合规则
 const novelSchema = new mongoose.Schema({
   title: {
     type: String,
     maxlength: 20,
     minlength: 4,
     //必填字段，参数2就是错误信息
     required: [true, '请填写小说标题']
   },
   //文章集合与用户集合进行关联
   //author存储的就是User的_id
   author: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: [true, '作者']
   },
   Date: {
     type: Date,
     default: Date.now()
   },
   //小说的类型
   novel_type: {
     type: String,
     required: true
   },
   //cover存放着文件上传的路径和文件名称
   cover: {
     type: String,
     default: null
   },
   content: {
     type: String
   }

 });

 //3.根据规则创建集合
 //使用这个规则创建集合Article,model返回构造函数
 const Novel = mongoose.model('Novel', novelSchema)

 //4.将集合规则作为模块成员进行导出
 module.exports = {
   Novel
 }