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
            var data = {itemName: '拨测账户管理', 
                        itemDescription: '对拨测账户进行管理。', 
                        provinceList: gMain.provinceList,
                        monitoringPoints: gMain.monitoringPoints.mitId_3
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
                params: params,
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[{
                    name:'accountId',
                    text:'编号'
                },{
                    name:'userEmail',
                    text:'拨测邮箱账号'
                },{
                    name:'corpName',
                    text: '省份'
                },{
                    name:'accountStatus',
                    text:'运行状态'
                },{
                    name:'testingFrequency',
                    text:'拨测频次',
                    renderer:function(val){
                        return val + '分钟';
                    }
                },{
                    name:'testingLastTime',
                    text:'最近拨测时间',
                    renderer:function(val){
                        return val.str2date('yyyy-MM-dd HH:mm');
                    }
                },{                    
                    text:'操作',
                    renderer:function(val, index, item){
                        var str = "<div class='td-fun'>";
                        if(item.accountStatusId == '1'){
                            str += "<a href='javascript:;' role='status' aid="+item.accountId+" sid="+item.accountStatusId+">暂停</a>";
                        }else{
                            str += "<a href='javascript:;' role='status' aid="+item.accountId+" sid="+item.accountStatusId+">启动</a>";
                        }                        
                        str += "  <a href='javascript:;' role='update' aid="+item.accountId+">修改</a>";
                        str += "  <a href='javascript:;' role='detail' aid="+item.accountId+">详情</a>";
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
                var accountId = $.trim($(this).attr('aid'));
                me.getAccountInfo(accountId).then(function(result){
                    var item = result['var'];
                    me.updateData(item);
                });
            }).on('click','a[role=status]',function(e){
                var item = {};
                item.accountId = $.trim($(this).attr('aid'));
                item.accountStatusId = $.trim($(this).attr('sid'));
                me.changeStatus(item);
            }).on('click','a[role=detail]',function(e){
                var accountId = $.trim($(this).attr('aid'));
                me.getAccountInfo(accountId).then(function(result){
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
                    param: {accountId: aid},
                    fnSuc: defer.resolve,
                    fnErr: defer.reject
                });
            });
        },
        addnewData: function(){
            var me = this;
            var content  = _.template(tplEdit)({"action": "add", provinceList: gMain.provinceList, monitoringPoints: gMain.monitoringPoints.mitId_3});
            util.dialog('新增拨测账户',content,function(){
                var params = me.getWindowParam();
                if(!params)
                    return false;
                params.operate = 'add';
                params.accountStatusId = '1';

                util.request({
                    url:'data.do?func=business:editAccount',
                    param:params,
                    fnSuc:function(resp){
                        util.showMsg(resp.msg);
                        me.goSearchData();
                    }
                });
            });                
            $('.ui-dialog input[name=testingItems]').attr("checked",'checked');       
            $('.ui-dialog input[name=testingFrequency][value=30]').attr("checked",'checked');
            util.my_select();
        },
        updateData: function(item){
            var me = this;
            var content  = _.template(tplEdit)({"action": "update", provinceList: gMain.provinceList, monitoringPoints: gMain.monitoringPoints.mitId_3});
            util.dialog('修改拨测账户',content,function(){
                var params = me.getWindowParam();
                if(!params)
                    return false;
                params.operate = 'update';
                params.accountId = item.accountId;

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
            util.setVal('.ui-dialog span[name=corpId]', item.corpId, 'select');
            util.setVal('.ui-dialog input[name=userEmail]', item.userEmail);
            if(item.testingItems != undefined){
                $.each(item.testingItems.split(','), function(index, value){
                    $('.ui-dialog input[name=testingItems][value='+value+']').attr("checked",'checked');
                });
            } 
            if(item.testingFrequency != undefined){
                $('.ui-dialog input[name=testingFrequency][value='+item.testingFrequency+']').attr("checked",'checked'); 
            }                       
        },
        changeStatus: function(item){
            var me = this,         
                params = {};

            params.operate = "status";
            params.accountId = item.accountId;
            params.accountStatusId = (item.accountStatusId == '1') ? '2' : '1';

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
            item.testingItemsName = me.getTestItemName(item.testingItems).toString();
            var content  = _.template(tplEdit)(item);
            util.dialog('拨测账户详情',content,null,null,{cancelDisplay:false},function(){                
            });
        },        
        getTestItemName: function(testingItems){
            var arr = testingItems.split(','), rtArr = [];
            $.each(arr, function(index, value1) { 
                for(var i = 0, monitoringPoints = gMain.monitoringPoints.mitId_3; i < monitoringPoints.length; i++){
                    if(value1 == monitoringPoints[i]['itemTypeId']){
                        rtArr.push(monitoringPoints[i]['itemTypeName']);
                    }
                }
            }); 
            return rtArr;
        },
        getWindowParam:function(){
            var dialogWindow = $('.ui-dialog'),
                validateResult = util.validateDiv('.ui-dialog'),
                param = {},
                userEmail = util.getVal('.ui-dialog input[name=userEmail]'),    
                corpId = util.getVal('.ui-dialog span[name=corpId]','select'),                
                testingItems = [], testingFrequency;
            
            param.corpId = corpId;

            dialogWindow.find("input[name='testingItems']:checked").each(function(index,item){
                testingItems.push($(this).val());
            });
            if(testingItems.length > 0){
                param.testingItems = testingItems.toString();
            }

            testingFrequency = dialogWindow.find("input[name='testingFrequency']:checked").val();
            if(testingFrequency != undefined){
                param.testingFrequency = testingFrequency;
            };

            return param;
        },
        exportData: function(){
            var opt = {};
            opt.url = 'exportAccountManageList.do';
            opt.param = this.getParam();
            util.exports(opt);
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
            param.startTime = vDate.st.Format('yyyy-MM-dd HH:mm');
            param.endTime = vDate.et.Format('yyyy-MM-dd HH:mm');
            param.timeType = vDate.timeType;

            if(!util.compareTimeValid(param.startTime, param.endTime)){
                return null;
            } 

            return param;
        }
    });

    return {view:view};    
});