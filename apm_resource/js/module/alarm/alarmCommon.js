/**
 * alarmCommon.js
 * usage: 故障告警-公用函数
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('alarmCommon',function(require,exports,module){
  var notifier = require("notifier");
  /**
   * 创建告警规则错误提示
   * @param  {[type]} unit 单位
   * @param  {[type]} type 类型  empty number range-范围不正确  compare
   * @return {[type]}      [description]
   */
  var _getErrorMsg = function(name, unit, type, index){
    var types = {
      empty:"不能为空",
      number:"请输入数值类型",
      range:(unit=="%"?"请输入大于0，小于等于100的数值(小数点，请保留两位)":"请输入大于0,小于999999的整数"),
      compare:(unit=="%"?"应满足 严重级别<=较重级别<=一般级别":"应满足 严重级别>=较重级别>=一般级别")
    }
    var ruleName = "（" +  ["严重告警级别","较重告警级别","一般告警级别"][index] + "）";
    if(type=="compare"){
      ruleName = "";
    }

    var msg = "普通时段：" + name + ruleName + "  阀值填写不正确，" + types[type];
    return msg;
  }

  //验证告警配置
  var _configTypeValidate = function(){
    if($("select[name=monitor_id]").val()==""){
      util.showMsg("请选择一个监控点");
      return false;
    }

    //检验配置规则
    $("div.mod-condition-con").each(function(){
      var $this = $(this);
      var ruleName = $this.find("span.tit").text();
      var unit = $this.data("unit");
      var type = "", index = 0;
      var vals = [];
      $this.find("input").each(function(_index){
        var val = $.trim($(this).val());
        index = _index;

        //是否为空
        if("" === val){
          type = "empty";
          return false;
        }
        //是否非数字
        if("ms"==unit && !val.match(/^\d+$/)){
          type = "number";
          return false;
        }else if("%" == unit){
          //判断符不符合小数点
          //判断符不符合数字
          if(val.indexOf(".")>=0){
            if(!val.match(/^\d{1,2}\.{1}\d{1,2}$/)){
              type = "number";
              return false; 
            }         
          }else if(!val.match(/^\d+$/)){
            type = "number";
            return false;
          }
          
        }
        vals.push(val);
        //判断是否在范围中
        if(("%" == unit && (val<=0 || val>100))
          || 
          ("ms" == unit && (val<=0 || val>999999))
          ){
          type = "range";
          return false;
        }

        //获取是大于还是小于
        var name = $(this).attr("name").replace("input","select");
        var selectVal = $("select[name="+name+"]").val();

        if(_index == 2){
          var t1 = parseFloat(vals[0]),
              t2 = parseFloat(vals[1]),
              t3 = parseFloat(vals[2]);
          // 单位为%的，用 小于(2)判断
          if("%" == unit){
            if(!(t1<=t2 && t2<= t3)){
              type = "compare";
              return false;
            }
          }
          // 单位为ms的，用大于(1)判断
          if("ms" == unit){
            if(!(t1>=t2 && t2>= t3)){
              type = "compare";
              return false;
            }
          }

        }
        
      });
      if(type != ""){
        var msg = _getErrorMsg(ruleName,unit,type, index);
        util.dialog("提示信息",msg,function(){},"",{cancel:false});
        //util.showMsg(msg);
        return false;
      }

    });

    //判断告警方式
    if(!$("input[name=smsF]").is(":checked") && !$("input[name=mailF]").is(":checked")){
      util.dialog("提示信息","请选择告警方式",function(){},"",{cancel:false});
      return false;
    }

    //判断告警通知人
    if($.trim($("div[role=selected-notifier]").html())==""){
        util.dialog("提示信息","请选择告警通知人",function(){},"",{cancel:false});
        return false;        
    }
    return true;
  }

  //获取监控点配置参数
  var getConfigTypeParam = function(){
    var param = {
          type:1,
          mit_id:$("select[name='monitor_id']").val(),
          descp:$.trim($("textarea[name='config-remark']").val())
      };
      var alarmCondition = [],
          smsF = "",
          mailF = "",
          alarmUser = null,
          smsAlarmTime = "";

      if(!_configTypeValidate()){
        return false;
      }

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
              };
              var obj = {
                  ruleId:ruleId,
                  ruleCondition:{
                      serious_1:getVal(1),                                
                      serious_2:getVal(2),                                
                      serious_3:getVal(3)                                
                  }
              };
              alarmCondition.push(obj);
          })
      }

      //告警方式
      if(!$("input[name=smsF]").is(":checked")){
          smsF = "0|0|0|";
      }else{
         $("input[name^=smsF_]").each(function(index){
          smsF += ($(this).is(":checked")?(index+1):"0")+"|";
         });
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
          });
          return arr;
     };
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

     return param;
  }

  /**
   * 获取告警配置规则html
   * @param  {[type]} ruleList [description]
   * @return {[type]}          [description]
   */
  var getConfigRule = function(ruleList){
    var ruleTplHtml = "";
    if(ruleList.length>0){
        var ruleTpl = require('{rootPath}/template/alarm/addConfigRule.html')
        ruleTplHtml = _.template(ruleTpl)({ruleList:ruleList});
    }else{
        ruleTplHtml = "<div class='config-rule-tip'>该监控项下，没有配置相关指标</div>";
    }
    return ruleTplHtml;
  }

  var getNotifierHtml = function(notifiers){
    var serious_1_html = "",
        serious_2_html = "",
        serious_3_html = "";
    var getHtml = function(obj){
        var html = "";
        $.each(obj,function(key,val){
            html += val["realName"]+"("+val["role"]+")，";
        });
        return html;
    };
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
    return all;
  }

  exports.getConfigTypeParam = getConfigTypeParam;

  exports.getConfigRule = getConfigRule;

  exports.getNotifierHtml = getNotifierHtml;

});