/**
 * vipExp.js
 * usage: VIP保障-VIP用户体验跟踪
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('vipExp',function(require,exports,module){
  var tpl = require('{rootPath}/template/vip/vipExp.html');

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

        }
      })

  return {view:view};

})