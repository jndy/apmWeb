/**
 * vipQues.js
 * usage: VIP保障-VIP用户问题跟踪
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('vipQues',function(require,exports,module){
  var tpl = require('{rootPath}/template/vip/vipQues.html');
  var grid = require('grid');

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
                url:'data.do?func=vip:getVipQuesList',
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
                        name:'mitName',
                        text:'监控点名称'
                    },{
                        name:'errorType',
                        text:'失败类型'
                    },{
                        name:'respTime',
                        text:'失败类型'
                    },{
                        name:'errorCode',
                        text:'失败返回状态码'
                    },{
                        name:'errorDesc',
                        text:'故障描述'
                    },{
                        name:'operTime',
                        text:'操作时间'
                    }
                ]
                //plugin:'page'
            };
            var gridView = new grid(option);
            this.gridView = gridView;
        },
        initEvents:function(){
            var me = this;

            me.$el.off().on("click",'a[role=query]',function(e){
                me.onQuery();
            })
        },
        /**
         * 查询下拉框事件处理
         * @return {[type]} [description]
         */
        selectEventHandler:function(){
            var me = this;
            me.renderMitName();
            me.renderProvince();

            util.my_select();

        },
        //监控点名称
        renderMitName:function(){
            var me = this;
            $("select[name=mitName]").empty().html(util.createOptions(gMain.monitoringPoints["mitId_4"],"itemTypeName","itemTypeId"));
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
        onQuery:function(){
            var me = this;
            me.gridView.requestData(me.getParam);
        },
        getParam:function(){
            var param = {
                startTime:$("select[name=startTime]").val(),
                endTime:$("select[name=endTime]").val(),
                province:$("select[name=province]").val(),
                mitName:$("select[name=mitName]").val(),
                vipLevel:$("select[name=vipLevel]").val()
            };
            var account = $.trim($("input[name=account]").val());
            var userName = $.trim($("input[name=userName]").val());
            var errorCode = $.trim($("input[name=errorDesc]").val());

            var errorType = "";
            $("input[name=errorType]").each(function(){
                if($(this).is(":checked")){
                    errorType += $(this).val()+","
                }
            });
            errorType = errorType.replace(/,$/,"");

            param["account"] = account;
            param["userName"] = userName;
            param["errorCode"] = errorCode;
            param["errorType"] = errorType;

            return param;
        }
      })

  return {view:view};
})