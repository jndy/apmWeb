/**
 * leftMap.js
 * usage: 主控台-子视图
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('leftMap',function(require,exports,module){
    //type指视图的类型，0是用户体验概览，1是分布式拨测
    var series = [
        {
            name: '严重',
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
            data:[
                {name: '北京',value: 1 },
                {name: '天津',value: 1 },
                {name: '上海',value: 1 },
                {name: '重庆',value: 1 },
                {name: '河北',value: 1 },
                {name: '河南',value: 1 },
                {name: '新疆',value: 1 },
                {name: '山西',value: 1 },
                {name: '贵州',value: 1 },
                {name: '广东',value: 1 },
                {name: '青海',value: 1 },
                {name: '西藏',value: 1 },
                {name: '四川',value: 1 },
                {name: '宁夏',value: 1 },
                {name: '海南',value: 1 },
                {name: '香港',value: 1 },
                {name: '澳门',value: 1 }
            ]
        },
        {
            name: '较重',
            type: 'map',
            mapType: 'china',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            showLegendSymbol:false,
            data:[
                {name: '云南',value: 3 },
                {name: '辽宁',value: 3 },
                {name: '黑龙江',value: 3 },
                {name: '湖南',value: 3 },
                {name: '安徽',value: 3 },
                {name: '山东',value: 3 }
            ]
        },
        {
            name: '一般',
            type: 'map',
            mapType: 'china',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            showLegendSymbol:false,
            data:[
                {name: '江苏',value: 4 },
                {name: '浙江',value: 4 },
                {name: '江西',value: 4 },
                {name: '湖北',value: 4 },
                {name: '广西',value: 4 },
                {name: '甘肃',value: 4 }
            ]
        },
        {
            name: '正常',
            type: 'map',
            mapType: 'china',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            showLegendSymbol:false,
            data:[
                {name: '内蒙古',value: 5 },
                {name: '陕西',value: 5 },
                {name: '吉林',value: 5 },
                {name: '福建',value: 5 }
            ]
        },
        {
            name: '无数据',
            type: 'map',
            mapType: 'china',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            showLegendSymbol:false,
            data:[
                {name: '台湾',value: 2 }
            ]
        }
    ];
    var getMapOptions = function(type){
        var options = {};
        if(type == 1 ){
            options = {
                color:['#f47c7d','#f9ab00','#f0dc2d','#98ca69','#b2b2b2'],
                tooltip: {
                    trigger: 'item',
                    formatter:function(params){
                        // $.get('detail?name=' + params.name, function (content) {
                        //     callback(ticket, toHTML(content));
                        // });
                        return 'Loading';
                    }
                },
                legend: {
                    x : 'center',
                    y : 'top',
                    data:['严重','较重','一般','正常','无数据']
                },
                dataRange: {
                    show:false,
                    min: 0,
                    max: 5,
                    left: 'left',
                    top: 'bottom',
                    text: ['高','低'],           // 文本，默认为数值文本
                    calculable: true,
                    color:['#f47c7d','#f9ab00','#f0dc2d','#98ca69','#b2b2b2']
                },
                /*series: [
                    {
                        name: '严重',
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
                        data:[
                        ]
                    },
                    {
                        name: '较重',
                        type: 'map',
                        mapType: 'china',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        showLegendSymbol:false,
                        data:[
                        ]
                    },
                    {
                        name: '一般',
                        type: 'map',
                        mapType: 'china',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        showLegendSymbol:false,
                        data:[
                        ]
                    },
                    {
                        name: '正常',
                        type: 'map',
                        mapType: 'china',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[
                        ]
                    },
                    {
                        name: '无数据',
                        type: 'map',
                        mapType: 'china',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[
                        ]
                    }
                ],*/
                series:series
            };
        }
        else if(type == 2){
            options = {
                color:['#98ca69','#b2b2b2'],
                tooltip: {
                    trigger: 'item',
                    formatter:function(params){
                        // $.get('detail?name=' + params.name, function (content) {
                        //     callback(ticket, toHTML(content));
                        // });
                        return 'Loading';
                    }
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:['有数据','无数据']
                },
                series: [{
                    name: '有数据',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                    ]
                },{
                    name: '无数据',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                    ]
                }]
            };
        }
        return options;
    };

    var createView = function(type){
        var view = Backbone.View.extend({
            el:'.map-chart',
            initialize:function(){
                this.render();
            },
            render:function(){
                this.$el.empty();
                var myChart = echarts.init(jQuery('.map-chart')[0]);
                var options = getMapOptions(type);
                myChart.setOption(options);
            }
        });

        return new view();
    };
    return createView;
});