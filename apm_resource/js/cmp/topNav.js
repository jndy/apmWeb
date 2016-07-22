/**
 * topNav.js
 * usage: 顶部导航组件
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-04-01
 * useing jQuery JavaScript frame v1.7+
 */
define('topNav',function(require,exports,module){
    var tpl = require('{rootPath}/template/topNav.html');
    var menu = require('menu');

    var createView = Backbone.View.extend({
        el:'.header .nav',
        initialize:function(){
            this.render();
        },
        render:function(){
            var menus = this.filterMenu(window.navMenu);
            this.renderMenu(menus);
        },
        events:{
            'mouseover li':'onMouseover',
            'mouseout li':'onMouseout',
            'click li>a.modifyPwd':'onModifyPwd',
            'click li>a.logout':'onLogout',
            'click li>a':'onClick'
        },
        onClick:function(e){
            //注意此时的e对象是被jquery封装过的；注意target和currentTarget的差别
            var dom = jQuery(e.currentTarget).parent();
            if(dom.parent().hasClass('edit-user')|| dom.index() == dom.siblings().length)
                return;

            dom.siblings().removeClass('current');
            dom.addClass('current');
        },
        onModifyPwd:function(){
            var me = this;
            var content = '<ul> <li><label for="" class="ui-dialog-label">账号：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" type="text" class="module-input" name="userName"> </div> </li> <li><label for="" class="ui-dialog-label">角色：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" type="text" class="module-input" name="userType"> </div> </li> <li><label for="" class="ui-dialog-label">原密码：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" type="password" class="module-input" name="old_userPwd"> </div> </li> <li><label for="" class="ui-dialog-label">新密码：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" type="password" class="module-input" name="new_userPwd"> </div> </li> <li><label for="" class="ui-dialog-label">确认密码：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" type="password" class="module-input" name="new2_userPwd"> </div> </li> </ul>';
            util.dialog('修改密码',content,function(){
                var param = me.getParam();
                if(!param)
                    return false;
                util.request({
                    url:'data.do?func=user:modUserPwd',
                    param:param,
                    fnSuc:function(resp){
                        alert(1);
                        return false;
                    }
                });
            },null,{onshow:function(){
                var userTypeName =['','超级管理员','配置管理员','监控员'][parseInt(gMain.userType)];

                $('.ui-dialog input[name=userName]').val(gMain.userName).attr('disabled','disabled');
                $('.ui-dialog input[name=userType]').val(userTypeName).attr('disabled','disabled');
            }});
        },
        onLogout:function(){
            util.confirm('提示信息','是否确认退出本账户？',function(){
                window.location = 'logout.do';
            });
        },
        onMouseover:function(e){
            var dom = jQuery(e.currentTarget);
            if(dom.index() == dom.siblings().length){
                dom.find('ul').removeClass('hide');
            }
        },
        onMouseout:function(e){
            var dom = jQuery(e.currentTarget);
            if(dom.index() == dom.siblings().length){
                dom.find('ul').addClass('hide');
            }
        },
        getParam:function(){
            var validateResult = util.validateDiv('.ui-dialog'),
                userPwd = $('.ui-dialog input[name=old_userPwd]').val(),
                new_userPwd = $('.ui-dialog input[name=new_userPwd]').val(),
                new2_userPwd = $('.ui-dialog input[name=new2_userPwd]').val();

            if(!validateResult.flag){
                util.showMsg(validateResult.msg);
                return null;
            }

            if(new_userPwd != new2_userPwd){
                util.showMsg('新密码和确认密码不一致');
                return null;
            }

            return {userPwd:hex_md5(userPwd),newUserPwd:hex_md5(new_userPwd)};

        },
        filterMenu:function(menus){
            return menus;
        },
        renderMenu:function(items){
            var html = _.template(tpl)({
                list:items
            });
            $(".header .nav").empty().append(html);
            $(".header .nav").find('li a:eq(0)').trigger('click');
        }
    });

    return createView;
});