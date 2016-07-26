/**
 * updateConfigType.js
 * usage: 故障告警-修改告警配置
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('updateConfigType',function(require,exports,module){
  var tpl = require('{rootPath}/template/alarm/updateConfigType.html');
  var alarmApi = require("alarmApi");

  var updateConfigView = function(){
    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
          this.render();
          this.initEvents();
          
        },
        render:function(){
          var me = this;
          var html = _.template(tpl)({});
          this.$el.empty().append(html);
          $("div.content_main").append(util.format_advanced($("#config-update-tpl").html(), {}));
        },
        initEvents:function(){
          var me = this;
          me.$el.off().on("click",'a[role=back]',function(){
            util.jumpModule("alarm/configList");
          })
        }
        
    })
    return new view();
  }
  return updateConfigView;
})