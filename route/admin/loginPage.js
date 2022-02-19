module.exports = (req, res) => {
    //res.render的作用：
    // 1. 获取位置信息，拼接模板路径
    // 2. 拼接模板后缀
    // 3. 哪一个模板和哪一个数据进行拼接
    // 4. 将拼接结果响应给了客户端，即上方的/login
    //参数1模板名字，参数二是一个对象
    res.render('admin/login')
}