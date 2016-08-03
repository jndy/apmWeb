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
                me.selectEventHandler();
            }).on("click","a[role=vip-export]",function(e){
                me.onExport();
            })
        },
        selectEventHandler:function(){
            var me = this;
            me.renderProvince();
            me.renderMitName();
            util.my_select();
        },
        renderMitName:function(){
            $("select[name=mitName]").empty().html(util.createOptions(gMain.monitoringPoints["mitId_4"],"itemTypeName","itemTypeId"));
        },
        renderProvince:function(){
            var me = this;
            $("select[name=statisticsWay]").on("change", function(){
                var val = $(this).val();
                 var selectHtml = '<select style="display:none;" widthNo="150" name="corpId">';
                if(1 == val){
                    selectHtml += util.createOptions(gMain.provinceList,"corpName","corpId");
                }else{
                    selectHtml += "<option value=''>全部</option>";
                }
                selectHtml += "</select>";
                $("div[role=corpId]").empty().html(selectHtml);
                util.my_select();
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
            me.gridView.requestData(me.getParam(),1);
        },
        getParam:function(){
            var param = {
                statisticsWay:$("select[name=statisticsWay]").val(),
                corpId:$("select[name=corpId]").val(),
                mitName:$("select[name=mitName]").val()
            };
            var statisticsCycleVal = $("select[name=statisticsCycle]").val();

            param["startTime"] = $("input[name=startTime]").val();

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

            $("li[role=vip-time-container]").empty().html(statisticsCycle);

            if(val == 2){                                
                $("#monthTime").on("click",function(){
                    var $this = $(this);
                    laydate({
                        elem:"#monthTime",
                        istime: false, 
                        format: 'YYYY-MM-DD',
                        max:laydate.now(),
                        choose:function(date){
                            //return date.replace(/\-\d+$/,"");
                            $this.val(date.replace(/\-\d+$/,""));
                        }
                    });
                    $this.val($(this).val().replace(/\-\d+$/,""));
                    $("#laydate_table").css({display:"none"});
                })

            }else{
                $("#laydate_table").css({display:"block"});
            }

        }
      })

  return {view:view};
})