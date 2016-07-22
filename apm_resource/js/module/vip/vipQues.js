/**
 * vipQues.js
 * usage: VIP保障-VIP用户问题跟踪
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('vipQues',function(require,exports,module){
  var tpl = require('{rootPath}/template/vip/vipQues.html');

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