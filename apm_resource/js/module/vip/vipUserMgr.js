/**
 * vipUserMgr.js
 * usage: VIP保障-VIP用户管理
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('vipUserMgr',function(require,exports,module){
  var tpl = require('{rootPath}/template/vip/vipUserMgr.html');
  var grid = require('grid');
  var vipApi = require("vipApi");

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
        renderGrid: function(){
            $('.content_main').empty();
            var option = {
                el:'.content_main',
                url:'data.do?func=vip:getVipUserList',
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[
                    {
                        name:'id',
                        text:'序号'
                    },{
                        name:'province',
                        text:'省份'
                    },{
                        name:'account',
                        text:'VIP用户帐号'
                    },{
                        name:'userName',
                        text:'VIP用户姓名'
                    },{
                        name:'VIPLevel',
                        text:'VIP服务等级'
                    },{
                        name:'status',
                        text:'跟踪状态'
                    },{
                        name:'updateTime',
                        text:'更新时间'
                    }
                ]
                //plugin:'page'
            };
            var gridView = new grid(option);
            this.gridView = gridView;
        },
        initEvents:function(){
            var me = this;

            me.$el.off().on('click','a[role=query]',function(e){
                me.onQuery();
            }).on("click","a[role=vip-async]",function(){
                me.onAsync($(this));
            }).on("click","a[role=vip-export]",function(){
                me.onExport();
            })
        },
        /**
         * 查询下拉框事件处理
         * @return {[type]} [description]
         */
        selectEventHandler:function(){
            var me = this;
            me.renderProvince();

            util.my_select();

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
        onAsync:function(obj){
            var me = this;
            var fnSuc = function(resp){
                var option = {
                    cancel:false
                }
                if("S_OK" == resp["code"]){
                    util.dialog("提示","VIP用户同步成功",function(){},"",option);
                }else{
                    util.dialog("提示","<span class='c-red'>VIP用户同步失败</span>",function(){},"",option);
                }
                obj.removeClass('btn-gray').addClass('btn-blue').removeClass("disabled");
            }
            if(!obj.attr("disabled")){
                obj.removeClass('btn-blue').addClass('btn-gray').attr("disabled","disabled");
                
                ///同步状态
                vipApi.updateStatus({fnSuc:fnSuc});
            }
            return false;
            

        },
        onExport:function(){
            
            alert('导出');
        },
        onQuery:function(){
            var me = this;
            me.gridView.requestData(me.getParam(),1);
        },
        getParam:function(){
            var param = {
                startTime:$("input[name=startTime]").val(),
                endTime:$("input[name=endTime]").val(),
                province:$("select[name=province]").val(),
                vipLevel:$("select[name=vipLevel]").val()
            }

            var account = $.trim($("input[name=account]").val());
            var userName = $.trim($("input[name=userName]").val());
            var status = "";
            $("input[name=status]").each(function(){
                if($(this).is(":checked")){
                    status += $(this).val()+",";
                }
            })
            status = status.replace(/,$/,"");
            param["account"] = account;
            param["userName"] = userName;
            param["status"] = status;

            return param;
        }
      })

  return {view:view};
})