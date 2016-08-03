/**
 * dataAnalasy.js
 * usage: 业务拨测-拨测数据分析
 * development by zxh
 * create at 2016-07-13
 * useing jQuery JavaScript frame v1.7+
 */
define('dataAnalasy',function(require,exports,module){
    var tpl = require('{rootPath}/template/business/dataAnalasy.html'),
        dateBar = require('dateBar'),
        grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.initEvents();
        },
        render:function(){
            var data = {itemName: '拨测数据分析', 
                        itemDescription: '对拨测客户端拨测的数据进行统计分析，方便查找和定位问题，保障拨测客户端的畅通使用。', 
                        provinceList: gMain.provinceList,
                        monitoringPoints: gMain.monitoringPoints.mitId_3
                    };
            var html = _.template(tpl)(data);
            this.$el.empty().append(html);  
            this.renderCmp();

            var params = this.getParam();              
            this.renderGrid(params);
        },
        renderGrid:function(params){
            $('.grid-content').empty();
            var option = {
                el:'.grid-content',
                url:'data.do?func=business:getDataAnalasyList',
                params: params,
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[{
                    renderer:'serial',
                    text:'序号'
                },{
                    name:'userEmail',
                    text:'拨测邮箱账号'
                },{
                    name:'corpName',
                    text: '省份'
                },{
                    name:'itemTypeName',
                    text:'监控点名称'
                },{
                    name:'testingNums',
                    text:'拨测次数',
                    renderer:function(val, index, item){
                        if(val > 0){
                            return "<a href='javascript:;' role='showTrace' itemTypeId='"+item.itemTypeId+"' userEmail='"+item.userEmail+"' corpId='"+item.corpId+"'>"+val+"</a>";
                        }else{
                            return val;
                        } 
                    }
                },{
                    name:'testingErrors',
                    text:'失败次数',
                    renderer:function(val, index, item){
                        if(val > 0){
                            return "<a href='javascript:;' role='showError' userEmail='"+item.userEmail+"' corpId='"+item.corpId+"'>"+val+"</a>";
                        }else{
                            return val;
                        }                        
                    }
                },{
                    name:'successRates',
                    text:'登录成功率(%)',
                    renderer:function(val){
                        return val + '%';
                    }
                },{
                    name:'avgSendTime',
                    text:'平均响应时间(ms)',
                    renderer:function(val){
                        return val.toFixed(2) + 'ms';
                    }
                },{
                    name:'maxSendTime',
                    text:'拨测最大时延(ms)',
                    renderer:function(val){
                        return val.toFixed(2) + 'ms';
                    }
                }]
            };
            var gridView = new grid(option);
            this.gridView = gridView;
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
            }).on('click','a[role=query]',function(e){
                me.goSearchData();
            }).on('click','a[role=export]',function(e){
                me.exportData();
            }).on('click','a[role=showTrace]',function(e){
                var opt = {};
                opt.corpId = $.trim($(this).attr('corpId'));
                opt.itemTypeId = $.trim($(this).attr('itemTypeId'));
                opt.userEmail = $.trim($(this).attr('userEmail'));
                me.showActionTrace(opt);
            }).on('click','a[role=showError]',function(e){
                var opt = {};
                opt.corpId = $.trim($(this).attr('corpId'));
                me.showErrorDetail(opt);
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
        goSearchData:function(){
            var params = this.getParam();
            this.renderGrid(params);           
        },
        exportData: function(){
            var opt = {};
            opt.url = 'exportDataAnalasyList.do';
            opt.param = this.getParam();
            util.exports(opt);
        },
        showActionTrace:function(opt){
            //$('.child-li:eq(1)').trigger('click');
            var url = 'business/actionTrace?corpId='+opt.corpId+'&itemTypeId='+opt.itemTypeId+'&userEmail='+opt.userEmail;
            util.jumpModule(url);
        },
        showErrorDetail:function(opt){
            var me = this;
            var params = me.getParam();
            delete params.orderBy;
            delete params.showStyle;
            params.corpId = opt.corpId;
            params.dataType = '1';
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
                        align:'left',
                        y:'middle',
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
        getParam:function(){
            var me = this,
                param = {},
                corpId,itemTypeId,userEmail,orderBy,startTime,endTime;

            corpId = util.getVal('.retrieval-con span[name=corpId]','select');
            if(corpId != undefined){
                param.corpId = corpId;
            }

            itemTypeId = util.getVal('.retrieval-con span[name=itemTypeId]','select');
            if(itemTypeId != undefined){
                param.itemTypeId = itemTypeId;
            }

            userEmail = util.getVal('.retrieval-con input[name=userEmail]');
            if(userEmail != undefined){
                param.userEmail = userEmail;
            }

            orderBy = util.getVal('.retrieval-con span[name=orderBy]','select');
            if(corpId != undefined){
                param.orderBy = orderBy;
            }                

            var vDate = me.dateBar.getValue();
            param.startTime = vDate.st.Format('yyyy-MM-dd HH:mm');
            param.endTime = vDate.et.Format('yyyy-MM-dd HH:mm');
            param.timeType = vDate.timeType;

            if(!util.compareTimeValid(param.startTime, param.endTime)){
                return null;
            } 

            return param;
        }
    });

    return {view:view};    
});