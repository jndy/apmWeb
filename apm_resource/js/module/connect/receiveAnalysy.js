/**
 * receiveAnalysy.js
 * usage: 安全互通-邮件互通质量-外域入信分析
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('receiveAnalysy',function(require,exports,module){
    var tpl = require('{rootPath}/template/connect/receiveAnalysy.html'),
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
                chart = echarts.init($('.graph-con')[0]),
                series = me.getSeries(data.yData);
            var option = {
                title : {
                    text: '外域入信邮件统计',
                    x:'center'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['入信总数','入信成功数','入信失败数'],
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
                        name:'单位：次',
                        type : 'value'
                        /*axisLabel : {
                            formatter: '{value} 次'
                        }*/
                    }
                ],
                series : series
            };
            chart.setOption(option);
        },
        renderGrid:function(){
            $('.grid-content').empty();
            var columns = [{
                text:'序号',
                renderer:'serial'
            },{
                name:'mail',
                text:'邮箱'
            },{
                name:'count',
                text:'入信次数'
            },{
                name:'succCount',
                text:'入信成功数'
            },{
                name:'failCount',
                text:'入信失败数',
                renderer:function(val,index ,item){
                    if(val == 0)
                        return val;

                    return '<div class="td-nowrap td-fun"><a class="action failDetail" href="javascript:;" mail="{0}">{1}</a></div>'.format(item.mail,val);
                }
            },{
                name:'succPercent',
                text:'发送成功率',
                renderer:function(val){
                    return val+'%';
                }
            },{
                name:'avgSendTime',
                text:'平均发送时间'
            }];
            var option = {
                el:'.grid-content',
                url:'data.do?func=connect:getExternalAnalasyGrid',
                plugin:'page',
                autoLoad:false,
                param:{orderType:1},
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
        getSeries:function(data){
            var seriesName = ['入信总数','入信成功数','入信失败数'],
                series = [];

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
            util.request({
                url:'data.do?func=connect:getExternalAnalasyChart',
                param:me.getParam(),
                fnSuc:function(resp){
                    me.renderChart(resp['var']);
                }
            });
            me.gridView.requestData(me.getParam(true),1);
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
        getParam:function(isGrid){
            var me = this,
                param = {},
                orderType = util.getVal('.retrieval-con input[name=orderType]','select'),
                dateBar = me.dateBar;

            $.extend(param,dateBar.getValue(null,'yyyy-MM-dd HH:mm'));
            if(isGrid)
                param.orderType = orderType;
            return param;
        }
    });

    return {view:view};
});