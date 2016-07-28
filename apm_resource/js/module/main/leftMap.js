/**
 * leftMap.js
 * usage: 主控台-子视图
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('leftMap',function(require,exports,module){
    //type指视图的类型，1是用户体验概览，2是分布式拨测

    var createView = function(options){
        var view = Backbone.View.extend({
            el:'.map-chart',
            initialize:function(){
                this.render();
            },
            render:function(){
                this.$el.empty();
                var myChart = echarts.init(jQuery('.map-chart')[0]);
                var option = this.getMapOptions(options.type,options.data);
                myChart.setOption(option);
            },
            getMapOptions:function(type,data){
                var me = this,
                    options = {},
                    maxArr = [4,1],
                    legendArr = [['严重','较重','一般','正常','无数据'],['有数据','无数据']],
                    colorArr = [['#f47c7d','#f9ab00','#f0dc2d','#98ca69','#b2b2b2'],['#98ca69','#b2b2b2']],
                    series = this.getSeries(type,data);

                options = {
                    color:colorArr[type-1],
                    tooltip: {
                        trigger: 'item',
                        formatter:function(params){
                            var item = params.data,
                                name = item.name,
                                webNo = item.webNo || '--',
                                vipNo = item.vipNo || '--',
                                smtpNo = item.smptNo || '--',
                                pop3No = item.pop3No || '--',
                                imapNo = item.imapNo || '--';
                            var str =( '<b>{0}</b><br>WEB在线人数{1}<br>VIP在线人数{2}<br>SMTP在线人数{3}<br>'+
                                'POP3在线人数{4}<br>IMAP在线人数{5}<br>').format(name,webNo,vipNo,smtpNo,pop3No,imapNo);
                            return me.getFormatterTip(params);
                        }
                    },
                    legend: {
                        x : 'center',
                        y : 'top',
                        data:legendArr[type-1]
                    },
                    dataRange: {
                        show:false,
                        min: 0,
                        max: maxArr[type-1],
                        left: 'left',
                        top: 'bottom',
                        text: ['高','低'],           // 文本，默认为数值文本
                        calculable: true,
                        color:colorArr[type-1]
                    },
                    series:series
                };

                return options;
            },
            getSeries:function(type,data){
                var series = [],
                    legendArr = [['严重','较重','一般','正常','无数据'],['有数据','无数据']];

                for(var i = 0,l=legendArr[type-1].length;i<l;i++){
                    series.push({
                        name: legendArr[type-1][i],
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        showLegendSymbol:false,
                        data:data[i]
                    })
                }

                return series;
            },
            getFormatterTip:function(params){
                var item = params.data,
                    name = item.name,
                    webNo = item.webNo || '--',
                    vipNo = item.vipNo || '--',
                    smtpNo = item.smptNo || '--',
                    pop3No = item.pop3No || '--',
                    imapNo = item.imapNo || '--',
                    alarmArr = item.alarmNo || [];
                var str =( '<b>{0}</b><br>WEB在线{1}人<br>VIP在线{2}人<br>SMTP在线{3}人<br>'+
                    'POP3在线{4}人<br>IMAP在线{5}人').format(name,webNo,vipNo,smtpNo,pop3No,imapNo);

                for(var i = 0;i<alarmArr.length;i++){
                    var titleArr = ['<br>共有{0}项指标正常','<br>{0}项一般告警','<br>{0}项较重告警','<br>{0}项严重告警'];
                    if(alarmArr[i]!=0){
                        str += titleArr[i].format(alarmArr[i]);
                    }
                }

                return str;
            }
        });

        return new view();
    };
    return createView;
});