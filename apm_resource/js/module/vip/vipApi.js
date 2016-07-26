/**
 * vipApi.js
 * usage: VIP保障-接口请求
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('vipApi',function(require,exports,module){
  
  var _fnErr = function(resp){
     util.showMsg('接口请求出错',-1);
  }

  var _request = function(options){
    var param = options.param||{};
    var fnErr = options.fnErr || _fnErr;
    util.request({url:options.url,param:param,fnSuc:options.fnSuc,fnErr:fnErr});
  }

  /**
   * 获取VIP体验列表
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.getVipExpList = function(options){
    options.url = 'data.do?func=vip:getVipExpList';
    _request(options);
  }

  /**
   * 获取VIP用户问题跟踪列表
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.getVipQuesList = function(options){
    options.url = 'data.do?func=vip:getVipQuesList';
    _request(options);
  }

  /**
   * 获取VIP服务质量
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.getVipQualityList = function(options){
    options.url = 'data.do?func=vip:getVipQualityList';
    _request(options);
  }

  /**
   * 获取VIP用户列表
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.getVipUserList = function(options){
    options.url = 'data.do?func=vip:getVipUserList';
    _request(options);
  }

  /**
   * 修改VIP用户状态
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.updateStatus = function(options){
    options.url = 'data.do?func=vip:updateStatus';
    _request(options);
  }

  /**
   * 同步VIP用户
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  exports.syncUser = function(options){
    options.url = 'data.do?func=vip:syncUser';
    _request(options);
  }

});