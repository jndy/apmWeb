/**
 * appService.js
 * usage: 质量监控-应用服务质量
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-13
 * useing jQuery JavaScript frame v1.7+
 */
define('appService',function(require,exports,module){
    var tpl = require('{rootPath}/template/monitor/appService.html'),
        serverTpl = require('{rootPath}/template/monitor/serviceServer.html'),
        serviceDetail = require('serviceDetail');

    var view = Backbone.View.extend({
        el:'.container',
        initialize:function(){
            this.render();
            this.initEvents();
            this.defaultRequest();
        },
        render:function(){
            var html = _.template(tpl)({});
            this.$el.empty().append(html);
        },
        initEvents:function(){
            var me = this;

            me.$el.off().on('click','.quality-app a',function(e){
                var serviceName = $(this).attr('serviceName'),
                    title = $(this).text() + '服务运行情况';
                me.getServerDetail(serviceName,title);
            }).on('click','.fixBar a',function(e){
                var dom = $(this).parent();
                dom.addClass('active').siblings().removeClass('active');
                me.getServiceFlow(dom.index(),$(this).text());
            });


        },
        defaultRequest:function(){
            var me = this;
            util.request({
                url:'data.do?func=service:getAllServiceQuality',
                fnSuc:function(resp){
                    var data = resp['var'];
                    me.cacheData = data;
                    var cssArr = ['btn-nothing','btn-normal','btn-commonly','btn-heavier','btn-serious','btn-nothing'];
                    for(var i = 0,len = data.length;i<len;i++){
                        var serviceName = data[i].serviceName;
                        var level = data[i].level;
                        me.$el.find('.quality-app a[serviceName={0}]'.format(serviceName)).attr('class',cssArr[level]);
                    }
                }
            })
        },
        getServerDetail:function(serviceName,title){
            var me = this;
            util.request({
                url:'data.do?func=service:getServiceQuality',
                param:{serviceName:serviceName},
                fnSuc:function(res){
                    var data = res['var'];
                    me.showServerDetailDialog(data,title,serviceName);
                }
            });
        },
        getServiceDetail:function(serviceName,serverName){
            var options = this.titleMap[serviceName];
            options.serverName = serverName;
            util.request({
                url:'data.do?func=service:getServerAndCmd',
                param:{serviceName:serviceName},
                fnSuc:function(res){
                    options.servers = res['var']['servers'];
                    serviceDetail(options);
                }
            });
        },
        getServiceFlow:function(index,title){
            var me = this;
            var data = me.cacheData || [];
            var content = me.getDialogHtml(index-1);
            util.dialog(title,content,null,null,{cancelDisplay:false,onshow:function(){
                var d = this;
                var cssArr = ['btn-nothing','btn-normal','btn-commonly','btn-heavier','btn-serious'];
                for(var i = 0,len = data.length;i<len;i++){
                    var serviceName = data[i].serviceName;
                    var level = data[i].level;
                    $('.ui-dialog .oper-box a[serviceName={0}]'.format(serviceName)).removeClass('btn-nothing').addClass(cssArr[level]);
                }
                $('.ui-dialog').off().on('click','.oper-box a',function(){
                    var serviceName = $(this).attr('serviceName');
                    d.close();
                    me.getServiceDetail(serviceName);
                });
            }})
        },
        getFailDetail:function(serviceName,serverName){
            var me = this;
            util.dialog('  ','<div class="failPieChart" style="width: 600px;height: 300px;"></div>',null,null,{id:'peiFail',cancelDisplay:false,onshow:function(){
                util.request({
                    url:'data.do?func=service:analyseServerFail',
                    param:{serviceName:serviceName,serverName:serverName},
                    fnSuc:function(res){
                        var data = res['var'];
                        me.drawPieChart(data);
                    }
                });
            }
            });

        },
        showServerDetailDialog:function(data,title,serviceName){
            var me = this,
                content = _.template(serverTpl)({list:data});
            util.dialog(title,content,null,null,{cancelDisplay:false,onshow:function(){
                var d = this;
                //增加监听事件
                $('.ui-dialog').off().on('click','.server-ui img',function(){
                    var serverName = $(this).next().text();
                    d.close();
                    me.getServiceDetail(serviceName,serverName);
                }).on('click','.server-ui-more',function(){
                    d.close();
                    me.getServiceDetail(serviceName);
                }).on('click','a[role=failDetail]',function(){
                    var serverName = $(this).parents('.con:first').prev().text();
                    me.getFailDetail(serviceName,serverName);
                });
            }});
        },
        drawPieChart:function(data){
            var chart = echarts.init(jQuery('.ui-dialog .failPieChart')[0]);
            var legendData = [];
            $.each(data.dataList,function(index,item){
                legendData.push(item.name);
            });
            var option = {
                title : {
                    text: '失败原因分析',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b}"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    align:'left',
                    y:'middle',
                    data: legendData
                },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['20%', '50%'],
                        data:data.dataList,
                        itemStyle: {
                            normal:{
                                label:{
                                    show:false
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            chart.setOption(option);
        },
        getDialogHtml:function(index){
            var html = '';
            switch (index){
                case 0:
                    html = '<div class="oper-box oper-con-1"><a href="javascript:;" serviceName="APPSVR" class="one btn-nothing">APPSVR</a> <a href="javascript:;" serviceName="WEBMAIL" class="two btn-nothing">WEBMAIL</a> <a href="javascript:;" serviceName="SP" class="three btn-nothing">SP</a> <a href="javascript:;" serviceName="MD" class="four btn-nothing">MD</a> <span class="txt">smap前置机</span> </div>';
                    break;
                case 1:
                    html = '<div class="oper-box oper-con-2"><a href="javascript:;" serviceName="APPSVR" class="one btn-nothing">APPSVR</a> <a href="javascript:;" serviceName="WEBMAIL" class="two btn-nothing">WEBMAIL</a> <a href="javascript:;" serviceName="SP" class="three btn-nothing">SP</a> <a href="javascript:;" serviceName="MD" class="four btn-nothing">MD</a> <span class="txt">smap前置机</span> </div>';
                    break;
                case 2:
                    html = '<div class="oper-box oper-con-3"><a href="javascript:;" serviceName="SMTP" class="one btn-nothing">SMTP</a> <a href="javascript:;" serviceName="POP" class="two btn-nothing">POP</a> <a href="javascript:;" serviceName="IMAP" class="three btn-nothing">IMAP</a> <a href="javascript:;" serviceName="SP" class="four btn-nothing">SP</a> <a href="javascript:;" serviceName="MD" class="five btn-nothing">MD</a> <span class="txt">smap前置机</span> </div>';
                    break;
                case 3:
                    html = '<div class="oper-box oper-con-4"><a href="javascript:;" serviceName="WEBAPP" class="one btn-nothing">WEBAPP</a> <a href="javascript:;" serviceName="MI" class="two btn-nothing">MI</a> </div>';
                    break;
                case 4:
                    html = '<div class="oper-box oper-con-5"><a href="javascript:;" serviceName="POP" class="one btn-nothing">POP</a> <a href="javascript:;" serviceName="IMAP" class="two btn-nothing">IMAP</a> <a href="javascript:;" serviceName="MD" class="three btn-nothing">MD</a> <a href="javascript:;" serviceName="SP" class="four btn-nothing">SP</a> <a href="javascript:;" serviceName="MS" class="five btn-nothing">MS</a> <a href="javascript:;" serviceName="MI" class="six btn-nothing">MI</a> <span class="txt">smap前置机</span> </div>';
                    break;
                case 5:
                    html = '<div class="oper-box oper-con-6"><a href="javascript:;" serviceName="WEBAPP" class="one btn-nothing">WEBAPP</a> <a href="javascript:;" serviceName="SP" class="two btn-nothing">SP</a> <a href="javascript:;" serviceName="MS" class="three btn-nothing">MS</a> <a href="javascript:;" serviceName="MI" class="four btn-nothing">MI</a> </div>';
                    break;
                case 6:
                    html = '<div class="oper-box oper-con-7"><a href="javascript:;" serviceName="IMAP" class="one btn-nothing">IMAP</a> <a href="javascript:;" serviceName="MD" class="two btn-nothing">MD</a> <a href="javascript:;" serviceName="SP" class="three btn-nothing">SP</a> <a href="javascript:;" serviceName="MS" class="four btn-nothing">MS</a> <a href="javascript:;" serviceName="MI" class="five btn-nothing">MI</a> </div>';
                    break;
                case 7:
                    html = '<div class="oper-box oper-con-8"><a href="javascript:;" serviceName="LDA" class="one btn-nothing">LDA</a> <a href="javascript:;" serviceName="WEBAPP" class="two btn-nothing">WEBAPP</a> <a href="javascript:;" serviceName="ANTISPAM" class="three btn-nothing">ANTISPAM</a> <a href="javascript:;" serviceName="MD" class="four btn-nothing">MD</a> <a href="javascript:;" serviceName="SP" class="five btn-nothing">SP</a> <a href="javascript:;" serviceName="MS" class="six btn-nothing">MS</a> <a href="javascript:;" serviceName="MI" class="seven btn-nothing">MI</a> <a href="javascript:;" serviceName="FTS" class="eight btn-nothing">FTS</a> <span class="txt">smap前置机</span> </div>';
                    break;
                case 8:
                    html = '<div class="oper-box oper-con-9"><a href="javascript:;" serviceName="LDA" class="one btn-nothing">LDA</a> <a href="javascript:;" serviceName="WEBAPP" class="two btn-nothing">WEBAPP</a> <a href="javascript:;" serviceName="RDA" class="three btn-nothing">RDA</a> <a href="javascript:;" serviceName="ANTISPAM" class="four btn-nothing">ANTISPAM</a> <a href="javascript:;" serviceName="MD" class="five btn-nothing">MD</a> <a href="javascript:;" serviceName="SP" class="six btn-nothing">SP</a> <a href="javascript:;" serviceName="DMZ SMTP" class="seven btn-nothing">DMZ SMTP</a> <a href="javascript:;" serviceName="DMZ LDA" class="eight btn-nothing">DMZ LDA</a> <a href="javascript:;" serviceName="DMZ RDA" class="night btn-nothing">DMZ RDA</a> <span class="txt">smap前置机</span> </div>';
                    break;
                case 9:
                    html = '<div class="oper-box oper-con-10"><a href="javascript:;" serviceName="LDA" class="one btn-nothing">LDA</a> <a href="javascript:;" serviceName="SMTP" class="two btn-nothing">SMTP</a> <a href="javascript:;" serviceName="ANTISPAM" class="three btn-nothing">ANTISPAM</a> <a href="javascript:;" serviceName="MD" class="four btn-nothing">MD</a> <a href="javascript:;" serviceName="SP" class="five btn-nothing">SP</a> <a href="javascript:;" serviceName="MS" class="six btn-nothing">MS</a> <a href="javascript:;" serviceName="MI" class="seven btn-nothing">MI</a> <a href="javascript:;" serviceName="FTS" class="eight btn-nothing">FTS</a> <span class="txt">smap前置机</span> </div>';
                    break;
                case 10:
                    html = '<div class="oper-box oper-con-11"><a href="javascript:;" serviceName="LDA" class="one btn-nothing">LDA</a> <a href="javascript:;" serviceName="SMTP" class="two btn-nothing">SMTP</a> <a href="javascript:;" serviceName="RDA" class="three btn-nothing">RDA</a> <a href="javascript:;" serviceName="ANTISPAM" class="four btn-nothing">ANTISPAM</a> <a href="javascript:;" serviceName="MD" class="five btn-nothing">MD</a> <a href="javascript:;" serviceName="SP" class="six btn-nothing">SP</a> <a href="javascript:;" serviceName="DMZ SMTP" class="seven btn-nothing">DMZ SMTP</a> <a href="javascript:;" serviceName="DMZ LDA" class="eight btn-nothing">DMZ LDA</a> <a href="javascript:;" serviceName="DMZ RDA" class="night btn-nothing">DMZ RDA</a> <span class="txt">smap前置机</span> </div>';
                    break;
                case 11:
                    html = '<div class="oper-box oper-con-12"><a href="javascript:;" serviceName="DMZ MX" class="one btn-nothing">DMZ MX</a> <a href="javascript:;" serviceName="MX" class="two btn-nothing">MX</a> <a href="javascript:;" serviceName="LDA" class="three btn-nothing">LDA</a> <a href="javascript:;" serviceName="ANTISPAM" class="four btn-nothing">ANTISPAM</a> <a href="javascript:;" serviceName="MD" class="five btn-nothing">MD</a> <a href="javascript:;" serviceName="SP" class="six btn-nothing">SP</a> <a href="javascript:;" serviceName="MS" class="seven btn-nothing">MS</a> <a href="javascript:;" serviceName="MI" class="eight btn-nothing">MI</a> <a href="javascript:;" serviceName="FTS" class="night btn-nothing">FTS</a> </div>';
                    break;
                case 12:
                    html = '<div class="oper-box oper-con-13"><a href="javascript:;" serviceName="LDA" class="one btn-nothing">LDA</a> <a href="javascript:;" serviceName="ENSVR" class="two btn-nothing">ENSVR</a> <a href="javascript:;" serviceName="VASP" class="three btn-nothing">VASP</a> </div>';
                    break;
                case 13:
                    html = '<div class="oper-box oper-con-14"><a href="javascript:;" serviceName="APPSVR" class="one btn-nothing">APPSVR</a> <a href="javascript:;" serviceName="WEBAPI" class="two btn-nothing">WEBAPI</a> <a href="javascript:;" serviceName="SMAPAPI" class="three btn-nothing">SMAPAPI</a> <a href="javascript:;" serviceName="MD" class="four btn-nothing">MD</a> <a href="javascript:;" serviceName="SP" class="five btn-nothing">SP</a> <a href="javascript:;" serviceName="MI" class="six btn-nothing">MI</a> </div>';
                    break;
                default:
                    break;
            }

            return html;
        },
        titleMap:{
            'ENSVR':{title:'ENSVR服务',subTitle:'ENSVR服务，事件消息的存储与通知，用于向外围业务系统主动通知订阅的事件消息。'},
            'VASP':{title:'VASP服务',subTitle:'VASP服务主要被短信到达通知模块服务。'},
            'WEBMAIL':{title:'WEBMAIL服务',subTitle:'WEBMAIL服务负责处理用户登录WEBMAIL邮箱发出的请求，并返回相应的信息。'},
            'WEBAPP':{title:'WEBAPP服务',subTitle:'以HTTP方式(HTTP/POST+JSON)提供邮件能力外部接口。主要是供ajax调用。'},
            'APPSVR':{title:'APPSVR服务',subTitle:'APP SVR起承前启后的作用，对web/wap等提供统一的面向业务功能的对外接口。主要模块包括安全检测、调用后端服务、及时响应请求。'},
            'ANTISPAM':{title:'ANTISPAM反垃圾详情',subTitle:'提供本域邮件投递及外域邮件投递反垃圾服务。'},
            'POP':{title:'POP服务',subTitle:'POP3模块负责处理终端用户的发出POP3请求，并按POP3协议返回相应的信息。'},
            'IMAP':{title:'IMAP服务',subTitle:'IMAP4模块负责处理终端用户的发出IMAP4请求，并按IMAP4协议返回相应的信息。'},
            'LDA':{title:'LDA外域投递',subTitle:'投递代理，转发邮件到外域或投递邮件到本域。'},
            'SMTP':{title:'SMTP服务',subTitle:'在因特网和Coremail邮件系统间传输邮件执行的SMTP协议。'},
            'MX':{title:'MX服务',subTitle:'邮件交换记录，它指向一个邮件服务器，用于电子邮件系统发邮件时根据 收信人的地址后缀来定位邮件服务器。'},
            'RDA':{title:'RDA本域投递服务',subTitle:'指投递邮件到本域的投递代理。'},
            'MD':{title:'MD用户路由',subTitle:'Meta Data Srv(MD)，提供元数据管理服务，包括分区路由信息、邮箱基本属性（组织、部门、域名、COS）和邮件组信息。如根据分区策略确定注册用户分区，根据UIN(用户标识号)查询所处分区。'},
            'SP':{title:'SP身份认证',subTitle:'Session & Profile Srv(SP)，管理用户基本属性（UIN、用户名、加密密码、别名、标签、邮件各类配置项等，管理登录会话）。'},
            'MI':{title:'MI服务',subTitle:'MI为Mail Index简称，主要负责存储邮件列表、邮件索引、附件索引。存储邮件列表包括主题、发件人、收件人、发信时间。邮件索引指向邮件文件系统中的具体的邮件文件；如果邮件包含附件，则还包括附件索引信息（附件数目、名称、大小、在邮件正文中的偏移量等）。'},
            'FTS':{title:'FTS服务',subTitle:'FTS服务是指全文检索模块，提供邮件正文和附件的全文搜索功能。主要监控FTS服务的运行情况，包括队列数、连接成功率及连接响应时间。'},
            'MS':{title:'MS服务',subTitle:'MS为Mail Storage简称，为APP、SMTPD/POPD、IMAPD、FTS提供存储、获取和删除邮件文件的能力接口，存储海量邮件，包括附件。'}
        },
        getParam:function(){
            var me = this,
                param = {},
                operDesc,operator,startTime,endTime;

            operDesc = util.getVal('.retrieval-con input[name=operDesc]');
            if(operDesc != ''){
                param.operDesc = operDesc;
            }

            operator = util.getVal('.retrieval-con input[name=realName]');
            if(operator != ''){
                param.operator = operator;
            }

            startTime = util.getVal('.retrieval-con input[name=startTime]');
            if(startTime != ''){
                param.startTime = startTime;
            }

            endTime = util.getVal('.retrieval-con input[name=endTime]');
            if(endTime != ''){
                param.endTime = endTime;
            }

            if(!util.compareTimeValid(startTime,endTime))
                return null;

            return param;
        }
    });

    return {view:view};
});