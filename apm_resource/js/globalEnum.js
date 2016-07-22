/**
 * globalEnum.js
 * usage: web系统的全局枚举变量
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * why 避免当系统越来越庞大，逻辑越来越复杂的时候，魔法数字无人知晓是什么意思
 */
define('globalEnum',function(require,exports,module){
    var VIEW_TYPE = {
        //用户体验概览
        USER:0,
        //分布式拨测
        DISTRIBUTE:1
    };

    var ROLE_TYPE = {
        //超级管理员
        ROOT_AD:1,
        //配置管理员
        PEIZHI_AD:2,
        //监控人员
        JIANKONG_AK:3    };

    var STATE_TYPE = {
        //禁用
        DISABLE:0,
        //可用
        ENABLE:1
    };

    window.VIEW_TYPE = VIEW_TYPE;
    window.ROLE_TYPE = ROLE_TYPE;
    window.STATE_TYPE = STATE_TYPE;
});