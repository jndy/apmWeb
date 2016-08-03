/**
 * addConfigType.js
 * usage: 故障告警-告警配置列表-新建告警配置
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('addConfigType',function(require,exports,module){
    var tpl = require('{rootPath}/template/alarm/addConfigType.html'),
        ruleTpl = require('{rootPath}/template/alarm/addConfigRule.html');
    var alarmApi = require("alarmApi");
    var alarmCommon = require("alarmCommon");
    var notifier = require("notifier");

    var addConfigTypeView = function(options){
        if(!options){
            options = {
                type:1
            }
        }
        //获取地址栏参数JSON对象
        var urlParamObj = util.urlParamObj(location.hash);

        var view = Backbone.View.extend({
            el:'.container',
            initialize:function(){
                this.render();
                this.initEvents();
                this.ruleWayEventHandler();
            },
            render:function(){
                var me = this;
                var html = _.template(tpl)({});
                this.$el.empty().append(html);

                $("select[name='time-1'],select[name='time-2'],select[name='time-3'],select[name='time-4']").html($("#sms-time-option").html());
                $("select[name='time-1'],select[name='time-3']").find("option[value='18:00']").attr("selected","true");
                $("select[name='time-2'],select[name='time-4']").find("option[value='21:00']").attr("selected","true");
                //util.my_select();

                me.request.getMonitor(me);
            },
            /**
             * ajax请求
             * @return {[type]} [description]
             */
            request:{
                getMonitor:function(me){
                    var fnSuc = function(resp){
                        me.renderMonitor(resp);
                    }
                    alarmApi.getMonitor({fnSuc:fnSuc});
                },
                getConfigRule:function(me, id){
                    var fnSuc = function(resp){
                        me.renderConfigRule(resp);
                    }
                    if(id==""){
                        $("#config-rule").empty();
                        return false;
                    }
                    alarmApi.getConfigRule({fnSuc:fnSuc,param:{id:id}});
                },
                searchUser:function(me){
                    
                }
            },
            /**
             * 选择监控点
             * @param  {[type]} resp [description]
             * @return {[type]}      [description]
             */
            renderMonitor:function(resp){
                var list = resp["var"]["dataList"] || [];
                var options = "",
                    template = $("#monitor-template").html();
                for(var i = 0; i<list.length; i++){
                    options += util.format_advanced(template,list[i]);
                }
                $("select[name='monitor_id']").append(options);
                util.my_select();
            },
            /**
             * 渲染监控规则
             * @return {[type]} [description]
             */
            renderConfigRule:function(resp){
                var ruleList = resp["var"]["alarmCondition"] || [];
                $("#config-rule").empty().append(alarmCommon.getConfigRule(ruleList));
                util.my_select();
            },
            initEvents:function(){
                var me = this;
                me.$el.off().on("click",'.add-config-type',function(){

                }).on("click","a[role='config-save']",function(){
                    me.onConfigSave();
                }).on("click","a[role='back']",function(){
                    util.jumpModule("alarm/configList?childView=addConfig");
                }).on("click","a[role=select-notifier]",function(){
                    me.onNotifier();
                }).on("change","select[name='monitor_id']",function(e){
                    var id = $(this).val();
                    me.request.getConfigRule(me,id);
                    e.stopPropagation();
                    e.preventDefault();
                });
            },
            /**
             * 告警方式事件
             * @return {[type]} [description]
             */
            ruleWayEventHandler:function(){
                var me = this;
                me.$el.on("click","input[name='mailF'],input[name='smsF']",function(){
                    var name = $(this).attr('name') + "_";
                    var isChecked = $(this).is(":checked");
                    if(isChecked){
                        $("input[name^='"+name+"']").prop("checked",true);
                    }else{
                        $("input[name^='"+name+"']").prop("checked",false);
                    }
                }).on("click","input[name^='smsF_']",function(){
                    if($("input[name^='smsF_']").filter(":checked").length==0){
                        $("input[name='smsF']").prop("checked",false);
                    }else{
                        $("input[name='smsF']").prop("checked",true);
                    }
                }).on("click","input[name^='mailF_']",function(){
                    if($("input[name^='mailF_']").filter(":checked").length==0){
                        $("input[name='mailF']").prop("checked",false);
                    }else{
                        $("input[name='mailF']").prop("checked",true);
                    }
                })
            },
            /**
             * 选择常用通知人
             * @return {[type]} [description]
             */
            onNotifier:function(){
                var content = $("#notifier-tpl").html();
                util.dialog('',content,function(){
                    var notifiers = notifier.getNotifiers();
                    $("div[role=selected-notifier]").empty().html(alarmCommon.getNotifierHtml(notifiers));
                });
                notifier.init();
            },
            /**
             * 保存配置
             * @return {[type]} [description]
             */
            onConfigSave:function(){
                var me = this;
                if(typeof(alarmCommon.getConfigTypeParam()) != "boolean"){
                    var fnSuc = function(resp){
                        util.showMsg("告警配置保存成功",1);
                        //跳转
                    }
                    alarmApi.saveConfig({fnSuc:fnSuc,param:alarmCommon.getConfigTypeParam()});
                }
            }
        });
        return new view();
    };
    return addConfigTypeView;
});