/**
 * menu.js
 * usage: web系统的功能导航菜单
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 */
define('menu',function(require,exports,module){
    var obj1,obj2,obj3,obj4,obj5,obj6,obj7,obj8;

    obj1 = {
        title:'主控台',
        func:'main',
        itemId:1,
        children:[]
    };

    obj2 = {
        title:'质量监控',
        func:'monitor',
        itemId:2,
        children:[{
            title:'用户服务质量',
            func:'userService',
            itemId:6,
            children:[]
        },{
            title:'应用服务质量',
            func:'appService',
            itemId:6,
            children:[]
        },{
            title:'归档用户服务质量',
            func:'userArchiving',
            itemId:6,
            children:[]
        }]
    };

    obj3 = {
        title:'故障告警',
        func:'alarm',
        itemId:3,
        children:[{
            title:'告警通知',
            func:'advice',
            itemId:6,
            children:[]
        },{
            title:'告警历史',
            func:'history',
            itemId:6,
            children:[]
        },{
            title:'告警配置列表',
            func:'configList',
            itemId:7,
            children:[]
        }]
    };

    obj4 = {
        title:'业务拨测',
        func:'business',
        itemId:4,
        children:[{
            title:'拨测数据分析',
            func:'dataAnalasy',
            itemId:6,
            children:[]
        },{
            title:'拨测行为跟踪',
            func:'actionTrace',
            itemId:6,
            children:[]
        },{
            title:'拨测账户管理',
            func:'accountManage',
            itemId:6,
            children:[]
        }]
    };

    obj5 = {
        title:'VIP保障',
        func:'vip',
        itemId:5,
        children:[{
            title:'VIP用户体验跟踪',
            func:'vipExp',
            itemId:6,
            children:[]
        },{
            title:'VIP用户问题跟踪',
            func:'vipQues',
            itemId:6,
            children:[]
        },{
            title:'VIP服务质量报告',
            func:'vipQuality',
            itemId:6,
            children:[]
        },{
            title:'VIP用户管理',
            func:'vipUserMgr',
            itemId:6,
            children:[]
        }]
    };

    obj6 = {
        title:'安全互通',
        func:'connect',
        itemId:6,
        children:[{
            title:'邮件安全监控',
            func:'safe',
            itemId:6,
            children:[{
                title:'恶意登录分析',
                func:'loginAnalysy',
                itemId:6,
                children:[]
            },{
                title:'垃圾邮件收发分析',
                func:'mailAnalysy',
                itemId:6,
                children:[]
            },{
                title:'病毒邮件分析',
                func:'virusAnalysy',
                itemId:6,
                children:[]
            }]
        },{
            title:'邮件互通质量',
            func:'quality',
            itemId:6,
            children:[{
                title:'外域发信分析',
                func:'sendAnalysy',
                itemId:6,
                children:[]
            },{
                title:'外域入信分析',
                func:'receiveAnalysy',
                itemId:6,
                children:[]
            }]
        },{
            title:'网络质量监控',
            func:'net',
            itemId:6,
            children:[]
        }]
    };

    obj7 = {
        title:'系统管理',
        func:'manage',
        itemId:7,
        children:[{
            title:'用户',
            func:'user',
            itemId:0,
            children:[]
        },{
            title:'登陆日志',
            func:'loginLog',
            itemId:0,
            children:[]
        },{
            title:'操作日志',
            func:'operLog',
            itemId:0,
            children:[]
        }]
    };

    obj8 = {
        title:'我的账户',
        func:'account',
        itemId:8,
        children:[]
    };

    var navMenu = [obj1,obj2,obj3,obj4,obj5,obj6,obj7,obj8];
    window.navMenu = navMenu;
    module.exports = navMenu;
});