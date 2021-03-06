/**
 * alarmApi.js
 * usage: 故障告警-接口请求
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('alarmApi',function(require,exports,module){
  
  var _fnFail = function(resp){
    var errmsg = resp["msg"]?resp["msg"]:"接口请求出错";
     util.showMsg(errmsg,-1);
  }

  var _request = function(options){
    var param = options.param||{};
    var fnFail = options.fnFail || _fnFail;
    util.request({url:options.url,param:param,fnSuc:options.fnSuc,fnFail:fnFail});
  }

  /**
   * 获取监控点
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.getMonitor = function(options){
    //pointAlarmState 1:表示该监控点未创建 2：表示该监控点已经创建
    options.url = 'data.do?func=alarm:getMonitor';
    _request(options);
  }

  /**
   * 获取监控类型
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.getConfigType = function(options){
    options.url = 'data.do?func=alarm:getConfigListType';
    _request(options);
  }

  /**
   * 获取告警配置规则
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.getConfigRule = function(options){
    options.url = 'data.do?func=alarm:getConfigRule';
    _request(options);
  }

  /**
   * 获取省份
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.getProvince = function(options){
    options.url = 'data.do?func=alarm:getProvince';
    _request(options);
  }

  /**
   * 获取告警通知详情
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.getAdviceDetail = function(options){
    options.url = 'data.do?func=alarm:getAdviceDetail';
    _request(options);
  }

  /**
   * 更新告警通知备注
   * [updateAdviceRemark description]
   * @return {[type]} [description]
   */
  exports.updateAdviceRemark = function(options){
    options.url = 'data.do?func=alarm:alarmOperation';
    options["opertareType"] = 3;
    _request(options);
  }

  /**
   * 忽略告警通知
   * [updateAdviceIgnore description]
   * @return {[type]} [description]
   */
  exports.updateAdviceIgnore = function(options){
    options.url = 'data.do?func=alarm:alarmOperation';
    options["opertareType"] = 1;
    _request(options);
  }

  /**
   * 已恢复告警通知
   * [updateAdviceResume description]
   * @return {[type]} [description]
   */
  exports.updateAdviceResume = function(options){
    options.url = 'data.do?func=alarm:alarmOperation';
    options["opertareType"] = 2;
    _request(options);
  }

  /**
   * 更改告警状态
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.changeRuleState = function(options){
    options.url = 'data.do?func=alarm:changeRuleState';
    _request(options);
  }

  /**
   * 保存告警配置
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.saveConfig = function(options){
    options.url = 'data.do?func=alarm:saveRule';
    _request(options);
  }

  /**
   * 更新告警配置，根据是否有alarmId进行判断
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.updateConfig = function(options){
    options.url = 'data.do?func=alarm:saveRule';
    _request(options);
  }

});