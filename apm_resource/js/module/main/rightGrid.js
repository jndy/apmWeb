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
        grid = require('grid');

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
                    me.$el.find('.right-grid').empty();
                    var options = {
                        el:'.right-grid',
                        columns:me.menuData[funcId - 1].columns,
                        tableCss:'table-con mb-20',
                        url:'data.do?func=service:getUserServiceQuality',
                        param:{}
                    };
                    me.gridView = new grid(options);
                }).on('click','.right-grid tbody tr',function(e){
                    var index = $(this).index(),
                        data = me.gridView.data[index],
                        itemId = data.item_type_id,
                        itemName = data.item_type_name,
                        itemDesc = data.item_description;

                    util.jumpModule('monitor/userService?childView=userServiceDetail&item_id={0}&item_name={1}&item_description={2}'.format(itemId,itemName,itemDesc))
                });
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
                    text:'监测点名称',name:'item_type_name'
                },{
                    text:'平均成功率(%)',name:'success_rates'
                }]
            },{
                title:'系统时延',type:1,func:2,columns:[{
                    text:'监测点名称',name:'item_type_name'
                },{
                    text:'平均响应时间(ms)',name:'avgsendtime',
                    renderer:function(val,index ,item){
                        var cssArr = ['','','c-commonly','c-heavier','c-serious'],
                            css = cssArr[item.alarm_status];

                        return '<span class="{1}">{0}</span>'.format(val,css);
                    }
                }]
            },{
                title:'成功率',type:2,func:3,columns:[{
                    text:'监测点名称',name:'item_type_name'
                },{
                    text:'平均成功率(%)',name:'success_rates'
                }]
            },{
                title:'系统时延',type:2,func:4,columns:[{
                    text:'监测点名称',name:'item_type_name'
                },{
                    text:'平均响应时间(ms)',name:'avgsendtime'
                }]
            }]
        });

        return new view();
    };
    return createView;
});