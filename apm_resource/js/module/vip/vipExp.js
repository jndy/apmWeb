/**
 * vipExp.js
 * usage: VIP保障-VIP用户体验跟踪
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('vipExp',function(require,exports,module){
  var tpl = require('{rootPath}/template/vip/vipExp.html');
  var grid = require('grid');
  var vipApi = require("vipApi");

  var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.initEvents();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
            util.my_select();
            this.renderGrid();
        },
        renderGrid:function(){
          $('.content_main').empty();
            var option = {
                el:'.content_main',
                url:'data.do?func=vip:getVipExpList',
                plugin:'page',
                autoLoad:false,
                tableCss:'table-con mb-20',
                columns:[
                    {
                        name:'id',
                        text:'序号'
                    },{
                        name:'operTime',
                        text:'统计日期'
                    },{
                        name:'mitName',
                        text:'统计方式'
                    },{
                        name:'respTime',
                        text:'监控点名称'
                    },{
                        name:'status',
                        text:'VIP用户数'
                    },{
                        name:'',
                        text:'操作',
                        renderer:function(val,index ,item){
                            var str = '';
                            str = $("#list-modify").html();
                            var obj = {index:index};
                            str = util.format_advanced(str,obj);
                            return str;
                        }
                    }
                ]
                //plugin:'page'
            };
            var gridView = new grid(option);
            this.gridView = gridView;

            //先隐藏
            $("table.table-striped").parent("div").css({display:"none"});

            //没有数据的时候
            $('.content_main').append("<div class='no-info'></div>")
        },
        initEvents:function(){
            var me = this;
            me.$el.off().on("click",'a[role=query]',function(e){
                me.onQuery();
            }).on("click",'a[role=vipexp-detail]',function(e){
              me.onDetail($(this));
            })
        },
        onQuery:function(){
          var me = this;
          var fnSuc = function(resp){
            var dataList = resp["var"]["dataList"];
            if(dataList.length==0){
              var option = {
                cancel:false
              }
              util.dialog("提示信息","您输入的VIP用户不存在，请重新输入",function(){},"",option);
              return false;
            }else{
              $("div.no-info").css({"display":"none"});

              me.gridView.loadData(dataList);
              me.gridView.renderPlugin(resp);
              $("table.table-striped").parent("div").css({"display":"block"});
            }
          };
          vipApi.getVipExpList({
            param:me.getParam(),
            fnSuc:fnSuc
          });
        },
        onDetail:function(obj){
          var me = this;
          var content = $("#vipexp-detail-tpl").html();
          var option = {
            okValue:"关闭",
            cancel:false
          }
          var dataList = me.gridView.data;
          var index = obj.data("index");
          content = util.format_advanced(content,dataList[index]);
          util.dialog('查看详情',content,function(){},function(){return false;},option);
        },
        getParam:function(){
          var param = {
            domain:$("select[name=domain]").val(),
            startTime:$("input[name=startTime]").val(),
            endTime:$("input[name=endTime]").val(),
            status:$("select[name=status]").val()
          };
          var account = $.trim($('input[name=account]').val());
          var userName = $.trim($("input[name=userName]").val());

          param["account"] = account;
          param["userName"] = userName;

          return param;
        },

      })

  return {view:view};

})