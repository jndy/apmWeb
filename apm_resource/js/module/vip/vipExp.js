/**
 * vipExp.js
 * usage: VIP保障-VIP用户体验跟踪
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('vipExp',function(require,exports,module){
  var tpl = require('{rootPath}/template/vip/vipExp.html');
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
                url:'data.do?func=vip:getVipExpList',
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[
                    {
                        name:'id',
                        text:'序号'
                    },{
                        name:'operTime',
                        text:'统计日期'
                    },{
                        name:'mitName',
                        text:'统计方式'
                    },{
                        name:'respTime',
                        text:'监控点名称'
                    },{
                        name:'status',
                        text:'VIP用户数'
                    },{
                        name:'',
                        text:'操作',
                        renderer:function(val,index ,item){
                            var str = '';
                            str = $("#list-modify").html();
                            return str;
                        }
                    }
                ]
                //plugin:'page'
            };
            var gridView = new grid(option);
            this.gridView = gridView;
        },
        initEvents:function(){
            var me = this;

        }
      })

  return {view:view};

})