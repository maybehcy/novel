//引入formidable第三方模块
const formidable = require('formidable');

//导入系统模块处理路径
const path = require('path');

//导入文章集合构造函数
const { Novel } = require('../../model/novel')

module.exports = (req, res) => {
    //res.send('ok');
    // 创建表单解析对象form，即支持get方法也支持post方法
    const form = new formidable.IncomingForm();

    // 设置文件上传到服务器的路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');

    //保留表单上传文件的扩展名(后缀名)
    //默认false：不保留
    form.keepExtensions = true;

    // 对表单进行解析，参数1获取客户端请求过来的数据
    //参数2回调函数：表单解析完成后调用回调函数
    //如果表单解析失败，err就是一个对象，存储错误信息
    //如果解析成功，err就为null
    form.parse(req, async(err, fields, files) => {
        // fields 对象类型：存储普通请求参数
        // files 对象类型存储上传的文件信息
        //因为path是我们电脑上的路径，而不是电脑服务器的路径
        //客户端通过网址访问的是电脑服务器路径，而不是电脑硬盘
        //‘\’代表服务器电脑的绝对路径
        //split()方法用于切分字符串，它可以将字符串切分为数组。
        //在切分完毕之后，返回的是一个新数组。
        //console.log(files.cover.path.split('public')[1]);
        // res.send(fields.content);
        // return;
        await Novel.create({
                title: fields.title,
                author: fields.author,
                novel_type: fields.novel_type,
                Date: fields.Date,
                cover: files.cover.path.split('public')[1],
                content: fields.content
            })
            //console.log(fields);
            //console.log(files);
            //console.log(files.cover.path.split('public')[1])
            //重定向回小说首页面
        res.redirect('/home/');
    });

}