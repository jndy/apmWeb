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
            this.initEvents();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
            util.my_select();
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

            me.$el.off().on('click','.btn-search-hide',function(e){
                var dom = $(this).find('i');
                me.showQueryDiv(dom);
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
        }
      })

  return {view:view};
})