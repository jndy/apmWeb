/**
 * accountManage.js
 * usage: 业务拨测-拨测账户管理
 * development by zxh
 * create at 2016-07-13
 * useing jQuery JavaScript frame v1.7+
 */
define('accountManage',function(require,exports,module){
    var tpl = require('{rootPath}/template/business/accountManage.html'),
        tplEdit = require('{rootPath}/template/business/accountEdit.html'),
        dateBar = require('dateBar'),
        grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.initEvents();
        },
        render:function(){
            var data = {item_name: '拨测账户管理', 
                        item_description: '对拨测账户进行管理。', 
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
            var me = this;
            $('.grid-content').empty();
            var option = {
                el:'.grid-content',
                url:'data.do?func=business:getAccountManageList',
                param: params,
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[{
                    name:'account_id',
                    text:'编号'
                },{
                    name:'user_email',
                    text:'拨测邮箱账号'
                },{
                    name:'corp_name',
                    text: '省份'
                },{
                    name:'account_status',
                    text:'运行状态'
                },{
                    name:'testing_frequency',
                    text:'拨测频次',
                    renderer:function(val){
                        return val + '分钟';
                    }
                },{
                    name:'testing_lasttime',
                    text:'最近拨测时间'
                },{                    
                    text:'操作',
                    renderer:function(val, index, item){
                        var str = "<div class='td-fun'>";
                        if(item.account_status_id == '0'){
                            str += "<a href='javascript:;' role='status' aid="+item.account_id+" sid="+item.account_status_id+">暂停</a>";
                        }else{
                            str += "<a href='javascript:;' role='status' aid="+item.account_id+" sid="+item.account_status_id+">启动</a>";
                        }                        
                        str += "  <a href='javascript:;' role='update' aid="+item.account_id+">修改</a>";
                        str += "  <a href='javascript:;' role='detail' aid="+item.account_id+">详情</a>";
                        str += "</div>";
                        return str;
                    }
                }]
            };
            var gridView = new grid(option);
            me.gridView = gridView;
        },
        renderCmp:function(){
            this.dateBar = new dateBar({el:'.toolbar .fr'});
            util.my_select(); 
        },
        initEvents:function(){
            var me = this;
            me.$el.off().on('click','.btn-search-hide',function(e){
                var dom = $(this).find('i');
                me.showQueryDiv(dom);
            }).on('click','a[role=query]',function(e){
                me.goSearchData();
            }).on('click','a[role=addnew]',function(e){
                me.addnewData();
            }).on('click','a[role=update]',function(e){                
                var account_id = $.trim($(this).attr('aid'));
                me.getAccountInfo(account_id).then(function(result){
                    var item = result['var'];
                    me.updateData(item);
                });
            }).on('click','a[role=status]',function(e){
                var item = {};
                item.account_id = $.trim($(this).attr('aid'));
                item.account_status_id = $.trim($(this).attr('sid'));
                me.changeStatus(item);
            }).on('click','a[role=detail]',function(e){
                var account_id = $.trim($(this).attr('aid'));
                me.getAccountInfo(account_id).then(function(result){
                    var item = result['var'];
                    me.showDetail(item);
                });                
            }).on('click','a[role=export]',function(e){
                me.exportData();
            }).on('timeChange','.toolbar .fr div[role=dateBar]',function(e,value){
                me.goSearchData();
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
        getAccountInfo: function(aid){
            return $.Deferred(function(defer){ 
                util.request({
                    url:'data.do?func=business:getAccountInfo',
                    param: {account_id: aid},
                    fnSuc: defer.resolve,
                    fnErr: defer.reject
                });
            });
        },
        addnewData: function(){
            var me = this;
            var content  = _.template(tplEdit)({"action": "add", provinceList: provinceList, monitoringPoints: monitoringPoints});
            util.dialog('新增拨测账户',content,function(){
                var params = me.getWindowParam();
                if(!params)
                    return false;
                params.operate = 'add';
                params.account_status_id = '0';

                util.request({
                    url:'data.do?func=business:editAccount',
                    param:params,
                    fnSuc:function(resp){
                        util.showMsg(resp.msg);
                        me.goSearchData();
                    }
                });
            });                
            $('.ui-dialog input[name=testing_items]').attr("checked",'checked');       
            $('.ui-dialog input[name=testing_frequency][value=30]').attr("checked",'checked');
            util.my_select();
        },
        updateData: function(item){
            var me = this;
            var content  = _.template(tplEdit)({"action": "update", provinceList: provinceList, monitoringPoints: monitoringPoints});
            util.dialog('修改拨测账户',content,function(){
                var params = me.getWindowParam();
                if(!params)
                    return false;
                params.operate = 'update';
                params.account_id = item.account_id;

                util.request({
                    url:'data.do?func=business:editAccount',
                    param:params,
                    fnSuc:function(resp){
                        util.showMsg(resp.msg);
                        me.goSearchData();
                    }
                });
            });
            util.my_select();
            util.setVal('.ui-dialog span[name=corp_id]', item.corp_id, 'select');
            util.setVal('.ui-dialog input[name=user_email]', item.user_email);
            if(item.testing_items != undefined){
                $.each(item.testing_items.split(','), function(index, value){
                    $('.ui-dialog input[name=testing_items][value='+value+']').attr("checked",'checked');
                });
            } 
            if(item.testing_frequency != undefined){
                $('.ui-dialog input[name=testing_frequency][value='+item.testing_frequency+']').attr("checked",'checked'); 
            }                       
        },
        changeStatus: function(item){
            var me = this,         
                params = {};

            params.operate = "status";
            params.account_id = item.account_id;
            params.account_status_id = (item.account_status_id == '0') ? '1' : '0';

            util.request({
                url:'data.do?func=business:editAccount',
                param:params,
                fnSuc:function(resp){
                    util.showMsg(resp.msg);
                    me.goSearchData();
                }
            });            
        },
        showDetail: function(item){
            var me = this;
            item.action = "detail";
            item.testing_items_name = me.getTestItemName(item.testing_items).toString();
            var content  = _.template(tplEdit)(item);
            util.dialog('拨测账户详情',content,null,null,{cancelDisplay:false},function(){                
            });
        },        
        getTestItemName: function(testing_items){
            var arr = testing_items.split(','), rtArr = [];
            $.each(arr, function(index, value1) { 
                for(var i = 0; i < monitoringPoints.length; i++){
                    if(value1 == monitoringPoints[i]['item_type_id']){
                        rtArr.push(monitoringPoints[i]['item_type_name']);
                    }
                }
            }); 
            return rtArr;
        },
        getWindowParam:function(){
            var dialogWindow = $('.ui-dialog'),
                validateResult = util.validateDiv('.ui-dialog'),
                param = {},
                user_email = util.getVal('.ui-dialog input[name=user_email]'),    
                corp_id = util.getVal('.ui-dialog span[name=corp_id]','select'),                
                testing_items = [], testing_frequency;
            
            param.corp_id = corp_id;

            dialogWindow.find("input[name='testing_items']:checked").each(function(index,item){
                testing_items.push($(this).val());
            });
            if(testing_items.length > 0){
                param.testing_items = testing_items.toString();
            }

            testing_frequency = dialogWindow.find("input[name='testing_frequency']:checked").val();
            if(testing_frequency != undefined){
                param.testing_frequency = testing_frequency;
            };

            return param;
        },
        exportData: function(){
            var opt = {};
            opt.url = 'exportAccountManageList.do';
            opt.param = this.getParam();
            util.export(opt);
        },
        getParam:function(){
            var me = this,
                param = {},
                statusArray = [],
                corpId,userEmail;

            corpId = util.getVal('.retrieval-con span[name=corpId]','select');
            if(corpId != undefined){
                param.corpId = corpId;
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

            var vDate = me.dateBar.getValue();
            param.startTime = vDate.st;
            param.endTime = vDate.et;
            param.timeType = vDate.timeType;

            if(!util.compareTimeValid(param.startTime, param.endTime))
                return null;

            return param;
        }
    });

    return {view:view};    
});