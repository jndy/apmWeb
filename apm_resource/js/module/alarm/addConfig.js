/**
 * addConfig.js
 * usage: 故障告警-告警配置列表-新建告警配置
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('addConfig',function(require,exports,module){
    var tpl = require('{rootPath}/template/alarm/addConfig.html');
    var alarmApi = require("alarmApi");

    var addConfigView = function(){
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
                me.requestConfig()
            },
            renderContent:function(resp){
                var list = resp["var"]["dataList"];
                if(list && list.length>0){
                    var html = "";
                    var template = $("#add-config-list").html();
                    for(var i=0; i<list.length; i++){
                        html += util.format_advanced(template,list[i]);
                    }
                    $("#config-type-list").html(html);
                }else{
                    util.showMsg('系统没有配置告警配置类型',-1);
                }
            },
            /**
             * 请求告警配置类型
             * @return {[type]} [description]
             */
            requestConfig:function(){
                var me = this;
                var fnSuc = function(resp){
                    me.renderContent(resp);
                };
                alarmApi.getConfigType({fnSuc:fnSuc});
            },
            initEvents:function(){
                var me = this;
                me.$el.off().on("click",'.add-config-type',function(e){
                    me.addConfigType()
                })
            },
            addConfigType:function(){
                var me = this;
                util.jumpModule("alarm/configList?childView=addConfigType");
            }
        });
        return new view();
    }
    return addConfigView;
});