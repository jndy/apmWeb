/**
 * configDetail.js
 * usage: 故障告警-查看告警配置详情
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('configDetail',function(require,exports,module){
  var tpl = require('{rootPath}/template/alarm/configDetail.html');
  var alarmApi = require("alarmApi");

  var configDetailView = function(){
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
          me.renderDetail();
        },
        initEvents:function(){
          var me = this;
          me.$el.off().on("click",'a[role=back]',function(){
            util.jumpModule("alarm/configList");
          })
        },
        /**
         * 渲染详情
         * @return {[type]} [description]
         */
        renderDetail:function(){
          var me = this;
          var fnSuc = function(resp){
            var ruleObj = resp["var"];
            var detailObj = {
              mitName:ruleObj["mit_name"],
              remark:ruleObj["remark"]
            }

            //告警规则
            me.setRule(ruleObj, detailObj);

            //告警通知人
            me.setNotifiers(ruleObj, detailObj);
            
            //告警时间
            me.setNotifiers(ruleObj, detailObj);


            $("div.content_main").append(util.format_advanced($("#config-detail-tpl").html(), detailObj));

            //告警方式
            me.setAlarmWay(ruleObj);

          }
          alarmApi.getConfigRule({fnSuc:fnSuc})
        },
        /**
         * 设置告警方式
         * @param {[type]} ruleObj [description]
         */
        setAlarmWay:function(ruleObj){
          var smsF = ruleObj["smsF"] || "",
              mailF = ruleObj["mailF"] || "";
          console.log(smsF, mailF);
          if(smsF != "0|0|0"){
            $("input[name=smsF]").prop({checked:true});
            var smsFs = smsF.split("|");
            if(1 == smsFs[0]){
              $("input[name=smsF_1]").prop({checked:true});
            }
            if(2 == smsFs[1]){
              $("input[name=smsF_2]").prop({checked:true});
            }
            if(3 == smsFs[2]){
              $("input[name=smsF_3]").prop({checked:true});
            }
          }

          if(mailF != "0|0|0"){
            $("input[name=smsF]").prop({checked:true});
            var mailFs = mailF.split("|");
            if(1 == mailFs[0]){
              $("input[name=mailF_1]").prop({checked:true});
            }
            if(2 == mailFs[1]){
              $("input[name=mailF_2]").prop({checked:true});
            }
            if(3 == mailFs[2]){
              $("input[name=mailF_3]").prop({checked:true});
            }
          }
        },
        /**
         * 短信告警时间
         * @param {[type]} ruleObj   [description]
         * @param {[type]} detailObj [description]
         */
        setSmsAlarmTime:function(ruleObj, detailObj){
          var smsAlarmTime = ruleObj["smsAlarmTime"];
          var time1 = smsAlarmTime.substring(2,13);
          var time2 = smsAlarmTime.substring(16);
          detailObj["time_1"] = time1.split("-")[0];
          detailObj["time_2"] = time1.split("-")[1];
          detailObj["time_3"] = time2.split("-")[0];
          detailObj["time_4"] = time2.split("-")[1];
        },
        /**
         * 告警通知人
         * @param {[type]} ruleObj   [description]
         * @param {[type]} detailObj [description]
         */
        setNotifiers:function(ruleObj, detailObj){
          if(ruleObj["alarmUser"]){
              var notifiers = "";
              $.each(ruleObj["alarmUser"], function(key, val){
                if("serious_1" == key){
                  notifiers += "<div>严重级别</div>";
                }else if("serious_2" == key){
                  notifiers += "<div>较重级别</div>";
                }else if("serious_3" == key){
                  notifiers += "<div>一般级别</div>";
                }
                notifiers += "<div>";
                $.each(val,function(index,item){
                  notifiers += item["userName"] + "（"+item["roleName"]+"）" + "，";
                })
                notifiers += "</div>";
              })
              detailObj["notifiers"] = notifiers;
            }
        },
        /**
         * 创建告警规则
         * @param {[type]} ruleObj   [description]
         * @param {[type]} detailObj [description]
         */
        setRule:function(ruleObj, detailObj){
          if(ruleObj["alarmCondition"].length>0){
            var ruleHtml = '<div class="mod-condition-con">';

            $.each(ruleObj["alarmCondition"],function(index, obj){
              ruleHtml += obj["ruleName"];
              var item = obj["ruleCondition"];
              if(item["serious_1"] && item["serious_1"].indexOf(">")>=0){
                ruleHtml += "大于" + item["serious_1"].substring(1) + item["unit"]+"时进行严重告警，";
              }else{
                ruleHtml += "小于" + item["serious_1"].substring(1) + item["unit"]+"时进行严重告警，";
              }

              if(item["serious_2"] && item["serious_2"].indexOf(">")>=0){
                ruleHtml += "大于" + item["serious_2"].substring(1) + item["unit"]+"时进行较重告警，";
              }else{
                ruleHtml += "小于" + item["serious_2"].substring(1) + item["unit"]+"时进行较重告警，";
              }

              if(item["serious_3"] && item["serious_3"].indexOf(">")>=0){
                ruleHtml += "大于" + item["serious_3"].substring(1) + item["unit"]+"时进行一般告警";
              }else{
                ruleHtml += "小于" + item["serious_3"].substring(1) + item["unit"]+"时进行一般告警";
              }

            });
            ruleHtml = '</div>';

            detailObj["alarmCondition"] = ruleHtml;
          }else{
            detailObj["alarmCondition"] = "<div class='config-rule-tip'>该监控项下，没有配置相关指标</div>";
          }
        }
    })
    return new view();
  }
  return configDetailView;
})