/**
 * serviceDetail.js
 * usage: 质量监控-应用服务质量-子视图
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-13
 * useing jQuery JavaScript frame v1.7+
 */
define('serviceDetail',function(require,exports,module){
    var tpl = require('{rootPath}/template/monitor/serviceDetail.html'),
        dateBar = require('dateBar'),
        grid = require('grid');

    var createView = function(options){
        var view = Backbone.View.extend({
            el:'.container',
            initialize:function(){
                this.render();
                this.initEvents();
                this.defaultClick();
            },
            render:function(){
                var me = this;
                var html = _.template(tpl)(options);
                me.type1 = 1;
                me.type2 = 1;
                me.$el.empty().append(html);
                me.dateBar = new dateBar({el:'.toolbar .fr'});
                me.renderServers();
                me.renderGrid();
            },
            renderServers:function(){
                if(options.servers.length == 0)
                    return;

                var me = this,
                    servers = options.servers,
                    serverName = options.serverName ? [options.serverName] : servers.slice(0,4),
                    chartUl = me.$el.find('ul.chart-chb'),
                    gridUl = me.$el.find('ul.grid-chb'),
                    chartHtml = !!options.serverName?'<li><input type="checkbox"><span>平均</span></li>':'<li><input type="checkbox" checked="checked"><span>平均</span></li>',
                    gridHtml = '<li><input type="checkbox" role="selectAll"><span>全部</span></li>';

                for(var i= 0,l=servers.length;i<l;i++){
                    gridHtml += '<li><input type="checkbox" role="common"><span>{0}</span></li>'.format(servers[i]);
                    if(serverName.indexOf(servers[i]) > -1)
                        chartHtml += '<li><input type="checkbox" role="common" checked="checked"><span>{0}</span></li>'.format(servers[i]);
                    else
                        chartHtml += '<li><input type="checkbox" role="common"><span>{0}</span></li>'.format(servers[i]);
                }
                chartUl.append(chartHtml);
                gridUl.append(gridHtml);
            },
            renderChart:function(data){
                var me = this,
                    tabType = me.type2,
                    servers = me.getServers(),
                    series = me.getSeries(servers,data),
                    titleArr = ['连接数','请求数','交易时间','交易成功率','超时比例'],
                    yArr = ['单位：个','单位：次','单位：毫秒(ms)','单位：百分比(%)','单位：百分比(%)'];
                var chart = echarts.init($('.graph-con')[0]);
                var option = {
                    title: {
                        text: titleArr[tabType-1],
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c}'
                    },
                    legend: {
                        left: 'center',
                        y:'bottom',
                        data: servers
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {show: false},
                        data: data.xData
                    },
                    yAxis: {
                        type: 'value',
                        name: yArr[tabType-1]
                    },
                    series: series
                };
                chart.setOption(option);
            },
            renderGrid:function(){
                $('.content-grid').empty();
                var option = {
                    el:'.content-grid',
                    url:'data.do?func=service:getServiceDetailByGrid',
                    plugin:'page',
                    autoLoad:false,
                    tableCss:'table-con mb-20',
                    columns:[{
                        name:'serverName',
                        text:'服务器'
                    },{
                        name:'connectCount',
                        text:'连接数(次)'
                    },{
                        name:'requestCount',
                        text:'请求数(次)'
                    },{
                        name:'failCount',
                        text:'失败次数(次)',
                        renderer:function(val){
                            if(val == 0)
                                return val;
                            else{
                                return '<a href="javascript:;" role="action failDetail">{0}</a>'.format(val);
                            }
                        }
                    },{
                        name:'succPercent',
                        text:'交易成功率(%)'
                    },{
                        name:'connectTime',
                        text:'交易时间'
                    },{
                        name:'timeoutPercent',
                        text:'超时比例(%)'
                    },{
                        name:'recordTime',
                        text:'统计时间',
                        renderer:function(val){
                            return new Date(val).Format('yyyy-MM-dd HH:mm:ss')
                        }
                    }]
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
                    me.onChangeType($(this));
                }).on('click','.graph-tab li',function(e){
                    var dom = $(this);
                    dom.addClass('current').siblings().removeClass('current');
                    me.type2 = dom.index()+1;
                    me.queryData();
                }).on('click','a[role=export]',function(e){
                    me.onExport();
                }).on('change','ul input[type=checkbox]',function(e){
                    me.onChbChange($(this));
                }).on('timeChange','.toolbar .fr div[role=dateBar]',function(e,value){
                    me.queryData();
                });
            },
            defaultClick:function(){
                var me = this;
                me.$el.find('a[role=query]').trigger('click');
                me.$el.find('.btn-search-hide').trigger('click');
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
                var me = this;
                if(me.type1 == 1){
                    me.$el.find('.graph').removeClass('hide').next().addClass('hide');
                }
                else{
                    me.$el.find('.graph').addClass('hide').next().removeClass('hide');
                }
                var param = me.getParam();
                if(!param)
                    return;

                if(me.type1 == 1){
                    me.loadChartData(param);
                }
                else{
                    me.loadGridData(param);
                }
            },
            loadChartData:function(param){
                var me = this;
                util.request({
                    url:'data.do?func=service:getServiceDetailByChart',
                    param:param,
                    fnSuc:function(resp){
                        me.renderChart(resp['var']);
                    }
                });
            },
            loadGridData:function(param){
                this.gridView.requestData(param,1);
            },
            onChangeType:function(dom){
                var me = this;
                dom.addClass('current').siblings().removeClass('current');
                me.$el.find('.graph-tab li:first').addClass('current').siblings().removeClass('current');
                me.type1 = dom.index()+1;
                me.$el.find('.retrieval-con ul:eq({0})'.format(me.type1-1)).removeClass('hide').siblings('ul').addClass('hide');
                //me.queryData();
            },
            onChbChange:function(dom){
                var val = dom.is(':checked'),
                    ul = dom.parent().parent();
                if(dom.attr('role') == 'selectAll'){
                    ul.find('input[type=checkbox]').prop('checked',val);
                }

                if(ul.hasClass('chart-chb')){
                    var selectItems = ul.find('input[type=checkbox]:checked');
                    if(selectItems.length > 5){
                        dom.prop('checked',false);
                        alert('最多只能选择五条曲线');
                    }
                }
            },
            onExport:function(){
                alert('daochu');
            },
            getParam:function(){
                var me = this,
                    param = {},
                    typeParams = me.getServers(),
                    dateBar = me.dateBar;

                param.type = me.type;
                $.extend(param,dateBar.getValue(null,'yyyy-MM-dd HH:mm'));
                param.typeParams = [];

                if(!me.isParamValid(param))
                    param = null;
                if(typeParams.length > 0)
                    param.typeParams = typeParams.join(',');
                if(me.type1 == 1)
                    param.tabType = me.type2;
                return param;
            },
            getServers:function(){
                var me = this,
                    targetUl = me.type1 == 1 ? 'chart-chb':'grid-chb',
                    ul = me.$el.find('.retrieval-con ul.{0}'.format(targetUl)),
                    checkBoxs = ul.find('input[type=checkbox]:checked'),
                    servers = [];

                checkBoxs.each(function(index,item){
                    servers.push($(item).next().text());
                });

                return servers;
            },
            getSeries:function(servers,data){
                var series = [];

                for(var i = 0,l=servers.length;i<l;i++){
                    series.push({
                        name:servers[i],
                        type:'line',
                        data:data.yData[i]
                    });
                }

                return series;
            },
            isParamValid:function(param){
                var result = true;
                if(!util.compareTimeValid(param.st,param.et)){
                    util.showMsg('');
                    result = false;
                }
                if(param.type == 1 && param.typeParams == ''){
                    util.showMsg('请至少选择一个服务器参数作为曲线查询条件');
                    result = false;
                }

                return result;
            }
        });

        return new view(options);
    };

    return createView;
});