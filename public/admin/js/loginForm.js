        // 为表单添加提交事件
        $('#loginForm').on('submit', function() {
            // 获取到表单中用户输入的内容
            //var result = serializeToJson($(this))

            // 如果用户没有输入邮件地址的话
            if ($('#email').val().trim().length == 0) {
                alert('邮件地址不能为空');
                // 阻止程序向下执行
                return false;
            }
            // 如果用户没有输入密码
            if ($('#password').val().trim().length == 0) {
                alert('密码不能为空')
                    // 阻止程序向下执行
                return false;
            }
        });
        var flag = 0;
        $('#eye').on('click', function() {
            // 点击一次之后， flag 一定要变化
            if (flag == 0) {
                $('#password').attr('type', 'text')
                this.src = '/admin/images/open.png';
                flag = 1; // 赋值操作
            } else {
                $('#password').attr('type', 'password')
                this.src = '/admin/images/close.png';
                flag = 0;
            }
        })