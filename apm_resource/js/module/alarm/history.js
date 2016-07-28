/**
 * history.js
 * usage: 故障告警-告警历史
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('history',function(require,exports,module){
    var tpl = require('{rootPath}/template/alarm/history.html');
    var grid = require('grid');
    var alarmApi = require("alarmApi");

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.initEvents();
            this.selectEventHandler();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
            this.renderGrid();
        },
        renderGrid:function(){
            $('.content_main').empty();
            var option = {
                el:'.content_main',
                url:'data.do?func=alarm:history',
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[{
                    name:'id',
                    text:'序号'
                },{
                    name:'mitWay',
                    text:'监控方式'
                },{
                    name:'mitName',
                    text:'监控点名称'
                },{
                    name:'mitType',
                    text:'监控类型',
                    renderer:function(val){
                        var str = 'VIP监控';
                        
                        return str;
                    }
                },{
                    name:'reason',
                    text:'告警原因'
                },{
                    name:'province',
                    text:'省份/IP'
                },{
                    name:'status',
                    text:'处理状态'
                },{
                    name:'alarmLevel',
                    text:'告警等级'
                },{
                    name:'lastStateChange',
                    text:'持续时长'
                },{
                    name:'lastUpdate',
                    text:'更新时间'
                },{
                    name:'',
                    text:'操作',
                    renderer:function(val,index ,item){
                        var str = '';
                        str = $("#list-modify").html();
                        return str;
                    }
                }]
                //plugin:'page'
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
                me.onQuery();
            }).on('click','a[role=add]',function(e){
                me.onAdd();
            }).on('click','a[role=history-detail]',function(e){
                me.onDetail($(this));
            });
        },
        /**
         * 查询下拉框事件处理
         * @return {[type]} [description]
         */
        selectEventHandler:function(){
            var me = this;

            me.renderMitType();
            me.renderMitName();
            me.renderProvince();

            util.my_select();

        },
        //监控点类型
        renderMitType:function(){
            var me=this;
            $("select[name=mitType]").empty().html(util.createOptions(gMain.monitoringType,"mitName","mitId"));
        },
        //监控点名称
        renderMitName:function(){
            var me = this;
           $("select[name=mitType]").on("change",function(){
                var mitId = $(this).val();
                var mitPoints = gMain.monitoringPoints["mitId_"+mitId];
                var mitNameHtml = '<select style="display:none" widthNo="150" name="mitName">';
                mitNameHtml += util.createOptions(mitPoints,"itemTypeName","itemTypeId");
                mitNameHtml += "</select>";
                $("div[role=mitName]").empty().html(mitNameHtml);
                util.my_select();
           })
        },
        //省份
        renderProvince:function(){
            var me = this;
            $("select[name=corpId]").empty().html(util.createOptions(gMain.provinceList,"corpName","corpId"));
        },
        onQuery:function(){
            var me = this;
            me.gridView.requestData(me.getParam);
        },
        getParam:function(){
            var param = {
                mitWay:$("select[name=mitWay]").val(),
                mitType:$("select[name=mitType]").val(),
                mitName:$("select[name=mitName]").val(),
                province:$("select[name=province]").val(),
                status:$("select[name=status]").val(),
                alarmLevel:$("select[name=alarmLevel]").val(),
                startTime:$("input[name=startTime]").val(),
                endTime:$("input[name=endTime]").val()
            }
            return param;

        },
        onDetail:function(_self){
            var me = this;
            var fnSuc = function(resp){
                var obj = resp["var"];
                if(obj){
                    var content = $("#history-detail-tpl").html();
                    content = util.format_advanced(content,obj);
                    util.dialog('告警详情',content,function(){
                        
                    });
                }else{
                    util.showMsg("获取详情失败",2);
                }
                
            }
            alarmApi.getAdviceDetail({fnSuc:fnSuc});
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
        }
    });
    return {view:view};
});