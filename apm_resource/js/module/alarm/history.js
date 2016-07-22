/**
 * history.js
 * usage: 故障告警-告警历史
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('history',function(require,exports,module){
    var tpl = require('{rootPath}/template/alarm/history.html');
    var grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.initEvents();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
            util.my_select();
            this.renderGrid();
        },
        renderGrid:function(){
            $('.content_main').empty();
            var option = {
                el:'.content_main',
                url:'data.do?func=alarm:history',
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[{
                    name:'id',
                    text:'序号'
                },{
                    name:'mit_way',
                    text:'监控方式'
                },{
                    name:'mit_name',
                    text:'监控点名称'
                },{
                    name:'mtype',
                    text:'监控类型',
                    renderer:function(val){
                        var str = 'VIP监控';
                        
                        return str;
                    }
                },{
                    name:'reason',
                    text:'告警原因'
                },{
                    name:'provinceName',
                    text:'省份/IP'
                },{
                    name:'provinceName',
                    text:'处理状态'
                },{
                    name:'alarm_Threshold',
                    text:'告警等级'
                },{
                    name:'last_State_Change',
                    text:'持续时长'
                },{
                    name:'last_Update',
                    text:'更新时间'
                },{
                    name:'',
                    text:'操作',
                    renderer:function(val,index ,item){
                        var str = '';
                        str = $("#list-modify").html();
                        return str;
                    }
                }]
                //plugin:'page'
            };
            var gridView = new grid(option);
            this.gridView = gridView;
        },
        initEvents:function(){
            var me = this;

            me.$el.off().on('click','.btn-search-hide',function(e){
                var dom = $(this).find('i');
                me.showQueryDiv(dom);
            }).on('click','a[role=query]',function(e){
                var param = me.getParam();
                if(!param)
                    return;
                me.gridView.requestData(param,1);
            }).on('click','a[role=add]',function(e){
                me.onAdd();
            }).on('click','.action',function(e){
                var dom = $(this);
                if(dom.hasClass('edit'))
                    me.onEdit(dom);
                else
                    me.onEnable(dom);
            });
        },
        showQueryDiv:function(dom){
            var me = this;
            if(dom.hasClass('i-down')){
                dom.removeClass('i-down');
                dom.addClass('i-up');
                me.$el.find('.retrieval-con').css('display','');
            }
            else{
                dom.removeClass('i-up');
                dom.addClass('i-down');
                me.$el.find('.retrieval-con').css('display','none');
            }
        }
    });
    return {view:view};
});