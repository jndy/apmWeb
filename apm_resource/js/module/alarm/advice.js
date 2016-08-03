/**
 * advice.js
 * usage: 故障告警-告警通知
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('advice',function(require,exports,module){
    var tpl = require('{rootPath}/template/alarm/advice.html');
    var grid = require('grid');
    var alarmApi = require("alarmApi");

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.initEvents();
            this.selectEventHandler();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
            this.renderGrid();
        },
        renderGrid:function(){
            $('.content_main').empty();
            var option = {
                el:'.content_main',
                url:'data.do?func=alarm:getAdvice',
                plugin:'page',
                params:{
                    noticeType:1
                },
                tableCss:'table-con mb-20',
                columns:[{
                    name:'id',
                    text:'序号'
                },{
                    name:'mitWay',
                    text:'监控方式'
                },{
                    name:'mitName',
                    text:'监控点名称'
                },{
                    name:'mitType',
                    text:'监控类型',
                    renderer:function(val){
                        var str = 'VIP监控';
                        
                        return str;
                    }
                },{
                    name:'reason',
                    text:'告警原因'
                },{
                    name:'province',
                    text:'省份/IP'
                },{
                    name:'alarmLevel',
                    text:'告警等级'
                },{
                    name:'lastStateChange',
                    text:'持续时长'
                },{
                    name:'updateTime',
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
                me.onQuery();
            }).on('click','a.see-history',function(e){
                $(".sidebar").find("a[href='#alarm/history']").click();
            }).on('click','a[role=alarm-all]',function(e){
                me.onQuery();
            }).on('click','a[role=alarm-1]',function(e){
                me.onQuery(1);
            }).on('click','a[role=alarm-2]',function(e){
                me.onQuery(2);
            }).on('click','a[role=alarm-3]',function(e){
                me.onQuery(3);
            }).on('click','a[role=advice-detail]',function(e){
                me.onDetail();
            }).on('click','a[role=advice-ignore]',function(e){
                me.onIgnore();
            }).on('click','a[role=advice-remark]',function(e){
                me.onRemark();
            }).on('click','a[role=advice-resume]',function(e){
                me.onResume();
            }).on("loadChange",function(event,resp){
                //表格数据回调
                
            });
        },
        /**
         * 查询下拉框事件处理
         * @return {[type]} [description]
         */
        selectEventHandler:function(){
            var me = this;
            var mitWay = [
                {key:'全部',val:''},
                {key:'日志',val:'1'},
                {key:'拨测',val:'2'},
                {key:'归档',val:'3'}
            ];

            $("select[name=mitWay]").empty().html(util.createOptions(mitWay));


            // $("select[name=mitWay]").on("change",function(e){
            //     var val = $(this).val();
            //     console.log('test');
            // })

            me.renderMitType();
            me.renderMitName();
            me.renderProvince();

            util.my_select();

        },
        //监控点类型
        renderMitType:function(){
            var me=this;
            $("select[name=mitType]").empty().html(util.createOptions(gMain.monitoringType,"mitName","mitId"));
        },
        //监控点名称
        renderMitName:function(){
            var me = this;
           $("select[name=mitType]").on("change",function(){
                var mitId = $(this).val();
                var mitPoints = gMain.monitoringPoints["mitId_"+mitId];
                var mitNameHtml = '<select style="display:none" widthNo="150" name="mitName">';
                mitNameHtml += util.createOptions(mitPoints,"itemTypeName","itemTypeId");
                mitNameHtml += "</select>";
                $("div[role=mitName]").empty().html(mitNameHtml);
                util.my_select();
           })
        },
        //省份
        renderProvince:function(){
            var me = this;
            $("select[name=corpId]").empty().html(util.createOptions(gMain.provinceList,"corpName","corpId"));
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
        /**
         * 执行查询
         * @param  {[type]} status 
         * @return {[type]}        [description]
         */
        onQuery:function(status){
            var me = this;
            var param  = me.getParam();
            if(!param){
                return ;
            }

            var pattern = /^(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])\.(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])\.(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])\.(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])$/;
            //判断IP
            if(param.srvIp && !param.srvIp.match(pattern)){
                util.showMsg("请输入正确的IP地址");
                return false;
            }
            if(status){
                param.status = status;
            }
            me.gridView.requestData(param,1);
        },
        onDetail:function(){
            var me = this;
            var fnSuc = function(resp){
                var obj = resp["var"];
                if(obj){
                    var content = $("#advice-detail-tpl").html();
                    content = util.format_advanced(content,obj);
                    util.dialog('告警详情',content,function(){
                        
                    });
                }else{
                    util.showMsg("获取详情失败",2);
                }
                
            }
            alarmApi.getAdviceDetail({fnSuc:fnSuc});
            
        },
        onIgnore:function(){
            var me = this;
            var content = $("#advice-ignore-tpl").html();
                //content = util.format_advanced(content,obj);
                var dialog = util.dialog('告警通知忽略',content,function(){
                    var fnSuc = function(resp){
                        dialog.close().remove();
                        util.showMsg("该告警已忽略",1);
                        me.onQuery();                   
                    }
                    var ignore = $.trim($("textarea[name=ignore]").val());

                    alarmApi.updateAdviceIgnore({fnSuc:fnSuc,param:{ignore:ignore}});
                    return false;
                });
        },
        onRemark:function(){
            var content = $("#advice-remark-tpl").html();
            //content = util.format_advanced(content,obj);
            var dialog = util.dialog('告警通知备注',content,function(){
                var fnSuc = function(resp){
                    dialog.close().remove();
                    util.showMsg("备注添加成功",1);                     
                }
                var remark = $.trim($("textarea[name=remark]").val());

                alarmApi.updateAdviceRemark({fnSuc:fnSuc,param:{remark:remark}});
                return false;
            });
        },
        onResume:function(){
            var me = this;
            var content = $("#advice-resume-tpl").html();
            //content = util.format_advanced(content,obj);
            var dialog = util.dialog('告警通知已恢复',content,function(){
                var fnSuc = function(resp){
                    dialog.close().remove();
                    util.showMsg("该告警已恢复",1);
                    me.onQuery();       
                }
                var resume = $.trim($("textarea[name=resume]").val());

                alarmApi.updateAdviceResume({fnSuc:fnSuc,param:{resume:resume}});
                return false;
            });
        },
        /**
         * 获取搜索表单参数
         * @return {[type]} [description]
         */
        getParam: function(){
            var me = this,
                param = {
                    noticeType:1,
                    mitWay: $("select[name=mitWay]").val(),
                    mitType: $("select[name=mitType]").val(),
                    mitName: $("select[name=mitName]").val(),
                    corpId: $("select[name=corpId]").val()
                };
            var srvIp = $.trim($("input[name=srvIp]").val());
            param["srvIp"] = srvIp;
            return param;
        }
    });
    return {view:view};
});