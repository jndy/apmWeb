/**
 * virusAnalysy.js
 * usage: 安全互通-邮件安全监控-病毒邮件收发分析
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-20
 * useing jQuery JavaScript frame v1.7+
 */
define('virusAnalysy',function(require,exports,module){
    var tpl = require('{rootPath}/template/connect/virusAnalysy.html'),
        dateBar = require('dateBar'),
        grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.type = 1;
            this.tabType = 1;
            this.render();
            this.initEvents();
            this.defaultClick();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
            this.dateBar = new dateBar({el:'.toolbar .fr'});
        },
        renderChart:function(data,type){
            var me = this,
                chart = echarts.init($('.graph-con:eq({0})'.format(type-1))[0]),
                titleArr = ['病毒邮件接收分析','病毒邮件发送分析'];
            var option = {
                title : {
                    text: titleArr[type-1],
                    x:'center'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:[titleArr[type-1]],
                    y:'bottom'
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        axisLabel:{
                            rotate:45
                        },
                        data : data.xData
                    }
                ],
                yAxis : [
                    {
                        name:'单位：封',
                        type : 'value'
                        /*axisLabel : {
                         formatter: '{value} 次'
                         }*/
                    }
                ],
                series : [{
                    name:titleArr[type-1],
                    type:'line',
                    data:data.yData
                }]

            };
            chart.setOption(option);
        },
        initEvents:function(){
            var me = this;
            me.$el.off().on('click','.btn-search-hide',function(e){
                var dom = $(this).find('i');
                me.showQueryDiv(dom);
            }).on('click','a[role=query]',function(e){
                me.queryData();
            }).on('click','.fl .mod-tab li',function(e){
                var dom = $(this);
                dom.addClass('current').siblings().removeClass('current');
                me.$el.find('.graph-tab li:first').addClass('current').siblings().removeClass('current');
                me.type = dom.index()+1;
                me.queryData();
            }).on('click','.graph-tab li',function(e){
                var dom = $(this);
                dom.addClass('current').siblings().removeClass('current');
                me.tabType = dom.index()+1;
                me.queryData();
            }).on('timeChange','.toolbar .fr div[role=dateBar]',function(e,value){
                me.queryData();
            });
        },
        defaultClick:function(){
            var me = this;
            me.queryData();
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
                result = me.checkParam(),
                param1 = me.getParam(1),
                param2 = me.getParam(2);

            if(!result)
                return;
            util.request({
                url:'data.do?func=connect:getVirusAnalasyList',
                param:param1,
                fnSuc:function(resp){
                    me.renderChart(resp['var'],1);
                }
            });
            util.request({
                url:'data.do?func=connect:getVirusAnalasyList',
                param:param2,
                fnSuc:function(resp){
                    me.renderChart(resp['var'],2);
                }
            });
        },
        checkParam:function(){
            var me = this,
                time = me.dateBar.getValue('yyyy-MM-dd HH:mm'),
                result = true;;

            if(!util.compareTimeValid(time.st,time.et)){
                util.showMsg('结束时间不能小于开始时间');
                result = false;
            }
            return result;
        },
        getParam:function(type){
            var me = this,
                param = {},
                dateBar = me.dateBar;

            param.type = type;
            $.extend(param,dateBar.getValue(null,'yyyy-MM-dd HH:mm'));
            return param;
        }
    });

    return {view:view};
});