/**
 * common.js
 * usage: 框架通用函数，包括模块跳转，自适应
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('common',function(requires,exports,module){
	var common = {
        jumpDefaultIndex:function(){
            if(!this.isCurrentPage("main")){
                location.hash = '#main';
            }
        },
        getMinHeight:function(){
            // 页面主区域高度
            var mainHeight = $(window).height() ;
            var headerHeight = $(".header").height() + 10;
            var footerHeight = $(".footer").height();
            var minHeight = mainHeight - footerHeight - headerHeight-100;
            return minHeight;
        },
        getHash:function(){
            return window.location.hash.replace(/#(\w+)[\/]?.*/,function(a,b,c){
                return b;
                })
        },
        parseModule:function(url){
            var moduleArr = url.split('/'),
                moduleArr = moduleArr.pop();

            return moduleArr;
        },
        getQueryString:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        },
        isCurrentPage:function(page){
            return this.getHash() == page;
        },
        activateNav:function(moduleName){
            var mapModuleName = this.getHash();
            var dom = jQuery('.header .nav li>a[href="#'+mapModuleName+'"]');
            if(dom.length == 0){
                this.jump404();
                return false;
            }
            dom.parent().siblings().removeClass('current');
            dom.parent().addClass('current');
            return true;
        },
        jump404:function(){
            //window.navigate("/404.jsp");
        },
        onResize:function(){
            var v = this.getMinHeight();
            $("#content-warpper").css("min-height",v-1 +'px');
            //设置首页自适应屏幕高度
            if(this.isCurrentPage("myQues")){
                var timer = setInterval(function(){
                    if($(".createIndex li").length>0){
                        clearInterval(timer);
                         //首页
                        var creBgHeight = 590;
                        if(creBgHeight > v){
                            $(".createIndex li").css("height",(v+5)+"px");
                        }else{
                            $(".createIndex li").css("height",creBgHeight+"px");
                        }
                    }
                },1);
            }
        }
    };

	return common;
});