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
                url:'data.do?func=alarm:advice',
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
            var mit_way = [
                {key:'全部',val:'0'},
                {key:'日志',val:'1'},
                {key:'拨测',val:'2'}
            ];

            $("select[name=mit_way]").empty().html(me.createOptions(mit_way));


            $("select[name=mit_way]").off("change").on("change",function(e){
                var val = $(this).val();
            })

            me.renderMitType();
            me.renderMitName();
            me.renderProvince();

            util.my_select();

        },
        //监控点类型
        renderMitType:function(){
            var me=this,
                fnSuc = function(resp){
                var dataList = resp["var"]["dataList"];
                if(dataList && dataList.length>0){
                    $("select[name=mit_type]").empty().html(me.createOptions(dataList,"typeName","id"));
                }
            }
            alarmApi.getConfigType({fnSuc:fnSuc})
        },
        //监控点名称
        renderMitName:function(){
           var me=this,
             fnSuc = function(resp){
             var dataList = resp["var"]["dataList"];
             if(dataList && dataList.length>0){
                $("select[name=mit_type]").empty().html(me.createOptions(dataList,"typeName","id"));
             }
            }
            alarmApi.getMonitor({fnSuc:fnSuc}) 
        },
        //省份
        renderProvince:function(){

        },
        /**
         * 生成下拉框options
         * @param  {[type]} obj 数据对象
         * @param  {[type]} key 对象key
         * @param  {[type]} val 对象val
         * @param  {[type]} all 是否显示全部
         * @return {[type]}     [description]
         */
        createOptions:function(obj,key,val,all){
            var optionHtml = "";
            key = key ? key : "key";
            val = val ? val : "val";
            $.each(obj, function(index, item){
                optionHtml += "<option value='"+item[val]+"'>"+item[key]+"</option>";
            })
            return optionHtml;
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

        },
        onRemark:function(){

        },
        /**
         * 获取搜索表单参数
         * @return {[type]} [description]
         */
        getParam: function(){
            var me = this,
                param = {},
                mit_way,mit_type,mit_name,province,srv_ip;

            mit_way = util.getVal('.retrieval-con span[name=mit_way]','select');
            if(mit_way != ''){
                param.mit_way = mit_way;
            }
            mit_type = util.getVal('.retrieval-con span[name=mit_type]','select');
            if(mit_type != ''){
                param.mit_type = mit_type;
            }
            mit_name = util.getVal('.retrieval-con span[name=mit_name]','select');
            if(mit_name != ''){
                param.mit_name = mit_name;
            }
            province = util.getVal('.retrieval-con span[name=province]','select');
            if(province != ''){
                param.province = province;
            }
            srv_ip = util.getVal('.retrieval-con input[name=srv_ip]');
            if(srv_ip != ''){
                param.srv_ip = srv_ip;
            }
            return param;
        }
    });
    return {view:view};
});