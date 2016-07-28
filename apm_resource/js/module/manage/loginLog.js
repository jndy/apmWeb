/**
 * loginLog.js
 * usage: 系统管理-系统管理-登陆日志
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('loginLog',function(require,exports,module){
    var tpl = require('{rootPath}/template/manage/loginLog.html');
    var grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.actionType = 1;
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
            var me = this;
            $('.content_main').empty();
            var option = {
                el:'.content_main',
                url:'data.do?func=actionlog:getActionLogList',
                plugin:'page',
                params:{actionType:me.actionType},
                tableCss:'table-con mb-20',
                columns:[{
                    name:'userName',
                    text:'账号'
                },{
                    name:'realName',
                    text:'姓名'
                },{
                    name:'ip',
                    text:'IP地址'
                },{
                    name:'loginTime',
                    text:'登陆时间',
                    renderer:function(val){
                        return new Date(val).Format('yyyy-MM-dd HH:mm:ss');
                    }
                }],
                plugin:'page'
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
                me.queryData();
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
        queryData:function(){
            var me = this,
                param = me.getParam();

            if(!param)
                return;
            me.gridView.requestData(param,1);
        },
        getParam:function(){
            var me = this,
                param = {},
                userName,realName,ip,startTime,endTime;

            userName = util.getVal('.retrieval-con input[name=userName]');
            if(userName != ''){
                param.actionUserId = userName;
            }

            realName = util.getVal('.retrieval-con input[name=userRealName]');
            if(realName != ''){
                param.actionUserName = realName;
            }

            ip = util.getVal('.retrieval-con input[name=ip]');
            if(ip != ''){
                var result = util.validate(ip,'ip');
                if(result.flag)
                    param.actionUserIp = ip;
                else{
                    util.showMsg(result.msg);
                    return null;
                }
            }

            startTime = util.getVal('.retrieval-con input[name=startTime]');
            if(startTime != ''){
                param.startTime = startTime;
            }

            endTime = util.getVal('.retrieval-con input[name=endTime]');
            if(endTime != ''){
                param.endTime = endTime;
            }

            if(!util.compareTimeValid(startTime,endTime))
                return null;
            param.actionType = me.actionType;
            return param;
        }
    });

    return {view:view};
});