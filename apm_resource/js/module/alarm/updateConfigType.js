/**
 * updateConfigType.js
 * usage: 故障告警-修改告警配置
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('updateConfigType',function(require,exports,module){
  var tpl = require('{rootPath}/template/alarm/updateConfigType.html');
  var alarmApi = require("alarmApi");
  var alarmCommon = require("alarmCommon");
  var notifier = require("notifier");

  var updateConfigView = function(){
    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
          this.render();
          this.renderConfigData();
          this.initEvents();
          
        },
        render:function(){
          var me = this;
          var html = _.template(tpl)({});
          this.$el.empty().append(html);
        },
        initEvents:function(){
          var me = this;
          me.$el.off().on("click",'a[role=back]',function(){
            util.jumpModule("alarm/configList");
          }).on("click",'a[role=select-notifier]',function(){
            me.onNitifier();
          })
        },
        onNitifier:function(){
          var me = this;
          var content = $("#notifier-tpl").html();
              util.dialog('',content,function(){
                  var notifiers = notifier.getNotifiers();
                  $("div[role=selected-notifier]").empty().html(alarmCommon.getNotifierHtml(notifiers));
              });
              notifier.init({notifiers:me.notifiers});
        },
        /**
         * 渲染修改配置数据
         * @return {[type]} [description]
         */
        renderConfigData:function(){
          var me = this;
          var type = 1, itemTypeId=1;
          var fnSuc = function(resp){
            var data = resp["var"];
            var mitName = data["mit_name"];

            var alarmCondition = alarmCommon.getConfigRule((data["alarmCondition"] || []));
            
            var notifiers = me.renderNotifiers(data["alarmUser"]);
            var times = me.renderAlarmTime(data["smsAlarmTime"]);

            var obj = {
              mitName:mitName,
              alarmCondition:alarmCondition,
              notifiers:notifiers
            }

            $("div.content_main").append(util.format_advanced($("#config-update-tpl").html(), obj));
            util.my_select();
            //渲染告警方式
            me.renderAlarmWay(data["smsF"], data["mailF"]);
          };
          alarmApi.getConfigRule({fnSuc:fnSuc,param:{type:type,mitId:itemTypeId}});
        },
        /**
         * 渲染告警方式
         * @return {[type]} [description]
         */
        renderAlarmWay:function(smsF,mailF){
          var me = this;

          
        },
        renderNotifiers:function(alarmUser){
          var me = this;
          var notifiers = {};
          $.each(alarmUser,function(key, val){
            if(val){
              var obj = {}
              $.each(val, function(index,item){
                var name = item["userName"];
                obj[name] = {'name':name,'realName':name};
              })
              notifiers[key] = obj;
            }
          });
          me.notifiers = notifiers;
          return alarmCommon.getNotifierHtml(notifiers);
        },
        renderAlarmTime:function(smsAlarmTime){
          var me = this;
          
        }
        
    })
    return new view();
  }
  return updateConfigView;
})