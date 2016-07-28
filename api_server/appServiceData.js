/*应用服务质量-全部服务级别*/
exports.appAllServiceList = [
    {serviceName:'MI',level:1},
    {serviceName:'VASP',level:2},
    {serviceName:'MS',level:3},
    {serviceName:'FTS',level:0},
    {serviceName:'LDA',level:4},
    {serviceName:'RDA',level:4},
];

exports.getServiceQuality = [
    {serverName:'sys-appsvr001',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300},
    {serverName:'sys-appsvr002',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300},
    {serverName:'sys-appsvr003',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300},
    {serverName:'sys-appsvr004',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300},
    {serverName:'sys-appsvr005',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300},
    {serverName:'sys-appsvr006',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300}
];

exports.analyseServerFail = {
    listCount:10,
    dataList:[
        {value:4,name:'邮件到达通知已关闭，不能发送 4个（40%）'},
        {value:5,name:'不在白名单中，不能发送 5个（50%）'},
        {value:1,name:'黑名单中，不能发送 1个（10%）'},
    ]
};

exports.getServerAndCmd = {
    servers:['sys-appsvr002','sys-appsvr003','sys-appsvr001','sys-appsvr007','sys-appsvr004','sys-appsvr005','sys-appsvr006'],
    cmds:['cmd1','cmd2','cmd3','cmd4','cmd5','cmd6']
};

exports.getServiceDetailByGrid = {
    listCount:5,
    dataList:[
        {serverName:'sys-appsvr001',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300,timeoutPercent:22,recordTime:+new Date()},
        {serverName:'sys-appsvr002',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300,timeoutPercent:22,recordTime:+new Date()},
        {serverName:'sys-appsvr003',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300,timeoutPercent:22,recordTime:+new Date()},
        {serverName:'sys-appsvr004',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300,timeoutPercent:22,recordTime:+new Date()},
        {serverName:'sys-appsvr005',connectCount:1000,requestCount:500,succPercent:100,failCount:100,connectTime:300,timeoutPercent:22,recordTime:+new Date()},
    ]
};

exports.getServiceDetailByChart = {
    xData:['07-01','07-02','07-03','07-04','07-05','07-06','07-07'],
    yData:[[100,200,300,150,250,350,50],[10,20,30,15,25,35,5],[200,20,110,50,50,550,250],]
};

exports.chartData = {
    xData:['07-01','07-02','07-03','07-04','07-05','07-06','07-07'],
    yData:[100,200,300,150,250,350,50]
};

exports.threeChartData = {
    xData:['07-01','07-02','07-03','07-04','07-05','07-06','07-07'],
    yData:[[100,200,300,150,250,350,50],[10,20,30,15,25,35,5],[200,20,110,50,50,550,250],]
};

exports.loginGridData = {
    listCount:3,
    dataList:[
        {loginIp:'192.169.1.1',loginAddress:'女厕所',loginCount:500},
        {loginIp:'192.169.1.2',loginAddress:'男厕所',loginCount:300},
        {loginIp:'192.169.1.3',loginAddress:'厨房',loginCount:400}
    ]
};

exports.qualityGridData = {
    listCount:3,
    dataList:[
        {corpName:'湖北',requestCountIn:50,failCountIn:50,timeoutIn:3,failPercentIn:33,requestCountOut:50,failCountOut:50,timeoutOut:3,failPercentOut:33,requestCountTotal:50,failCountTotal:50,timeoutTotal:3,failPercentTotal:33},
        {corpName:'湖南',requestCountIn:50,failCountIn:50,timeoutIn:3,failPercentIn:33,requestCountOut:50,failCountOut:50,timeoutOut:3,failPercentOut:33,requestCountTotal:50,failCountTotal:50,timeoutTotal:3,failPercentTotal:33},
        {corpName:'浙江',requestCountIn:50,failCountIn:50,timeoutIn:3,failPercentIn:33,requestCountOut:50,failCountOut:50,timeoutOut:3,failPercentOut:33,requestCountTotal:50,failCountTotal:50,timeoutTotal:3,failPercentTotal:33}
    ]
};

exports.mailGridData = {
    listCount:3,
    dataList:[
        {mail:'test@123.com',count:50,succCount:50,failCount:3,succPercent:33,avgSendTime:50},
        {mail:'test@123.com',count:50,succCount:50,failCount:3,succPercent:33,avgSendTime:50},
        {mail:'test@123.com',count:50,succCount:50,failCount:3,succPercent:33,avgSendTime:50},
    ]
};

exports.mapData={
    totalDetail:{
        webNo:11,
        vipNo:22,
        smtpNo:33,
        pop3No:44,
        imapNo:55,
        sendNo:1000,
        receiveNo:2000
    },
    dataList:[
        [
            {name: '北京',value: 4, webNo:1, vipNo: 1, smtpNo: 1, pop3No: 1, imapNo: 1, alarmNo: [11, 22,33,44] },
            {name: '天津',value: 4 },
            {name: '上海',value: 4 },
            {name: '重庆',value: 4 },
            {name: '河北',value: 4 },
            {name: '河南',value: 4 },
            {name: '新疆',value: 4 },
            {name: '山西',value: 4 },
            {name: '贵州',value: 4 },
            {name: '广东',value: 4 },
            {name: '青海',value: 4 },
            {name: '西藏',value: 4 },
            {name: '四川',value: 4 },
            {name: '宁夏',value: 4 },
            {name: '海南',value: 4 },
            {name: '香港',value: 4 },
            {name: '澳门',value: 4 }
        ],
        [
            {name: '云南',value: 3 },
            {name: '辽宁',value: 3 },
            {name: '黑龙江',value: 3 },
            {name: '湖南',value: 3 },
            {name: '安徽',value: 3 },
            {name: '山东',value: 3 }
        ],
        [
            {name: '江苏',value: 2 },
            {name: '浙江',value: 2 },
            {name: '江西',value: 2 },
            {name: '湖北',value: 2 },
            {name: '广西',value: 2 },
            {name: '甘肃',value: 2 }
        ],
        [
            {name: '内蒙古',value: 1 },
            {name: '陕西',value: 1 },
            {name: '吉林',value: 1 },
            {name: '福建',value: 1 }
        ],
        [
            {name: '台湾',value: 0 }
        ]
    ]
}

