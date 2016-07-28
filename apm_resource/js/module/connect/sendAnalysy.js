/**
 * sendAnalysy.js
 * usage: 安全互通-邮件互通质量-外域发信分析
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('sendAnalysy',function(require,exports,module){
    var tpl = require('{rootPath}/template/connect/sendAnalysy.html'),
        dateBar = require('dateBar'),
        grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.type = 2;
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
                    text: '外域发信邮件统计',
                    x:'center'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['发信总数','发信成功数','发信失败数'],
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
                        /*axislabel : {
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
                text:'发信次数'
            },{
                name:'succCount',
                text:'发信成功数'
            },{
                name:'failCount',
                text:'发信失败数',
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
            }).on('click','.action.failDetail',function(e){
                var email = $(this).attr('mail');
                me.getFailDetail(email)
            }).on('change','select',function(e){
                me.queryGrid();
            });
        },
        defaultClick:function(){
            var me = this;
            me.queryData();
        },
        getSeries:function(data){
            var seriesName = ['发信总数','发信成功数','发信失败数'],
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
            me.queryGrid();
        },
        queryGrid:function(){
            this.gridView.requestData(this.getParam(true),1);
        },
        getFailDetail:function(email){
            var me = this;
            util.dialog('  ','<div class="failPieChart" style="width: 600px;height: 300px;"></div>',null,null,{id:'peiFail',cancelDisplay:false,onshow:function(){
                util.request({
                    url:'data.do?func=service:analyseServerFail',
                    param:{email:email},
                    fnSuc:function(res){
                        var data = res['var'];
                        me.drawPieChart(data);
                    }
                });
            }
            });

        },
        drawPieChart:function(data){
            var chart = echarts.init(jQuery('.ui-dialog .failPieChart')[0]);
            var legendData = [];
            $.each(data.dataList,function(index,item){
                legendData.push(item.name);
            });
            var option = {
                title : {
                    text: '失败原因分析',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b}"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    align:'left',
                    y:'middle',
                    data: legendData
                },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['20%', '50%'],
                        data:data.dataList,
                        itemStyle: {
                            normal:{
                                label:{
                                    show:false
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            chart.setOption(option);
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
                orderType = util.getVal('span[name=orderType]','select'),
                dateBar = me.dateBar;

            $.extend(param,dateBar.getValue(null,'yyyy-MM-dd HH:mm'));
            if(isGrid)
                param.orderType = orderType;
            return param;
        }
    });

    return {view:view};
});