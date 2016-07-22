/**
 * login.js
 * usage: 登录页的细节逻辑
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+、md5.js
 */
$(function(){
    var Login = {
        init:function(){
            this.render();
            this.addEvents();
        },
        render:function(){
            var me = this,
                rememberFlag = me.cookie('remember');
            if(rememberFlag == 'true'){
                $('#rememberName').attr('checked',true);
                $('#username').val(me.cookie('username'));
            }
        },
        addEvents:function(){
            var me = this;
            $('#loginBtn').click(function(){
                if(me.checkValid())
                    me.submitLogin();
            });

            $('#changeCode').click(function(e){
                $(this).prev().attr('src','captcha.do?'+(+new Date()));
            });

            $('#rememberName').change(function(e){
                me.rememberAccount();
            });
        },
        submitLogin:function(){
            var me = this,
                username = $.trim($('#userName').val()),
                pwd = hex_md5($.trim($('#pwd').val())),//密码需要进行md5加密
                code = $.trim($('#verifyCode').val());
            jQuery.ajax({
                url:'loginApi.do',
                type: "POST",
                dataType:'json',
                contentType: 'application/json; charset=UTF-8',
                data:JSON.stringify({
                    userName:username,
                    userPwd:pwd,
                    validateCode:code
                }),
                success:function(data){
                    if(data['code'] == 'S_OK'){
                        window.location = 'home.do';
                    }
                    else{
                        me.showErrorMsg(data['msg']);
                        $('#changeCode').prev().attr('src','captcha.do?'+(+new Date()));
                    }
                }
            });
        },
        rememberAccount:function(){
            var me = this;
            var state = $('#rememberName').is(':checked');
            if(state){
                me.cookie('username',$.trim($('#username').val()));
                me.cookie('remember','true');
            }
            else{
                me.cookie('username','',-1);
                me.cookie('remember','false',-1);
            }
        },
        checkValid:function(){
            var me = this,
                username,pwd,code;

            username = $('#userName').val();
            if($.trim(username) == ''){
                me.showErrorMsg('用户名不能为空')
                return false;
            }

            pwd = $('#pwd').val();
            if($.trim(pwd) == ''){
                me.showErrorMsg('密码不能为空')
                return false;
            }

            code = $('#verifyCode').val();
            if($.trim(code) == ''){
                me.showErrorMsg('验证码不能为空')
                return false;
            }

            return true;
        },
        cookie: function (name, value, time) {
            if (value) {
                var Days = time || 1;
                var exp = new Date();
                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
            }
            if (!value) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)) {
                    return unescape(arr[2])
                } else {
                    return null
                }
            }
        },
        showErrorMsg:function(msg){
            var css = msg == '' ? 'hidden': '';
            $('.login-tips').css('visibility',css)
            $('#errorTip').html(msg);
        }
    };

    Login.init();
});