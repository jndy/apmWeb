/**
 * loginAnalasy.js
 * usage: 安全互通-邮件安全监控-恶意登录分析
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('loginAnalysy',function(require,exports,module){
    var tpl = require('{rootPath}/template/connect/loginAnalysy.html'),
        dateBar = require('dateBar'),
        grid = require('grid');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.type = 1;
            this.tabType = 1;
            this.render();
            this.initEvents();
            this.defaultClick();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
            this.dateBar = new dateBar({el:'.toolbar .fr'});
        },
        renderChart:function(data){
            var me = this,
                chart = echarts.init($('.graph-con')[0]),
                type = me.type,
                tabType = me.tabType,
                titleArr1 = ['IP&账号','IP'],
                titleArr2 = ['登录次数','登录账号个数'],
                yArr = ['单位：次','单位：个'];
            var option = {
                title : {
                    text: titleArr1[type-1]+titleArr2[tabType-1],
                    x:'center'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:[titleArr1[type-1]+titleArr2[tabType-1]],
                    y:'bottom'
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        axisLabel:{
                            rotate:45
                        },
                        data : data.xData
                    }
                ],
                yAxis : [
                    {
                        name:yArr[tabType-1],
                        type : 'value'
                        /*axisLabel : {
                            formatter: '{value} 次'
                        }*/
                    }
                ],
                series : [{
                    name:titleArr1[type-1]+titleArr2[tabType-1],
                    type:'line',
                    data:data.yData
                }]

            };
            chart.setOption(option);
        },
        renderGrid:function(){
            var me = this;
            $('.grid-content').empty();
            var columns = [{
                text:'序号',
                renderer:'serial'
            },{
                name:'loginIp',
                text:'登陆IP'
            },{
                name:'loginAddress',
                text:'IP地址'
            },{
                name:'',
                text:'账号集',
                renderer:function(val,index ,item){
                    return '<div class="td-nowrap td-fun"><a class="action detail" href="javascript:;" loginIp="{0}">查看详情</a></div>'.format(item.loginIp);
                }
            },{
                name:'loginCount',
                text:'登录次数'
            }];
            if(this.type == 2){
                columns.splice(3,1);
            }
            var option = {
                el:'.grid-content',
                url:'data.do?func=connect:getLoginAnalasyGrid',
                params:me.getParam(),
                plugin:'page',
                tableCss:'table-con mb-20',
                columns:columns
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
                me.queryData();
            }).on('click','.fl .mod-tab li',function(e){
                var dom = $(this);
                dom.addClass('current').siblings().removeClass('current');
                me.$el.find('.graph-tab li:first').addClass('current').siblings().removeClass('current');
                me.type = dom.index()+1;
                me.queryData();
            }).on('click','.graph-tab li',function(e){
                var dom = $(this);
                dom.addClass('current').siblings().removeClass('current');
                me.tabType = dom.index()+1;
                me.queryChart(true);
            }).on('timeChange','.toolbar .fr div[role=dateBar]',function(e,value){
                me.queryData();
            }).on('click','.action.detail',function(e){
                var ip = $(this).attr('ip');
                me.getDetail(ip)
            })
        },
        defaultClick:function(){
            var me = this;
            me.$el.find('a[role=query]').trigger('click');
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
        queryData:function(onlyChart){
            var me = this,
                result= me.checkParam(),
                param = me.getParam();

            if(!result)
                return;
            me.setTitle();
            me.queryChart();
            if(onlyChart != true)
                me.renderGrid();
        },
        queryChart:function(){
            var me = this;
            util.request({
                url:'data.do?func=connect:getLoginAnalasyChart',
                param:me.getParam(),
                fnSuc:function(resp){
                    me.renderChart(resp['var']);
                }
            });
        },
        queryGrid:function(){

        },
        getDetail:function(ip){
            var me = this;
            util.dialog('账号集','<div class="detailGrid" style="width: 400px;height: 250px;"></div>',null,null,{id:'peiFail',cancelDisplay:false,onshow:function(){
                var columns = [{
                    name:'loginIp',
                    text:'登陆IP'
                },{
                    name:'loginAccount',
                    text:'登录账号'
                },{
                    name:'loginCount',
                    text:'登录次数'
                }];
                var option = {
                    el:'.ui-dialog .detailGrid',
                    url:'data.do?func=connect:getLoginAnalasyGrid',
                    param:{loginIp:ip},
                    tableCss:'table-con mb-20',
                    columns:columns
                };
                new grid(option);
            }
            });
        },
        setTitle:function(){
            var me = this,
                titleArr1 = ['IP&账号','IP'],
                //titleArr2 = ['登录次数','登录账号个数'],
                title = titleArr1[me.type-1]+'登录详情';

            me.$el.find('.grid-title').text(title);
        },
        checkParam:function(){
            var me = this,
                loginIP = util.getVal('.retrieval-con input[name=loginIP]'),
                validateResult = util.validate(loginIP,'ip'),
                time = me.dateBar.getValue('yyyy-MM-dd HH:mm'),
                result = true;

            if(loginIP != '' && !validateResult.flag){
                util.showMsg(validateResult.msg);
                result = false;
            }

            if(!util.compareTimeValid(time.st,time.et)){
                util.showMsg('结束时间不能小于开始时间');
                result = false;
            }
            return result;
        },
        getParam:function(){
            var me = this,
                type = me.type,
                param = {},
                dateBar = me.dateBar,
                loginIP = util.getVal('.retrieval-con input[name=loginIP]');

            param.loginIP = loginIP;
            param.type = me.type;
            param.tabType = me.tabType;
            $.extend(param,dateBar.getValue(null,'yyyy-MM-dd HH:mm'));
            if(loginIP == '')
                delete param.loginIP;
            return param;
        }
    });

    return {view:view};
});