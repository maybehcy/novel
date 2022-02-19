  //引入mongoose第三方模块
  const mongoose = require('mongoose');

  // 导入bcrypt模块
  const bcrypt = require('bcrypt');

  //创建集合规则,Schema构造函数，所以要用new去创建这个实例
  const userSchema = new mongoose.Schema({
      username: {
          type: String,
          required: true, //必填规则
          minlength: 2, //最小长度
          maxlength: 10 //最大长度
      },
      email: {
          type: String,
          unique: true, //唯一，保证邮箱不重复
      },
      password: {
          type: String,
          required: true
      },
      role: {
          //admin超级管理员
          //normal普通用户
          type: String,
          required: true
      },
      state: {
          type: Number,
          default: 0 //0为启用状态，1就是禁用状态
      }
  })


  //使用这个规则创建集合User,model返回构造函数
  const User = mongoose.model('User', userSchema)


  // async function createUser() {
  //     // 生成随机字符串
  //     //genSalt方法接收一个数值作为参数
  //     //数值越大，生成的随机字符串复杂度越高
  //     //数值越小，生成的随机字符串复杂度越低
  //     //默认值是10 
  //     //返回值是promise对象
  //     //返回生成的随机字符串
  //     const salt = await bcrypt.genSalt(10)

  //     // 使用随机字符串对密码进行加密
  //     //参数1明文
  //     const pass = await bcrypt.hash('123456', salt);
  //     //create方法方法返回promise对象
  //     const user = await User.create({
  //         username: '黄昌盈',
  //         email: '2505105031@qq.com',
  //         password: pass,
  //         role: 'admin',
  //         state: 0
  //     });
  // }

  //createUser();


  //   //验证用户信息模块
  //   //params是参数,需要验证的对象
  //   const validateUser = params => {
  //     //定义对象的验证规则
  //     const schema = {
  //         username: Joi.string().min(2).max(12).required().error(new Error('用户名不正确')),
  //         email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
  //         password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
  //         role: Joi.string().valid('normal', 'admin').required().error(new Error('角色不正确')),
  //         state: Joi.number().valid(0, 1).required().error(new Error('状态值不正确'))
  //     };

  //     //实施验证
  //     //validate验证方法返回promise对象，参数1是需要验证的数据，参数2就是规则
  //     //验证通过返回验证的对象，验证失败抛出异常
  //     return Joi.validate(params, schema);
  // }

  //开放User，validateUser这个集合对象，作为模块成员进行导出
  module.exports = {
      User

  }