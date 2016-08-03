/**
 * mainControl.js
 * usage: 主控台
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('mainControl',function(require,exports,module){
    var grid = require('grid'),
        rightGrid = require('rightGrid'),
        leftMap = require('leftMap'),
        tpl = require('{rootPath}/template/main/mainControl.html');

    var view = Backbone.View.extend({
        el:'.control',
        initialize:function(){
            this.render();
            this.initEvents();
            this.defaultClick();
        },
        render:function(){
            this.viewType = 1;
            this.dateTime = new Date();
            var html = _.template(tpl)({
            });
            this.$el.empty().append(html);
            this.onTimer();
            this.getSeverTime();
        },
        initEvents:function(){
            var me = this;

            me.$el.off().on('change','input[name="viewType"]',function(){
                var viewType = parseInt($(this).val());
                me.viewType = viewType;
                me.queryData();
                rightGrid(viewType);
            }).on('click','.con a',function(e){
                var name = $(this).attr('name');
                me.queryDetail(name);
            });
        },
        defaultClick:function(){
            this.$el.find('input[type=radio][name=viewType][value=1]').prop("checked","checked").trigger('change');
        },
        getSeverTime: function(){
            var me = this;
            util.request({
                url:'data.do?func=main:getServerTime',
                fnSuc:function(resp){
                    me.dateTime = new Date(resp['var']);
                    me.$el.find('#serverDate').text(resp['var']);
                }
            });
        },
        onTimer:function(){
            var me = this;
            if(window.autoRequestTime){
                clearInterval(window.autoRequestTime);
                clearInterval(window.autoRequestMain);
            }
            window.autoRequestTime = setInterval(function(){
                var newTime = me.dateTime.add(1,'s');
                me.dateTime = newTime;
                me.$el.find('#serverDate').text(newTime.Format('yyyy-MM-dd HH:mm:ss'));
            },1000);
            window.autoRequestMain = setInterval(function(){
                //如果试图不是停留在当前main视图，不进行数据查询
                if(location.hash.indexOf('main') < 0)
                    return;
                me.queryData();
            },1000*60*5);
        },
        queryData:function(){
            var me = this;
            util.request({
                url:'data.do?func=main:getTotalStatic',
                param:me.getParam(),
                fnSuc:function(resp){
                    me.updateTotalStatic(resp['var']['totalDetail']);
                    leftMap({type:me.viewType,data:resp['var']['dataList']});
                }
            });
        },
        queryDetail:function(name){
            var me = this,
                content = '<div class="control-alert"><div class="tit">邮件系统用户数</div><div class="con">更新时间：{0}</div><div class="detailGrid"></div></div>'.format(me.dateTime.Format('yyyy-MM-dd HH:mm:ss'));
            util.dialog('查看详情',content,null,null,{id:'staticDetail',cancelDisplay:false,onshow:function(){
                var columns = [{
                    name:'corpName',
                    text:'省份'
                },{
                    name:'sendCount',
                    text:'发信次数'
                }];
                var option = {
                    el:'.ui-dialog .detailGrid',
                    url:'data.do?func=connect:getLoginAnalasyGrid',
                    param:{loginIp:name},
                    tableCss:'table-con mb-20',
                    columns:columns
                };
                new grid(option);
            }
            });
        },
        getParam:function(){
            var me = this,
                endTime = me.dateTime,
                startTime = endTime.add(-5,'m');

            return {
                type:me.viewType,
                startTime:startTime.Format('yyyy-MM-dd HH:mm:ss'),
                endTime:endTime.Format('yyyy-MM-dd HH:mm:ss')
            };
        },
        updateTotalStatic:function(data){
            var me = this,
                spans = me.$el.find('.con span');

            spans.each(function(index,item){
                var span = $(item),
                    name = span.attr('name');

                if(!!name && data[name] != 0){
                    span.html('<a href="javascript:;" role="staticDetail" name="{1}">{0}</a>'.format(data[name],name));
                }
            });
        }
    });

    return view;
});