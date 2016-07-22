/**
 * configList.js
 * usage: 故障告警-告警配置
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('configList',function(require,exports,module){
    var tpl = require('{rootPath}/template/alarm/configList.html');
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
                url:'data.do?func=alarm:configList',
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[{
                    name:'id',
                    text:'序号'
                },{
                    name:'name',
                    text:'监控点名称'
                },{
                    name:'mtype',
                    text:'监控类型',
                    renderer:function(val){
                        var str = '应用服务质量';
                        
                        return str;
                    }
                },{
                    name:'alarmCondition',
                    text:'告警条件',
                    renderer:function(val){
                        var html = "<div class='td-more'>" + val + "</div>";
                        return html;
                    }
                },{
                    name:'lastmodifiedtime',
                    text:'更新时间'
                },{
                    name:'userName',
                    text:'更新人'
                },{
                    name:'status',
                    text:'状态',
                    renderer:function(val){
                        var str = '启用';
                        
                        return str;
                    }
                },{
                    name:'',
                    text:'操作',
                    renderer:function(val,index ,item){
                        var str = '';
                        str = $("#list-modify").html();
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
            }).on('click','a[role=addConfig]',function(e){
                me.onAddConfig();
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
        //新建告警配置
        onAddConfig:function(){
            var me = this;
            util.jumpModule("alarm/configList?childView=addConfig");
        },
        onEdit:function(dom){
            var me = this;
            
        },
        onEnable:function(dom){
            var me = this;
            
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