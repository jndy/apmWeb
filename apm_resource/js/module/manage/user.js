/**
 * user.js
 * usage: 系统管理-系统管理-用户
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('user',function(require,exports,module){
    var tpl = require('{rootPath}/template/manage/user.html');
    var grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.initEvents();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
            util.my_select();
            this.renderGrid();
        },
        renderGrid:function(){
            $('.content_main').empty();
            var option = {
                el:'.content_main',
                url:'data.do?func=user:searchUsers',
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[{
                    name:'userName',
                    text:'账号'
                },{
                    name:'userRealName',
                    text:'姓名'
                },{
                    name:'userType',
                    text:'角色',
                    renderer:function(val){
                        var str = '';
                        if(val == 0){
                            str = '全部';
                        }
                        else if(val == 1){
                            str = '超级管理员';
                        }
                        else if(val == 2){
                            str = '配置管理员';
                        }
                        else if(val == 3){
                            str = '监控员';
                        }
                        return str;
                    }
                },{
                    name:'createUnixTime',
                    text:'创建时间',
                    renderer:function(val){
                        return new Date(val).Format('yyyy-MM-dd HH:mm:ss');
                    }
                },{
                    name:'',
                    text:'操作',
                    renderer:function(val,index ,item){
                        var str = '<div class="td-nowrap td-fun"><a class="action edit" href="javascript:;" userName="{0}">修改</a>'.format(item.userName);
                        if(item.userStatus == 1){
                            str += '<a class="action disable" href="javascript:;" userName="{0}">禁用</a>'.format(item.userName);
                        }
                        else {
                            str += '<a class="action enable" href="javascript:;" userName="{0}">启用</a>'.format(item.userName);
                        }
                        str += '</div>';
                        return str;
                    }
                }]
                //plugin:'page'
            };
            var gridView = new grid(option);
            this.gridView = gridView;
        },
        initEvents:function(){
            var me = this;

            me.$el.off().on('click','.btn-search-hide',function(e){
                var dom = $(this).find('i');
                me.showQueryDiv(dom);
            }).on('click','a[role=query]',function(e){
                var param = me.getParam();
                if(!param)
                    return;
                me.gridView.requestData(param,1);
            }).on('click','a[role=add]',function(e){
                me.onAdd();
            }).on('click','.action',function(e){
                var dom = $(this);
                if(dom.hasClass('edit'))
                    me.onEdit(dom);
                else
                    me.onEnable(dom);
            });
        },
        showQueryDiv:function(dom){
            var me = this;
            if(dom.hasClass('i-down')){
                dom.removeClass('i-down');
                dom.addClass('i-up');
                me.$el.find('.retrieval-con').css('display','');
            }
            else{
                dom.removeClass('i-up');
                dom.addClass('i-down');
                me.$el.find('.retrieval-con').css('display','none');
            }
        },
        getParam:function(){
            var me = this,
                param = {},
                userName,realName,role,startTime,endTime;

            userName = util.getVal('.retrieval-con input[name=userName]');
            if(userName != ''){
                param.userName = userName;
            }

            realName = util.getVal('.retrieval-con input[name=realName]');
            if(realName != ''){
                param.userRealName = realName;
            }

            role = util.getVal('.retrieval-con span[name=role]','select');
            if(role != 0){
                param.userType = role;
            }

            startTime = util.getVal('.retrieval-con input[name=startTime]');
            if(startTime != ''){
                param.searchStartDate = startTime;
            }

            endTime = util.getVal('.retrieval-con input[name=endTime]');
            if(endTime != ''){
                param.searchEndDate = endTime;
            }

            if(!util.compareTimeValid(startTime,endTime))
                return null;

            return param;
        },
        onAdd:function(){
            var me = this;
            var content = '<ul> <li><label for="" class="ui-dialog-label">角色：<span class="c-red">*</span></label> <select style="display:none" name="userType"> <option value="0">全部</option> <option value="1">超级管理员</option> <option value="2">配置管理员</option> <option value="3">监控员</option> </select></li> <li><label for="" class="ui-dialog-label">账号：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" data-len=",30" type="text" class="module-input" name="userName"></div> </li> <li><label for="" class="ui-dialog-label">姓名：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" data-len=",30" type="text" class="module-input" name="userRealName"></div> </li> <li><label for="" class="ui-dialog-label">密码：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" data-len=",30" type="password" class="module-input" name="userPwd"></div> </li> <li><label for="" class="ui-dialog-label">邮箱地址：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" data-format="email" type="text" class="module-input" name="userEmail"></div> </li> <li><label for="" class="ui-dialog-label">手机号码：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" data-format="phone" type="text" class="module-input" name="userPhone"></div> </li> <li><label for="" class="ui-dialog-label">备注：</label> <div class="module-textarea"><textarea class="module-area" name="summary"></textarea></div> </li> </ul>';
            util.dialog('创建用户',content,function(){
                var param = me.getWindowParam();
                if(!param)
                    return false;

                util.request({
                    url:'data.do?func=user:addUser',
                    param:param,
                    fnSuc:function(resp){
                        util.showMsg(resp.msg);
                        me.refresh()
                    }
                });
            });
            util.my_select();
        },
        onEdit:function(dom){
            var me = this;
            var content = '<ul> <li><label for="" class="ui-dialog-label">角色：<span class="c-red">*</span></label> <select style="display:none" name="userType"> <option value="0">全部</option> <option value="1">超级管理员</option> <option value="2">配置管理员</option> <option value="3">监控员</option> </select></li> <li><label for="" class="ui-dialog-label">账号：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" data-len=",30" type="text" class="module-input" name="userName"></div> </li> <li><label for="" class="ui-dialog-label">姓名：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" data-len=",30" type="text" class="module-input" name="userRealName"></div> </li><li><label for="" class="ui-dialog-label">邮箱地址：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" data-format="email" type="text" class="module-input" name="userEmail"></div> </li> <li><label for="" class="ui-dialog-label">手机号码：<span class="c-red">*</span></label> <div class="module-fill"><input data-required="required" data-format="phone" type="text" class="module-input" name="userPhone"></div> </li> <li><label for="" class="ui-dialog-label">备注：</label> <div class="module-textarea"><textarea class="module-area" name="summary"></textarea></div> </li> </ul>';
            util.dialog('创建用户',content,function(){
                var param = me.getWindowParam();
                if(!param)
                    return false;
                util.request({
                    url:'data.do?func=user:modUserInfo',
                    param:param,
                    fnSuc:function(resp){
                        util.showMsg(resp.msg);
                        me.refresh()
                    }
                });

            },null,{onshow:function(){
                me.autoFill(dom);
            }});
            util.my_select();
        },
        onEnable:function(dom){
            var me = this;
            util.confirm('提示信息','请确认是否禁用户“xxx”',function(){
                var userState = 0,
                    userName = dom.attr('userName'),
                    param = {userName:userName,userState:userState};
                if(dom.hasClass('enable'))
                    param.userState = 1;

                util.request({
                    url:'data.do?func=user:modUserState',
                    param:param,
                    fnSuc:function(resp){
                        util.showMsg(resp.msg);
                        me.refresh();
                    }
                })
            });
        },
        autoFill:function(dom){
            var userName = dom.attr('userName');
            util.request({
                url:'data.do?func=user:getUserInfo',
                param:{userName:userName},
                fnSuc:function(resp){
                    var userInfo = resp['var'];
                    var dialogWindow = $('.ui-dialog');
                    var inputDoms = dialogWindow.find('input');
                    inputDoms.each(function(index,item){
                        var dom = $(item),
                            paramName = dom.attr('name');

                        dom.val(userInfo[paramName]);
                    });

                    util.setVal('.ui-dialog span[name=userType]',userInfo.userType,'select');
                    util.setVal('.ui-dialog textarea[name=summary]',userInfo.summary);
                    $('.ui-dialog input[name=userName]').attr('disabled','disabled')
                }
            });
        },
        getWindowParam:function(){
            var dialogWindow = $('.ui-dialog'),
                validateResult = util.validateDiv('.ui-dialog'),
                userType = util.getVal('.ui-dialog span[name=userType]','select'),
                param = {},
                summary = dialogWindow.find('textarea').val(),
                inputDoms = dialogWindow.find('input');

            if(userType == 0){
                util.showMsg('角色类型不能为全部')
                return null;
            }
            param.userType = userType;
            if(!validateResult.flag){
                util.showMsg(validateResult.msg);
                return null;
            }

            if($.trim(summary) != ''){
                param.summary = summary;
            }

            inputDoms.each(function(index,item){
                var dom = $(item);
                var val = $.trim(dom.val()),
                    paramName = dom.attr('name');

                if(paramName == 'userPwd'){
                    val = hex_md5(val);
                }
                param[paramName] = val;
            })

            return param;
        },
        refresh:function(){
            this.$el.find('a[role=query]').trigger('click');
        },
        onclick:function(e){
            //注意此时的e对象是被jquery封装过的；注意target和currentTarget的差别
            var dom = jQuery(e.currentTarget).parent();
            dom.siblings().removeClass('current');
            dom.addClass('current');
        }
    });

    return {view:view};
});