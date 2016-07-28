/**
 * roter.js
 * usage: web系统的路由映射
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('router',function(require,exports,module){
    var common = require('common'),
        leftNav = require('leftNav');

	var router = Backbone.Router.extend({
        routes:{
            '':'loadDefault',
            'main':'loadModule',
            'monitor':'loadModule',
            'alarm':'loadModule',
            'business':'loadModule',
            'vip':'loadModule',
            'connect':'loadModule',
            'manage':'loadModule'
        },
        initialize:function(){
            jQuery(document.body).on('moduleChange',function(e,url,childViewName){
                var moduleName = common.parseModule(url);
                if(!moduleName)
                    return true;

                if(!childViewName){
                    require.async(moduleName,function(obj){
                        if(!obj ||!obj.view)
                            return false;
                        new obj.view();
                    });
                }
                else{
                    require.async(childViewName,function(obj){
                        if(!obj )
                            return false;
                        var param = {};
                        var paramArr = url.split('?')[1].split('&');
                        for(var i =0;i<paramArr.length;i++){
                            var items = paramArr[i].split('=');
                            param[items[0]]=items[1];
                        }
                        //window.router.navigate(url.split('?')[0],{trigger:false});
                        obj(param);
                    });
                }
            });
            var moduleName = common.getHash()||'main';
            if(moduleName != 'main')
                this.loadModule();
        },
        loadDefault:function(){
            this.navigate('main',{trigger:true});
        },
        loadMain:function(){
            $('.control').css('display','');
            $('.wrapper').css('display','none');
            var mainControl = require('mainControl');
            new mainControl();
        },
        loadModule:function(){
            var moduleName = common.getHash()||'main';
        	var result = common.activateNav(moduleName);
            //有可能跳转到404
            if(!result)
                return;

            if(moduleName == 'main')
                this.loadMain();
            else
                this.loadChildNav(moduleName);
        },
        loadChildNav:function(moduleName){
        	var selectMenu = jQuery(window.navMenu).filter(function(index,item){
               return item.func ===  moduleName;
            });
            if(selectMenu.length !== 1 && selectMenu.children.length === 0)
                return;

            $('.control').css('display','none');
            $('.wrapper').css('display','');
            var childMenus = selectMenu[0].children;
            leftNav({module:moduleName,childItems:childMenus});
        }
  	});

  	module.exports = router;
});