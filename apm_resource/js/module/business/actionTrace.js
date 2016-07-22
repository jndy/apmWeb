/**
 * actionTrace.js
 * usage: 业务拨测-拨测行为跟踪
 * development by zxh
 * create at 2016-07-13
 * useing jQuery JavaScript frame v1.7+
 */
define('actionTrace',function(require,exports,module){
    var tpl = require('{rootPath}/template/business/actionTrace.html'),
        grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.initEvents();
        },
        render:function(){
            var data = {item_name: '拨测行为跟踪', 
                        item_description: '对拨测客户端的行为进行跟踪，方便查找和定位问题，保障拨测客户端的畅通使用。', 
                        provinceList: provinceList,
                        monitoringPoints: monitoringPoints
                    };
            var html = _.template(tpl)(data);
            this.$el.empty().append(html);  
            this.renderCmp();

            var params = this.getParam();              
            this.renderGrid(params);
        },
        renderGrid:function(params){
            $('.grid-content').empty();
            var option = {
                el:'.grid-content',
                url:'data.do?func=business:getActionTraceList',
                param: params,
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[{
                    renderer:'serial',
                    text:'序号'
                },{
                    name:'user_email',
                    text:'拨测邮箱账号'
                },{
                    name:'corp_name',
                    text: '省份'
                },{
                    name:'testing_time',
                    text:'拨测时间'
                },{
                    name:'item_type_name',
                    text:'监控点名称'
                },{
                    name:'testing_status',
                    text:'拨测结果'
                },{
                    name:'response_time',
                    text:'响应时间(ms)',
                    renderer:function(val){
                        return val + 'ms';
                    }
                },{
                    name:'error_code',
                    text:'失败返回码'
                },{
                    name:'error_description',
                    text:'故障描述'
                }]
            };
            var gridView = new grid(option);
            this.gridView = gridView;
        },
        renderCmp:function(){
            util.my_select(); 
        },
        initEvents:function(){
            var me = this;
            me.$el.off().on('click','.btn-search-hide',function(e){
                var dom = $(this).find('i');
                me.showQueryDiv(dom);
            }).on('click','a[role=query]',function(e){
                me.goSearchData();
            }).on('click','a[role=export]',function(e){
                me.exportData();
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
        },
        goSearchData:function(){
            var params = this.getParam();
            this.renderGrid(params);           
        },
        exportData: function(){
            var opt = {};
            opt.url = 'exportDataAnalasyList.do';
            opt.param = this.getParam();
            util.export(opt);
        },
        getParam:function(){
            var me = this,
                param = {},
                statusArray = [],
                corpId,itemTypeId,userEmail,startTime,endTime;

            corpId = util.getVal('.retrieval-con span[name=corpId]','select');
            if(corpId != undefined){
                param.corpId = corpId;
            }

            itemTypeId = util.getVal('.retrieval-con span[name=itemTypeId]','select');
            if(itemTypeId != undefined){
                param.itemTypeId = itemTypeId;
            }

            userEmail = util.getVal('.retrieval-con input[name=userEmail]');
            if(userEmail != undefined){
                param.userEmail = userEmail;
            }
            
            $('.retrieval-con input[name=statusArray]:checked').each(function(){ 
                statusArray.push($(this).val()); 
            });
            if(statusArray.length > 0){
                param.statusArray = statusArray.toString();
            }
            
            startTime = util.getVal('.retrieval-con input[name=startTime]');
            if(startTime != undefined){
                param.startTime = startTime;
            }

            endTime = util.getVal('.retrieval-con input[name=endTime]');
            if(endTime != undefined){
                param.endTime = endTime;
            }

            if(!util.compareTimeValid(param.startTime, param.endTime))
                return null;

            return param;
        }
    });

    return {view:view};    
});