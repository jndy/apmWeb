/**
 * addConfig.js
 * usage: 故障告警-告警配置列表-新建告警配置
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('addConfigType',function(require,exports,module){
    var tpl = require('{rootPath}/template/alarm/addConfigType.html'),
        ruleTpl = require('{rootPath}/template/alarm/addConfigRule.html');
    var alarmApi = require("alarmApi");
    var notifier = require("notifier");

    var addConfigTypeView = function(options){
        if(!options){
            options = {
                type:1
            }
        }
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
                getConfigRule:function(me){
                    var fnSuc = function(resp){
                        me.renderConfigRule(resp);
                    }
                    alarmApi.getConfigRule({fnSuc:fnSuc});
                },
                searchUser:function(me){
                    
                }
            },
            /**
             * 选人监控点
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
                var ruleTplHtml = "";
                if(ruleList.length>0){
                    ruleTplHtml = _.template(ruleTpl)({ruleList:ruleList});
                }else{
                    ruleTplHtml = "<div class='config-rule-tip'>该监控项下，没有配置相关指标</div>";
                }
               
                $("#config-rule").empty().append(ruleTplHtml);
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
                    me.request.getConfigRule(me);
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
                    var serious_1_html = "",
                        serious_2_html = "",
                        serious_3_html = "";
                    var getHtml = function(obj){
                        var html = "";
                        $.each(obj,function(key,val){
                            html += val["realName"]+"("+val["role"]+")，";
                        })
                        return html;
                    }
                    if(notifiers["serious_1"]){
                        //严重
                        serious_1_html = getHtml(notifiers["serious_1"]);
                        if(serious_1_html.length>0){
                            serious_1_html = "<div>严重级别：</div><div>"+ serious_1_html + "</div>";
                        }
                    }
                    if(notifiers["serious_2"]){
                        //较重
                        serious_2_html = getHtml(notifiers["serious_2"]);
                        if(serious_2_html.length>0){
                            serious_2_html = "<div>较重级别：</div><div>"+ serious_2_html + "</div>";
                        }
                    }
                    if(notifiers["serious_3"]){
                        //一般
                        serious_3_html = getHtml(notifiers["serious_3"]);
                        if(serious_3_html.length>0){
                            serious_3_html = "<div>一般级别：</div><div>"+ serious_3_html + "</div>";
                        }
                    }
                    var all = serious_1_html + serious_2_html + serious_3_html;
                    $("div[role=selected-notifier]").empty().html(all);
                });
                notifier.init();
            },
            /**
             * 保存配置
             * @return {[type]} [description]
             */
            onConfigSave:function(){
                var param = {
                    type:options.type,
                    mit_id:$("select[name='monitor_id']").val(),
                    descp:$.trim($("textarea[name='config-remark']").val())
                };
                var alarmCondition = [],
                    smsF = "",
                    mailF = "",
                    alarmUser = null,
                    smsAlarmTime = "";

                //监控点存在监控指标
                if($("div.mod-condition-con").length > 0){
                    $("div.mod-condition-con").each(function(){
                        var ruleId = $(this).data("ruleid");
                        var getVal = function(index){
                            var selectName = ruleId + "-select-serious-"+index,
                                inputName =  ruleId + "-input-serious-"+index;
                            var com = $("select[name="+selectName+"]").val(),
                                inputVal = $.trim($("input[name="+inputName+"]").val());
                            var returnVal = ((com==1)?">":"<") + inputVal;
                            return returnVal;
                        }
                        var obj = {
                            ruleId:ruleId,
                            ruleCondition:{
                                serious_1:getVal(1),                                
                                serious_2:getVal(2),                                
                                serious_3:getVal(3)                                
                            }
                        }
                        alarmCondition.push(obj);
                    })
                }

                //告警方式
                if(!$("input[name=smsF]").is(":checked")){
                    smsF = "0|0|0|";
                }else{
                   $("input[name^=smsF_]").each(function(index){
                    smsF += ($(this).is(":checked")?(index+1):"0")+"|";
                   })
                   smsF = smsF.replace(/\|$/,"");
                }
                if(!$("input[name=mailF]").is(":checked")){
                    mailF = "0|0|0|";
                }else{
                   $("input[name^=mailF_]").each(function(index){
                    mailF += ($(this).is(":checked")?(index+1):"0")+"|";
                   })
                   mailF = mailF.replace(/\|$/,"");
               }

               //通知人
               var getAlarmUser = function(obj){
                    var arr = [];
                    $.each(obj,function(key, val){
                        arr.push({"userName":val["name"]});
                    })
                    return arr;
               }
               if($("div[role='selected-notifier']").html().length>0){
                  var notifiers = notifier.getNotifiers();
                  alarmUser = {
                    serious_1:getAlarmUser(notifiers["serious_1"]),
                    serious_2:getAlarmUser(notifiers["serious_2"]),
                    serious_3:getAlarmUser(notifiers["serious_3"])
                  }
               }

               //告警时间
               smsAlarmTime += "0|" + $("select[name='time-1']").val()+"-" + $("select[name='time-2']").val()+"|";
               smsAlarmTime += "1|" + $("select[name='time-3']").val()+"-" + $("select[name='time-4']").val();

               param.alarmCondition = alarmCondition;
               param.smsF = smsF;
               param.mailF = mailF;
               param.alarmUser = alarmUser;
               param.smsAlarmTime = smsAlarmTime;

               console.log(param);
            }
        });
        return new view();
    }
    return addConfigTypeView;
});