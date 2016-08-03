/**
 * configList.js
 * usage: 故障告警-告警配置
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('configList',function(require,exports,module){
    var tpl = require('{rootPath}/template/alarm/configList.html');
    var alarmApi = require("alarmApi");
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
                url:'data.do?func=alarm:getConfigList',
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:[{
                    name:'id',
                    text:'序号'
                },{
                    name:'name',
                    text:'监控点名称'
                },{
                    name:'mtype',
                    text:'监控类型',
                    renderer:function(val){
                        var str = '应用服务质量';
                        
                        return str;
                    }
                },{
                    name:'alarmCondition',
                    text:'告警条件',
                    renderer:function(val){
                        var html = "<div class='td-more'>" + val + "</div>";
                        return html;
                    }
                },{
                    name:'lastmodifiedtime',
                    text:'更新时间'
                },{
                    name:'userName',
                    text:'更新人'
                },{
                    name:'status',
                    text:'状态',
                    renderer:function(val){
                        var str = '启用';
                        
                        return str;
                    }
                },{
                    name:'',
                    text:'操作',
                    renderer:function(val,index ,item){
                        var str = '';
                        str = util.format_advanced($("#list-modify").html(),{index:index});
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
            }).on('click','a[role=addConfig]',function(e){
                me.onAddConfig();
            }).on('click','a[role=config-edit]',function(e){
                me.onEdit($(this).data("index"));
            }).on('click','a[role=config-pause]',function(e){
                me.onPause($(this),$(this).data("index"));
            }).on('click','a[role=config-resume]',function(e){
                me.onResume($(this),$(this).data("index"));
            }).on('click','a[role=config-detail]',function(e){
                me.onDetail($(this).data("index"));
            });
        }
        ,
        /**
         * 查询下拉框事件处理
         * @return {[type]} [description]
         */
        selectEventHandler:function(){
            var me = this;

            me.renderMitType();
            me.renderMitName();

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
        onQuery:function(){
            var me = this;
            me.gridView.requestData(me.getParam(),1);
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
        getParam:function(){
            var param = {
                mitType:$("select[name=mitType]").val(),
                mitName:$("select[name=mitName]").val(),
                status:$("select[name=status]").val()
            }
            return param;
        },
        //新建告警配置
        onAddConfig:function(){
            var me = this;
            util.jumpModule("alarm/configList?childView=addConfig");
        },
        onEdit:function(index){
            var me = this;
            var obj = me.gridView.data[index];
            util.jumpModule("alarm/configList?childView=updateConfigType&type="+obj["id"]+"&itemTypeId=" + obj["mtype"]);
        },
        onPause:function(_slef,index){
            var me = this;
            var obj = me.gridView.data[index];
            var fnSuc = function(resp){
                _slef.css({"display":"none"});
                _slef.siblings("a[role=config-resume]").css({"display":""});
            }
            alarmApi.changeRuleState({fnSuc:fnSuc,param:{alarmId:obj["alarmId"],state:0}});
        },
        onResume:function(_slef,index){
            var me = this;
            var obj = me.gridView.data[index];
            var fnSuc = function(resp){
                _slef.css({"display":"none"});
                _slef.siblings("a[role=config-pause]").css({"display":""});
            }
            alarmApi.changeRuleState({fnSuc:fnSuc,param:{alarmId:obj["alarmId"],state:1}});
        },
        onDetail:function(index){
            var me = this;
            util.jumpModule("alarm/configList?childView=configDetail&type=detail&oper=detail");
        },
        getWindowParam:function(){
            var dialogWindow = $('.ui-dialog'),
                validateResult = util.validateDiv('.ui-dialog'),
                userType = util.getVal('.ui-dialog span[name=userType]','select'),
                param = {},
                summary = dialogWindow.find('textarea').val(),
                inputDoms = dialogWindow.find('input');

            if(userType == 0){
                util.showMsg('角色类型不能为全部')
                return null;
            }
            param.userType = userType;
            if(!validateResult.flag){
                util.showMsg(validateResult.msg);
                return null;
            }

            if($.trim(summary) != ''){
                param.summary = summary;
            }

            inputDoms.each(function(index,item){
                var dom = $(item);
                var val = $.trim(dom.val()),
                    paramName = dom.attr('name');

                if(paramName == 'userPwd'){
                    val = hex_md5(val);
                }
                param[paramName] = val;
            })

            return param;
        },
        refresh:function(){
            this.$el.find('a[role=query]').trigger('click');
        },
        onclick:function(e){
            //注意此时的e对象是被jquery封装过的；注意target和currentTarget的差别
            var dom = jQuery(e.currentTarget).parent();
            dom.siblings().removeClass('current');
            dom.addClass('current');
        }
    });
    return {view:view};
});