/**
 * vipQuality.js
 * usage: VIP保障-VIP服务质量报告
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('vipQuality',function(require,exports,module){
  var tpl = require('{rootPath}/template/vip/vipQuality.html');
  var grid = require('grid');

  var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.onRenderQueryForm();
            this.initEvents();
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
                url:'data.do?func=vip:getVipQualityList',
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[
                    {
                        name:'id',
                        text:'序号'
                    },{
                        name:'statisticsTime',
                        text:'统计日期'
                    },{
                        name:'statisticsWay',
                        text:'统计方式'
                    },{
                        name:'mitName',
                        text:'监控点名称'
                    },{
                        name:'vipCounts',
                        text:'VIP用户数'
                    },{
                        name:'statisticsCount',
                        text:'统计次数'
                    },{
                        name:'successCounts',
                        text:'成功次数'
                    },{
                        name:'errorCounts',
                        text:'失败次数'
                    },{
                        name:'successRate',
                        text:'成功率'
                    },{
                        name:'respTime',
                        text:'平均响应时间'
                    }
                ]
                //plugin:'page'
            };
            var gridView = new grid(option);
            this.gridView = gridView;
        },
        initEvents:function(){
            var me = this;

            me.$el.off().on('click','a[role=query]',function(e){
                me.onQuery();
            }).on("change","select[name=statisticsCycle]", function(e){
                me.onStatisticsWayChange($(this));
            }).on("click","a[role=vip-export]",function(e){
                me.onExport();
            })
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
        onExport:function(){
            alert('导出');
        },
        onQuery:function(){
            var me = this;
            me.gridView.requestData(me.getParam);
        },
        getParam:function(){
            var param = {
                statisticsWay:$("select[name=statisticsWay]").val(),
                province:$("select[name=province]").val(),
                mitName:$("select[name=mitName]").val()
            };
            var statisticsCycleVal = $("select[name=statisticsCycle]").val();

            if(0==statisticsCycleVal){
                param["startTime"] = $("input[name=startTime]").val();
                param["endTime"] = $("input[name=endTime]").val();
            }else if(1 == statisticsCycleVal){
                param["weekTime"] = $("select[name=weekTime]").val();
                param["weekNum"] = $("select[name=weekNum]").val();
            }else{
                param["monthTime"] = $("select[name=monthTime]").val();                
            }

            return param;
        },
        onStatisticsWayChange:function(obj){
            var me = this;
            var val = obj.val();
            me.onRenderQueryForm(val);            
        },
        onRenderQueryForm:function(val){
            var me = this;
            val = val ? val : 0;
            var tplObj = {
                "0":"vipqua-day-tpl",
                "1":"vipqua-week-tpl",
                "2":"vipqua-month-tpl"
            }

            var statisticsCycle = $("#" + tplObj[val]).html();

            var statisticsCycleHtml = util.format_advanced($("#vipqua-query-tpl").html(),{statisticsCycle:statisticsCycle});
            $("#vipqua-query").empty().html(statisticsCycleHtml);

            util.my_select();
        }
      })

  return {view:view};
})