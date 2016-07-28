/**
 * operLog.js
 * usage: 系统管理-系统管理-操作日志
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('operLog',function(require,exports,module){
    var tpl = require('{rootPath}/template/manage/operLog.html');
    var grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.actionType = 2;
            this.render();
            this.initEvents();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
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
                    name:'operDesc',
                    text:'操作描述'
                },{
                    name:'operName',
                    text:'操作人'
                },{
                    name:'operTime',
                    text:'操作时间',
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
                operDesc,operator,startTime,endTime;

            operDesc = util.getVal('.retrieval-con input[name=operDesc]');
            if(operDesc != ''){
                param.operDesc = operDesc;
            }

            operator = util.getVal('.retrieval-con input[name=opertor]');
            if(operator != ''){
                param.operator = operator;
            }

            startTime = util.getVal('.retrieval-con input[name=startTime]');
            if(startTime != ''){
                param.startDate = startTime;
            }

            endTime = util.getVal('.retrieval-con input[name=endTime]');
            if(endTime != ''){
                param.endDate = endTime;
            }

            if(!util.compareTimeValid(startTime,endTime))
                return null;

            param.actionType = me.actionType;
            return param;
        }
    });

    return {view:view};
});