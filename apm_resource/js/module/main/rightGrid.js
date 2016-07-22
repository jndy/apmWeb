/**
 * rightGrid.js
 * usage: 主控台-子视图
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('rightGrid',function(require,exports,module){
    var tpl = require('{rootPath}/template/main/rightGrid.html'),
        simpleGrid = require('simpleGrid');

    var createView = function(options){
        var view = Backbone.View.extend({
            el:'.right-sides',
            initialize:function(){
                this.render();
                this.initEvents();
                this.defaultClick();
            },
            render:function(){
                var menus = this.filterMenu(options);
                this.renderMenu(menus);
            },
            renderMenu:function(items){
                var html = _.template(tpl)({
                    list:items
                });
                this.$el.find(".rightGridUl").empty().append(html);
            },
            initEvents:function(){
                var me = this;

                this.$el.off().on('click','.rightGridUl a',function(e){
                    var dom = $(this);
                    dom.parent().addClass('current').siblings().removeClass('current');
                    var funcId = parseInt(dom.attr('funcId'));
                    var options = {
                        el:'.right-grid',
                        columns:me.menuData[funcId - 1].columns,
                        url:'test',
                        param:{}
                    };
                    new simpleGrid(options);
                })
            },
            defaultClick:function(){
                this.$el.find('.rightGridUl').find('a:first').trigger('click');
            },
            filterMenu:function(type){
                var me = this;
                var filterData = $(me.menuData).filter(function(index,item){
                    return item.type === type
                });
                return filterData;
            },
            menuData:[{
                title:'成功率',type:1,func:1,columns:[{
                    text:'监测点名称',name:'nodeName'
                },{
                    text:'平均成功率',name:'percent'
                }]
            },{
                title:'用户体验时延',type:1,func:2,columns:[{
                    text:'监测点名称',name:'nodeName'
                },{
                    text:'平均响应时间/平均速率',name:'percent'
                }]
            },{
                title:'系统时延',type:1,func:3,columns:[{
                    text:'监测点名称',name:'nodeName'
                },{
                    text:'平均响应时间',name:'percent'
                }]
            },{
                title:'成功率',type:2,func:4,columns:[{
                    text:'监测点名称',name:'nodeName'
                },{
                    text:'平均成功率',name:'percent'
                }]
            },{
                title:'系统时延',type:2,func:5,columns:[{
                    text:'监测点名称',name:'nodeName'
                },{
                    text:'平均响应时间',name:'percent'
                }]
            }]
        });

        return new view();
    };
    return createView;
});