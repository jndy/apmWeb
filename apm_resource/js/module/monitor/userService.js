/**
 * userService.js
 * usage: 质量监控-用户服务质量
 * development by zxh
 * create at 2016-07-13
 * useing jQuery JavaScript frame v1.7+
 */
define('userService',function(require,exports,module){
    var tpl = require('{rootPath}/template/monitor/userService.html');    
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
                url:'data.do?func=service:getUserServiceQuality',
                param:{dataType: 0},
                fnSuc:function(resp){
                    var rData = resp['var'];
                    rData.fCount = 0;
                    rData.dList = [];
                    for(var i=1; i<=8; i++){
                        rData.dList[i] = [];                          
                    }
                    _.each(rData['dataList'], function(item){
                        if(item.alarm_status != null && item.alarm_status > 0){
                            rData.fCount++;
                        }
                        for(i=1; i<=8; i++){
                            if(item.point_order != null && item.point_order == i){
                                item.item_class = me.getStatusClass(item.alarm_status);
                                rData.dList[i].push(item); 
                            }                            
                        }
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
                case 0:
                    return 'btn-normal';
                case 1:
                    return 'btn-commonly';
                case 2:
                    return 'btn-heavier';
                case 3:
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