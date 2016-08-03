/**
 * userArchiving.js
 * usage: 质量监控-归档用户服务质量
 * development by zxh
 * create at 2016-07-19
 * useing jQuery JavaScript frame v1.7+
 */
define('userArchiving',function(require,exports,module){
    var tpl = require('{rootPath}/template/monitor/userArchiving.html');    
    var userServiceDetail = require('userServiceDetail');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.initEvents();
        },
        render:function(){
            this.renderData();           
        },
        renderData:function(){
            var me = this;
            util.request({
                url:'data.do?func=service:getUserArchivingQuality',
                param:{dataType: 0},
                fnSuc:function(resp){
                    var rData = resp['var'];
                    rData.startTime = rData.startTime.str2date('MM月dd日 HH:mm:ss');
                    rData.endTime = rData.endTime.str2date('HH:mm:ss');
                    rData.fCount = 0;
                    rData.dList = [];
                    _.each(rData['dataList'], function(item){
                        if(item.alarmStatus != 5 && item.alarmStatus > 1){
                            rData.fCount++;
                        }
                        item.itemClass = me.getStatusClass(item.alarmStatus);
                        rData.dList.push(item); 
                    });
                    var html = _.template(tpl)(rData);
                    me.$el.empty().append(html);
                }
            });
        },
        initEvents:function(){
            var me = this;
            me.$el.off().on('click','a[role=refresh]',function(e){
                me.refresh();
            }).on('mouseover','li[role=hoverDiv]',function(e){
                $(this).find(".quality-num").removeClass('hide');
            }).on('mouseout','li[role=hoverDiv]',function(e){
                $(this).find(".quality-num").addClass('hide');
            }).on('click','a[role=linkItem]',function(e){
                var id = $(this).attr('id'),
                    title = $(this).attr('title'),
                    description = $(this).attr('description');
                userServiceDetail({'item_id': id, 'item_name': title, 'item_description': description});
            });            
        },
        getStatusClass: function(val){
            switch(val){
                case 5:
                    return 'btn-nothing';
                case 1:
                    return 'btn-normal';
                case 2:
                    return 'btn-commonly';
                case 3:
                    return 'btn-heavier';
                case 4:
                    return 'btn-serious';
                default:
                    return 'btn-nothing';
            }
        },
        refresh:function(){
            this.renderData();
        }
    });

    return {view:view};
});