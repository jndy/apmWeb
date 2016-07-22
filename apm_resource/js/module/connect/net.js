/**
 * net.js
 * usage: 安全互通-邮件互通质量-外域发信分析
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-21
 * useing jQuery JavaScript frame v1.7+
 */
define('net',function(require,exports,module){
    var tpl = require('{rootPath}/template/connect/net.html'),
        dateBar = require('dateBar'),
        grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.type = 1;
            this.render();
            this.initEvents();
            this.defaultClick();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
            util.my_select();
            this.dateBar = new dateBar({el:'.toolbar .fr'});
            this.renderGrid();
        },
        renderChart:function(data){
            var me = this,
                type = me.type,
                chart = echarts.init($('.graph-con')[0]),
                titleArr = ['网络丢包率','网络延时'],
                legendArr = [['总体丢包率','内网丢包率','外网丢包率'],['总体延时','内网延时','外网延时']],
                yArr = ['%','s'],
                series = me.getSeries(data.yData,legendArr[type-1]);
            var option = {
                title : {
                    text: titleArr[type-1]+'统计',
                    x:'center'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:legendArr[type-1],
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
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}'+yArr[type-1]
                        }
                    }
                ],
                series : series
            };
            chart.setOption(option);
        },
        renderGrid:function(){
            $('.grid-content').empty();
            var columns = [{
                name:'corpName',
                text:'省份'
            },{
                name:'requestCountIn',
                text:'请求数'
            },{
                name:'failCountIn',
                text:'丢包数'
            },{
                name:'timeoutIn',
                text:'延时(s)'
            },{
                name:'failPercentIn',
                text:'丢包率(%)'
            },{
                name:'requestCountOut',
                text:'请求数'
            },{
                name:'failCountOut',
                text:'丢包数'
            },{
                name:'timeoutOut',
                text:'延时(s)'
            },{
                name:'failPercentOut',
                text:'丢包率(%)'
            },{
                name:'requestCountTotal',
                text:'请求数'
            },{
                name:'failCountTotal',
                text:'丢包数'
            },{
                name:'timeoutTotal',
                text:'延时(s)'
            },{
                name:'failPercentTotal',
                text:'丢包率(%)'
            }];
            var option = {
                el:'.grid-content',
                selfHeader:'<thead><tr><th rowspan="2">省份</th><th colspan="4">内网</th><th colspan="4">外网</th><th colspan="4">合计(s)</th></tr><tr><th>请求数</th><th>丢包数</th><th>延时(s)</th><th>丢包率(%)</th><th>请求数</th><th>丢包数</th><th>延时(s)</th><th>丢包率(%)</th><th>请求数</th><th>丢包数</th><th>延时(s)</th><th>丢包率(%)</th></tr></thead>',
                url:'data.do?func=connect:getQualityAnalasyGrid',
                plugin:'page',
                autoLoad:false,
                tableCss:'table-con mb-20',
                columns:columns
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
            }).on('click','.graph-tab li',function(e){
                var dom = $(this);
                dom.addClass('current').siblings().removeClass('current');
                me.type = dom.index()+1;
                me.queryChart();
            }).on('timeChange','.toolbar .fr div[role=dateBar]',function(e,value){
                me.queryData();
            });
        },
        defaultClick:function(){
            var me = this;
            me.queryData();
        },
        getSeries:function(data,seriesName){
            var series = [];

            for(var i = 0, l = seriesName.length; i<l; i++){
                series.push({
                    name:seriesName[i],
                    type:'line',
                    data:data[i]
                });
            }

            return series;
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
                result = me.checkParam();

            if(!result)
                return;
            me.queryChart();
            me.queryGrid();
        },
        queryChart:function(){
            var me = this,
                param = me.getParam(true);

            util.request({
                url:'data.do?func=connect:getQualityAnalasyChart',
                param:param,
                fnSuc:function(resp){
                    me.renderChart(resp['var']);
                }
            });
        },
        queryGrid:function(){
            this.gridView.requestData(this.getParam(),1);
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
        getParam:function(isChart){
            var me = this,
                param = {},
                dateBar = me.dateBar;

            $.extend(param,dateBar.getValue(null,'yyyy-MM-dd HH:mm'));
            if(isChart)
                param.type = me.type;
            return param;
        }
    });

    return {view:view};
});