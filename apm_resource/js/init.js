/**
 * init.js
 * usage: web系统的入口初始化
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('init',function(require,exports,module){
	var router = require('router'),
        expand = require('expand'),
        util = require('util'),
		common = require('common'),
        topNav = require('topNav');

	//每次刷新跳转到默认页面
	//common.jumpDefaultIndex();
	new topNav();
	window.router = new router();
	Backbone.history.start();

    //自执行
    (function(){
        $(document).on("click",function () {
            $(".module-select").find("ul").slideUp(100);
        });
    }());
});