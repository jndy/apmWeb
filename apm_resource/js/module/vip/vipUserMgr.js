/**
 * vipUserMgr.js
 * usage: VIP保障-VIP用户管理
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('vipUserMgr',function(require,exports,module){
  var tpl = require('{rootPath}/template/vip/vipUserMgr.html');
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
        renderGrid: function(){
            $('.content_main').empty();
            var option = {
                el:'.content_main',
                url:'data.do?func=vip:getVipUserList',
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[
                    {
                        name:'id',
                        text:'序号'
                    },{
                        name:'province',
                        text:'省份'
                    },{
                        name:'account',
                        text:'VIP用户帐号'
                    },{
                        name:'userName',
                        text:'VIP用户姓名'
                    },{
                        name:'VIPLevel',
                        text:'VIP服务等级'
                    },{
                        name:'status',
                        text:'跟踪状态'
                    },{
                        name:'updateTime',
                        text:'更新时间'
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