/**
 * leftNav.js
 * usage: 左侧导航组件
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-04-01
 * useing jQuery JavaScript frame v1.7+
 */
define('leftNav',function(require,exports,module){
    var tpl = require('{rootPath}/template/leftNav.html');

    var createView = function(options){
        var view = Backbone.View.extend({
            el:'.sidebar',
            initialize:function(){
                this.render();
                this.initEvents();
                this.defaultClick();
            },
            render:function(){
                var menus = this.filterMenu(options.childItems);
                this.renderMenu(menus);
            },
            initEvents:function(){
                var me = this;

                $('.sidebar li.parent-li').off().on('click',function(e){
                    me.onParentClick(e);
                });
                $('.sidebar li.child-li').off().on('click',function(e){
                    me.onChildClick(e);
                });
            },
            defaultClick:function(){
                var pureUrl = location.hash.split('?childView=')[0];
                //无特殊指定的自动选择第一个功能的子功能
                if(pureUrl.split('/').length == 1){
                    var firstLi = $(".sidebar").find('li:eq(0)');
                    if(firstLi.hasClass('parent-li')){
                        firstLi.addClass('on').find('ul').removeClass('hide');
                        firstLi.find('li:eq(0)').trigger('click');
                        location.href = firstLi.find('li:eq(0) a').attr('href');
                    }
                    else{
                        firstLi.trigger('click');
                        location.href = firstLi.find('a').attr('href');
                    }
                }
                else{
                    var dom = this.$el.find('a[href="{0}"]'.format(pureUrl)).parent();
                    var childView = location.hash.split('?childView=')[1];
                    if(!childView){
                        dom.parent().removeClass('hide');
                        dom.trigger('click');
                        location.href = pureUrl;
                    }
                    else{
                        dom.parent().removeClass('hide');
                        $('.sidebar li.child-li').removeClass('current');
                        dom.addClass('current');
                        var childViewName = childView.split('&')[0];
                        $(document.body).trigger('moduleChange',[location.hash,childViewName]);
                    }
                }
            },
            onParentClick:function(e){
                e.stopPropagation();
                var dom = $(e.currentTarget);
                if(dom.hasClass('on')){
                    dom.removeClass('on');
                    dom.find('ul').addClass('hide');
                }
                else{
                    dom.addClass('on');
                    dom.find('ul').removeClass('hide');
                }
            },
            onChildClick:function(e){
                e.stopPropagation();
                var dom = $(e.currentTarget);
                $('.sidebar li.child-li').removeClass('current');
                dom.addClass('current');
                var url = dom.find('a').attr('href');
                $(document.body).trigger('moduleChange',[url]);
            },
            filterMenu:function(menus){
                return menus;
            },
            renderMenu:function(items){
                var html = _.template(tpl)({
                    module:options.module,
                    list:items
                });
                $(".sidebar").empty().append(html);
            }
        });

        return new view();
    };
    return createView;
});