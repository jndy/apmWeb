/**
 * userServiceDetail.js
 * usage: 质量监控-用户服务质量-监控点详情
 * development by zxh
 * create at 2016-07-13
 * useing jQuery JavaScript frame v1.7+
 */
define('userServiceDetail',function(require,exports,module){
    var tpl = require('{rootPath}/template/monitor/userServiceDetail.html'),
        dateBar = require('dateBar'),
        grid = require('grid');

    var createView = function(options){
        var view = Backbone.View.extend({
            el:'.container',
            initialize:function(){
                this.render();
                this.initEvents();
            },
            render:function(){
                var data = {itemName: options.item_name, itemDescription: options.item_description, provinceList: gMain.provinceList};
                var html = _.template(tpl)(data);
                this.$el.empty().append(html);  
                this.renderCmp();

                var params = this.getParam();
                this.renderChart(params);                
                // this.renderGrid(params);
            },
            renderChart:function(params){
                var me = this;
                util.request({
                    url:'data.do?func=service:getUserServiceDetail',
                    param:params,
                    fnSuc:function(resp){
                        var rData = resp['var'];
                        var xAxis = [], seriesNums = [], seriesErrors = [], seriesRate = [], seriesTime = [];
                        for(var i=0, dl=rData['dataList']; i<dl.length; i++){                            
                            xAxis.push(dl[i].name);
                            seriesRate.push({value: dl[i].rate, nums: dl[i].nums, errors: dl[i].errorNums});
                            seriesTime.push({value: dl[i].averageTime, nums: dl[i].nums, errors: dl[i].errorNums});
                        }

                        // 指定图表的配置项和数据
                        var operate = me.getShortName(options.item_name);
                        var colors = ['#5793f3', '#d14a61', '#333333'];
                        var getOption = function(idx){
                            var option = {
                                tooltip: { 
                                    trigger: 'axis',
                                    formatter: function (params, ticket, callback) {
                                        if(params[0]['data'] != undefined){
                                            if(idx == '1'){//成功率
                                                return params[0]['name']+ '<br />'+operate+'次数: '+params[0]['data']['nums']+' 次<br />失败次数: '+params[0]['data']['errors']+' 次<br />'+operate+'成功率: '+params[0]['value']+' %';
                                            }else{
                                                return params[0]['name']+ '<br />'+operate+'次数: '+params[0]['data']['nums']+' 次<br />平均响应时间: '+params[0]['value'].toFixed(2)+' ms';
                                            }
                                        }else{
                                            return params[0]['name']+ '<br />'+operate+'次数: 无数据<br />失败次数: 无数据<br />';
                                        }
                                    }    
                                },
                                grid: {
                                    left: '5%',
                                    right: '3%',
                                    top: '10%',
                                    bottom: '5%'
                                },
                                color: colors,
                                xAxis: {
                                    type: 'category',
                                    axisTick: {
                                        alignWithLabel: true
                                    },
                                    data: xAxis
                                },
                                yAxis: [{
                                    type: 'value',
                                    name: (idx == '1') ? operate+'成功率' : '系统响应时间',
                                    position: 'left',
                                    axisLine: {
                                        lineStyle: {
                                            color: colors[2],
                                            formatter: '{value} %'
                                        }
                                    },
                                    axisLabel: {
                                        formatter: (idx == '1') ? '{value} %' : '{value} ms'
                                    }
                                }],
                                series: [{
                                    name: (idx == '1') ? operate+'成功率' : '系统响应时间',
                                    type: (params.corpId > 0) ? 'line' : 'bar',
                                    data: (idx == '1') ? seriesRate : seriesTime
                                }]
                            };
                            return option;
                        };

                        // 基于准备好的dom，初始化echarts实例
                        var successRate = echarts.init(document.getElementById('successRate')); 
                        // 使用刚指定的配置项和数据显示图表。
                        successRate.setOption(getOption(1));

                        var averageTime = echarts.init(document.getElementById('averageTime'));                        
                        averageTime.setOption(getOption(2));
                    }
                });
            },
            renderGrid:function(params){
                var me = this;
                $('.grid-content').empty();
                var operate = me.getShortName(options.item_name);
                var option = {
                    el:'.grid-content',
                    url:'data.do?func=service:getUserServiceDetail',
                    params: params,
                    plugin:'page',
                    tableCss:'table-con mb-20',
                    columns:[{
                        renderer:'serial',
                        text:'序号'
                    },{
                        name:'name',
                        text: (params.corpId == '0') ? '省份' : '时间'
                    },{
                        name:'nums',
                        text: operate+'次数'
                    },{
                        name:'errorNums',
                        text: operate+'失败次数',
                        renderer:function(val, index, item){
                            var str = "";
                            if(val > 0){
                                str = "<a href='javascript:;' role='showError' corpId='"+item.corpId+"' timeValue='"+item.timeValue+"''>"+val+"</a>";
                            }else{
                                str = val;
                            }
                            return str;
                        }
                    },{
                        name:'rate',
                        text: operate+'成功率(%)',
                        renderer:function(val){
                            return val + '%';
                        }
                    },{
                        name:'averageTime',
                        text:'系统平均响应时间(ms)',
                        renderer:function(val){
                            return val.toFixed(2) + 'ms';
                        }
                    }]
                };
                var gridView = new grid(option);
                me.gridView = gridView;
            },
            getShortName: function(str){
                str = str.replace(/[a-z0-9]/ig,"");
                if(str.length > 3){
                    return str.substr(-2);
                }else{
                    return str;
                }
            },
            renderCmp:function(){
                this.dateBar = new dateBar({el:'.toolbar .fr'});
                util.my_select(); 
            },
            initEvents:function(){
                var me = this;
                me.$el.off().on('click','.btn-search-hide',function(e){
                    var dom = $(this).find('i');
                    me.showQueryDiv(dom);
                }).on('click','a[role=goback]',function(e){
                    me.goback();
                }).on('click','a[role=query]',function(e){
                    me.goSearchData();
                }).on('click','a[role=export]',function(e){
                    me.exportData();
                }).on('click','a[role=showError]',function(e){
                    var opt = {};
                    opt.corpId = $.trim($(this).attr('corpId'));
                    opt.timeValue = $.trim($(this).attr('timeValue'));
                    me.showErrorDetail(opt);
                }).on('click','input[name=showStyle]',function(e){
                    me.changeShowStyle($(this).val());
                }).on('timeChange','.toolbar .fr div[role=dateBar]',function(e,value){
                    me.goSearchData();
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
            /*失败原因分析*/
            showErrorDetail:function(opt){
                var me = this;
                var params = me.getParam();
                delete params.orderBy;
                delete params.showStyle;
                params.corpId = opt.corpId;
                params.timeValue = opt.timeValue;
                util.request({
                    url:'data.do?func=service:getUserServiceErrors',
                    param: params,
                    fnSuc:function(res){
                        var data = res['var']['dataList'];
                        me.showErrorDetailDialog(data);
                    }
                });
            },
            /*失败原因分析弹出框*/
            showErrorDetailDialog: function(data){
                var me = this, data = data,
                    content = _.template('<div class="graph-con" style="height: 300px; width:600px;" id="errorDetail"></div>')({});  

                var seriesData = [], legendData = [];
                for(var i=0; i<data.length; i++){ 
                    legendData.push(data[i]['name']);                           
                    seriesData.push({value:data[i]['errorNums'], name:data[i]['name']});
                }
                util.dialog('  ',content,null,null,{cancelDisplay:false,onshow:function(){
                    //渲染图表
                    var errorDetail = echarts.init(document.getElementById('errorDetail'));      
                    var option = {
                        title : {
                            text: '失败原因分析',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}次 ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'right',
                            align: 'left',
                            y: 'middle',
                            data: legendData,
                            formatter: function (name) {
                                var idx = legendData.indexOf(name);
                                return name + ':' + seriesData[idx]['value'] + '次';
                            }
                        },
                        series : [
                            {
                                name: '错误来源',
                                type: 'pie',
                                radius : '65%',
                                center: ['20%', '50%'],
                                data: seriesData,
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
                    errorDetail.setOption(option);
                }});
            },
            goSearchData:function(){
                var params = this.getParam();
                if(params.showStyle == "1"){
                    this.$el.find('.graph').removeClass('hide');
                    this.$el.find('.content_main').addClass('hide');
                    this.renderChart(params);                
                }else{
                    this.$el.find('.graph').addClass('hide');
                    this.$el.find('.content_main').removeClass('hide');
                    this.renderGrid(params);
                }
            },
            exportData: function(){
                var opt = {};
                opt.url = 'exportUserServiceDetail.do';
                opt.param = this.getParam();
                util.exports(opt);
            },
            changeShowStyle: function(val){
                if(val == "2"){
                    $('#liorderBy').removeClass('hide');
                }else{
                    $('#liorderBy').addClass('hide');
                }
            },
            getParam:function(){
                var me = this,
                    param = {},
                    corpId,showStyle,startTime,endTime;

                param.dataType = 1;
                param.itemTypeId = options.item_id;

                corpId = util.getVal('.retrieval-con span[name=corpId]','select');
                if(corpId != undefined){
                    param.corpId = corpId;
                }

                orderBy = util.getVal('.retrieval-con span[name=orderBy]','select');
                if(corpId != undefined){
                    param.orderBy = orderBy;
                }                

                showStyle = util.getVal('.retrieval-con input[name=showStyle]:checked');
                if(showStyle != undefined){
                    param.showStyle = showStyle;
                }

                var vDate = me.dateBar.getValue();
                param.startTime = vDate.st.Format('yyyy-MM-dd HH:mm');
                param.endTime = vDate.et.Format('yyyy-MM-dd HH:mm');
                param.period = vDate.timeType;

                if(!util.compareTimeValid(param.startTime, param.endTime)){
                    return null;
                }                    

                return param;
            },
            goback:function(){
                $('.child-li.current').trigger('click');
            }
        });

        return new view(options);
    }

    return createView;
});