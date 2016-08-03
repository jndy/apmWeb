/*用户权限*/
exports.permissionCJ = ["HOME_PAGE","HOME_SERVICE_INFO","HOME_SMS_COUNT","SMS_MANAGEMENT","SMS_SENT","SMS_SENT_RECORD","SMS_TEMPLATES","SMS_RECEIVE","MMS_MANAGEMENT","MMS_SENT","MMS_SENT_RECORD","MMS_RECEIVE","DATA_MANAGEMENT","DATA_MANAGEMENT_ALL","DATA_MANAGEMENT_SELF","SYS_MANAGEMENT","USER_MANAGEMENT","USER_MANAGEMENT_XT","USER_MANAGEMENT_PT","ROLE_MANAGEMENT","ROLE_MANAGEMENT_EDIT","TASK_MANAGEMENT","CONTACT_MANAGEMENT","CONTACT_MANAGEMENT_VIEW","CONTACT_MANAGEMENT_EDIT","PIPE_MANAGEMENT","LOG_MANAGEMENT","LOG_MANAGEMENT_VIEW","LOG_MANAGEMENT_EXPORT","NOTICE_MANAGEMENT","NOTICE_MANAGEMENT_VIEW","NOTICE_MANAGEMENT_EDIT","MONITORING_MANAGEMENT","MONITORING_SMS","MONITORING_SERVICE","MONITORING_DATA","SYS_CONFIG","BLACK_MANAGEMENT"];
exports.permissionXT = ["HOME_PAGE","HOME_SERVICE_INFO","HOME_SMS_COUNT","SMS_MANAGEMENT","SMS_SENT","SMS_SENT_RECORD","SMS_TEMPLATES","SMS_RECEIVE","MMS_MANAGEMENT","MMS_SENT","MMS_SENT_RECORD","MMS_RECEIVE","DATA_MANAGEMENT","DATA_MANAGEMENT_ALL","DATA_MANAGEMENT_SELF","SYS_MANAGEMENT","USER_MANAGEMENT","USER_MANAGEMENT_PT","ROLE_MANAGEMENT","ROLE_MANAGEMENT_EDIT","CONTACT_MANAGEMENT","CONTACT_MANAGEMENT_VIEW","CONTACT_MANAGEMENT_EDIT","PIPE_MANAGEMENT","LOG_MANAGEMENT","LOG_MANAGEMENT_VIEW","LOG_MANAGEMENT_EXPORT","NOTICE_MANAGEMENT","NOTICE_MANAGEMENT_VIEW","NOTICE_MANAGEMENT_EDIT","MONITORING_MANAGEMENT","MONITORING_SMS","MONITORING_SERVICE","MONITORING_DATA","BLACK_MANAGEMENT"];
exports.permissionPT = ["HOME_PAGE","HOME_SERVICE_INFO","HOME_SMS_COUNT","SMS_MANAGEMENT","SMS_SENT","SMS_SENT_RECORD","SMS_RECEIVE","MMS_MANAGEMENT","MMS_SENT","MMS_SENT_RECORD","MMS_RECEIVE","DATA_MANAGEMENT","DATA_MANAGEMENT_SELF","SYS_MANAGEMENT","CONTACT_MANAGEMENT","CONTACT_MANAGEMENT_VIEW","LOG_MANAGEMENT","LOG_MANAGEMENT_VIEW","LOG_MANAGEMENT_EXPORT","NOTICE_MANAGEMENT","NOTICE_MANAGEMENT_VIEW","MONITORING_MANAGEMENT","MONITORING_SMS","MONITORING_SERVICE","MONITORING_DATA"];

/*公司列表*/
exports.companyList = [
	{"comDesc":"南方电网测试数据","comId":1,"comName":"南方电网公司","createTime":"2016-05-22 15:34:02","isDel":0,"packId":1, "packName":"套餐一", "smsTotal": 10000, "mmsTotal":5000, "smsRemain": 20000, "mmsRemain": 10000, "mobileSmsTotal":20000,"unicomSmsTotal":30000,"telcomSmsTotal":4000,"mobileMmsTotal":5000,"unicomMmsTotal":8000,"telcomMmsTotal":1000,"mobileSmsRemain":20000,"unicomSmsRemain":30000,"telcomSmsRemain":4000,"mobileMmsRemain":5000,"unicomMmsRemain":8000,"telcomMmsRemain":1000},
	{"comDesc":"深圳电网测试数据","comId":2,"comName":"深圳电网公司","createTime":"2016-05-22 17:13:58","isDel":0,"packId":1, "packName":"套餐二", "smsTotal": 12000, "mmsTotal":6000, "smsRemain": 18000, "mmsRemain": 9000, "mobileSmsTotal":20000,"unicomSmsTotal":30000,"telcomSmsTotal":4000,"mobileMmsTotal":5000,"unicomMmsTotal":8000,"telcomMmsTotal":1000,"mobileSmsRemain":20000,"unicomSmsRemain":30000,"telcomSmsRemain":4000,"mobileMmsRemain":5000,"unicomMmsRemain":8000,"telcomMmsRemain":1000},
	{"comDesc":"广东电网测试数据","comId":3,"comName":"广东电网公司","createTime":"2016-05-22 17:13:58","isDel":0,"packId":1, "packName":"套餐二", "smsTotal": 12000, "mmsTotal":6000, "smsRemain": 18000, "mmsRemain": 9000, "mobileSmsTotal":20000,"unicomSmsTotal":30000,"telcomSmsTotal":4000,"mobileMmsTotal":5000,"unicomMmsTotal":8000,"telcomMmsTotal":1000,"mobileSmsRemain":20000,"unicomSmsRemain":30000,"telcomSmsRemain":4000,"mobileMmsRemain":5000,"unicomMmsRemain":8000,"telcomMmsRemain":1000}
];

/*测试数据*/
exports.users = [
  {userId: 1, vendorId: 1, userName: '张三', email: 'zhangsan@sina.com', phone: '12345678', mobile: '12345678', status: 1, version: 12},
  {userId: 2, vendorId: 1, userName: '李四', email: 'lisi@sina.com', phone: '12345678', mobile: '12345678', status: 1, version: 12},
  {userId: 3, vendorId: 1, userName: '王五', email: 'wangwu@sina.com', phone: '12345678', mobile: '12345678', status: 0, version: 12}
];

/*用户服务质量监控点列表数据*/
exports.userServiceQuality = [
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "SMTP登录", "itemTypeId" : "1", "alarmStatus" : 5, "pointOrder" : 1, "itemDescription" : "对通过SMTP协议登录邮箱的质量进行监控，包括SMTP登录成功率、登录用时。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "SMTP发邮件", "itemTypeId" : "2", "alarmStatus" : 5, "pointOrder" : 1, "itemDescription" : "对SMTP发邮件情况进行监控，包括邮件发送成功率、邮件发送用时。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "POP登录", "itemTypeId" : "3", "alarmStatus" : 5, "pointOrder" : 1, "itemDescription" : "对通过POP协议登录邮箱的质量进行监控，包括POP登录成功率、登录用时。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "POP收邮件", "itemTypeId" : "4", "alarmStatus" : 1, "pointOrder" : 1, "itemDescription" : "对通过POP协议收邮件的情况进行监控，包括邮件收送成功率、邮件收送用时和收邮件用时分布状况监控。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "IMAP登录", "itemTypeId" : "5", "alarmStatus" : 2, "pointOrder" : 1, "itemDescription" : "对通过IMAP协议登录邮箱的质量进行监控，包括IMAP登录成功率、登录用时。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "IMAP收邮件", "itemTypeId" : "6", "alarmStatus" : 3, "pointOrder" : 1, "itemDescription" : "对通过IMAP协议收取邮件的情况进行监控，包括邮件收取成功率、邮件接收用时和收邮件用时分布状况监控。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "通讯录加载", "itemTypeId" : "7", "alarmStatus" : 5, "pointOrder" : 3, "itemDescription" : "对通讯录加载质量进行监控，包括整体通讯录加载成功率、通讯录加载用时及通讯录加载用时分布。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "通讯录查询", "itemTypeId" : "8", "alarmStatus" : 5, "pointOrder" : 3, "itemDescription" : "对通讯录查询功能进行监控，包括整体通讯录查询成功率、通讯录查询用时。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "邮件到达通知", "itemTypeId" : "9", "alarmStatus" : 4, "pointOrder" : 4, "itemDescription" : "对用户所接收的邮件到达通知短信质量进行监控，包括邮件到达通知发送成功率。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "Web邮箱登录", "itemTypeId" : "10", "alarmStatus" : 5, "pointOrder" : 5, "itemDescription" : "对Web邮箱登录质量进行监控，包括Web邮箱整体登录成功率、登录用时、登录人数。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "Web首页打开", "itemTypeId" : "11", "alarmStatus" : 5, "pointOrder" : 5, "itemDescription" : "对Web邮箱的首页打开质量进行监控，包括Web邮箱整体首页打开成功率、首页打开用时及首页打开用时分布。" }, 
    {"createTime" : null, "successRates" : 89.51, "avgSendTime" : 1671.11, "itemTypeName" : "Web写信打开", "itemTypeId" : "12", "alarmStatus" : 3, "pointOrder" : 6, "itemDescription" : "对Web邮箱的写信页打开质量进行监控，包括Web邮箱整体写信页打开成功率、写信页打开用时及写信页打开用时分布。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "Web收邮件", "itemTypeId" : "13", "alarmStatus" : 1, "pointOrder" : 6, "itemDescription" : "对用户打开Web收件箱列表的情况进行监控，包括邮件打开收件箱列表成功率、打开用时。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "Web发邮件", "itemTypeId" : "14", "alarmStatus" : 4, "pointOrder" : 6, "itemDescription" : "对Web邮箱发送邮件情况进行监控，包括邮件发送成功率、邮件发送用时、发邮件人数和发邮件用时分布状况监控。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "Web读邮件", "itemTypeId" : "15", "alarmStatus" : 4, "pointOrder" : 6, "itemDescription" : "对Web邮箱读取邮件情况进行监控，包括邮件读取成功率、邮件读取用时、读取邮件失败次数监控。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "附件上传", "itemTypeId" : "16", "alarmStatus" : 5, "pointOrder" : 7, "itemDescription" : "对附件上传质量进行监控，包括整体附件上传成功率、附件上传用时、附件上传用时分布。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "附件下载", "itemTypeId" : "17", "alarmStatus" : 2, "pointOrder" : 7, "itemDescription" : "对附件下载质量进行监控，包括整体附件下载成功率、附件下载用时及附件下载用时分布。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "网盘上传", "itemTypeId" : "18", "alarmStatus" : 5, "pointOrder" : 8, "itemDescription" : "网盘上传描述" }, 
    {"createTime" : null, "successRates" : 89.51, "avgSendTime" : 1671.11, "itemTypeName" : "网盘下载", "itemTypeId" : "19", "alarmStatus" : 3, "pointOrder" : 8, "itemDescription" : "网盘下载描述" }
];

/*用户服务质量监控点数据明细*/
exports.userServiceDetail = {
  "startTime" : "2016-07-12 09:25",
  "endTime" : "2016-07-13 09:25",
  "itemName" : "SMTP登录",
  "itemDescription" : "对通过SMTP协议登录邮箱的质量进行监控，包括SMTP登录成功率、登录用时",
  "listCount" : 25,
  "dataList" : [
    {"corpId" : 11,"name" : "北京","timeValue" : "2016-07-13 08:00","rate" : 100.0,"nums" : 89.0,"errorNums" : 2,"averageTime" : 401.21212,"createTime" : null,"respTime" : 21.0,"fileSize" : 0.0,"probeRate" : 0.0, "probeRespTime" : 0.0}, 
    {"corpId" : 12,"name" : "天津","timeValue" : "2016-07-13 08:00","rate" : 100.0,"nums" : 176.0,"errorNums" : 0.0,"averageTime" : 40.091,"createTime" : null,"respTime" : 25.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0}, 
    {"corpId" : 13,"name" : "上海","timeValue" : "2016-07-13 08:00","rate" : 95.0,"nums" : 176.0,"errorNums" : 42,"averageTime" : 89.09,"createTime" : null,"respTime" : 25.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0}, 
    {"corpId" : 14,"name" : "江苏","timeValue" : "2016-07-13 08:00","rate" : 89.0,"nums" : 176.0,"errorNums" : 0.0,"averageTime" : 42.09,"createTime" : null,"respTime" : 25.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0}, 
    {"corpId" : 15,"name" : "浙江","timeValue" : "2016-07-13 08:00","rate" : 87.0,"nums" : 17.0,"errorNums" : 0.0,"averageTime" : 223.09,"createTime" : null,"respTime" : 25.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0},
    {"corpId" : 16,"name" : "福建","timeValue" : "2016-07-13 08:00","rate" : 77.0,"nums" : 17.0,"errorNums" : 0.0,"averageTime" : 23.09,"createTime" : null,"respTime" : 25.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0},
    {"corpId" : 17,"name" : "安徽","timeValue" : "2016-07-13 08:00","rate" : 75.0,"nums" : 117.0,"errorNums" : 0.0,"averageTime" : 211.09,"createTime" : null,"respTime" : 25.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0},
    {"corpId" : 18,"name" : "山东","timeValue" : "2016-07-13 08:00","rate" : 70.0,"nums" : 17.0,"errorNums" : 0.0,"averageTime" : 23.09,"createTime" : null,"respTime" : 25.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0},
    {"corpId" : 19,"name" : "山西","timeValue" : "2016-07-13 08:00","rate" : 69.0,"nums" : 17.0,"errorNums" : 0.0,"averageTime" : 133.09,"createTime" : null,"respTime" : 25.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0},
    {"corpId" : 20,"name" : "内蒙古","timeValue" : "2016-07-13 08:00","rate" : 67.0,"nums" : 127.0,"errorNums" : 0.0,"averageTime" : 63.09,"createTime" : null,"respTime" : 25.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0},
  ]
};

/*用户质量监控错误分析*/
exports.userServiceErrors = {
  "startTime" : "2016-07-12 09:25",
  "dataList" : [
    {"corpId" : 0,"name" : "ANTISPAM邮件地址错误","rate" : 0.0,"nums" : 0.0,"errorNums" : 19.0,"averageTime" : 0.0,"createTime" : null,"respTime" : 0.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0},
    {"corpId" : 0,"name" : "SMTP服务异常","rate" : 0.0,"nums" : 0.0,"errorNums" : 12.0,"averageTime" : 0.0,"createTime" : null,"respTime" : 0.0,"fileSize" : 0.0,"probeRate" : 0.0,"probeRespTime" : 0.0}
  ],
  "endTime" : "2016-07-13 09:25"
};

/*业务拨测数据列表*/
exports.businessAnalasyList = {
  "startTime" : "2016-07-12 09:25",
  "dataList" : [
    {"createTime" : null,"userEmail" : "test@sgcc.com","corpId" : 12,"corpName" : "北京","itemTypeName" : "WEB发邮件","itemTypeId" : "21","testingNums": 11,"testingErrors": 4,"successRates": 10,"avgSendTime": 124,"maxSendTime": 1325},
    {"createTime" : null,"userEmail" : "test@sgcc.com","corpId" : 12,"corpName" : "北京","itemTypeName" : "WEB发邮件","itemTypeId" : "21","testingNums": 10,"testingErrors": 3,"successRates": 10,"avgSendTime": 124,"maxSendTime": 325},
    {"createTime" : null,"userEmail" : "test@sgcc.com","corpId" : 12,"corpName" : "北京","itemTypeName" : "WEB发邮件","itemTypeId" : "21","testingNums": 12,"testingErrors": 7,"successRates": 10,"avgSendTime": 124,"maxSendTime": 1825},
    {"createTime" : null,"userEmail" : "test@sgcc.com","corpId" : 12,"corpName" : "北京","itemTypeName" : "WEB发邮件","itemTypeId" : "21","testingNums": 10,"testingErrors": 4,"successRates": 10,"avgSendTime": 224,"maxSendTime": 825}
  ],
  "listCount" : 15,
  "endTime" : "2016-07-13 09:25"
};

/*拨测行为跟踪数据列表*/
exports.actionTraceList = {
  "startTime" : "2016-07-12 09:25",
  "dataList" : [
    {"createTime" : null,"userEmail" :  "test@sgcc.com","corpId" : 12,"corpName" : "北京","itemTypeName" : "WEB发邮件","itemTypeId" : "21","testingTime": "2016-07-13 17:00:00","testingStatus": "成功","responseTime": 124,"errorCode": "12321","errorDescription": "错误描述1"},
    {"createTime" : null,"userEmail" :  "test@sgcc.com","corpId" : 12,"corpName" : "北京","itemTypeName" : "WEB发邮件","itemTypeId" : "21","testingTime": "2016-07-13 17:00:00","testingStatus": "成功","responseTime": 114,"errorCode": "12321","errorDescription": "错误描述2"},
    {"createTime" : null,"userEmail" :  "test@sgcc.com","corpId" : 12,"corpName" : "北京","itemTypeName" : "WEB发邮件","itemTypeId" : "21","testingTime": "2016-07-13 17:00:00","testingStatus": "失败","responseTime": 1224,"errorCode": "12221","errorDescription": "错误描述3"},
    {"createTime" : null,"userEmail" :  "test@sgcc.com","corpId" : 12,"corpName" : "北京","itemTypeName" : "WEB发邮件","itemTypeId" : "21","testingTime": "2016-07-13 17:00:00","testingStatus": "成功","responseTime": 2124,"errorCode": "22321","errorDescription": "错误描述4"}
  ],
  "listCount" : 15,
  "endTime" : "2016-07-13 09:25"
};

/*拨测账户管理数据列表*/
exports.accountManageList = {
  "dataList" : [
    {"accountId" : 115, "createTime" : null,"userEmail": "test@sgcc.com","corpId" : 12,"corpName" : "北京","accountStatusId": "1","accountStatus": "运行中","testingLastTime": "2016-07-18 12:00:00","testingItems": "1,11,13,15,18,19","testingFrequency": "30"},
    {"accountId" : 125, "createTime" : null,"userEmail": "test@sgcc.com","corpId" : 12,"corpName" : "北京","accountStatusId": "1","accountStatus": "运行中","testingLastTime": "2016-07-18 12:00:00","testingItems": "1,11,13,15,18,19","testingFrequency": "30"},
    {"accountId" : 135, "createTime" : null,"userEmail": "test@sgcc.com","corpId" : 12,"corpName" : "北京","accountStatusId": "1","accountStatus": "运行中","testingLastTime": "2016-07-18 12:00:00","testingItems": "1,11,13,15,18,19","testingFrequency": "30"},
    {"accountId" : 145, "createTime" : null,"userEmail": "test@sgcc.com","corpId" : 12,"corpName" : "北京","accountStatusId": "1","accountStatus": "运行中","testingLastTime": "2016-07-18 12:00:00","testingItems": "1,11,13,15,18,19","testingFrequency": "30"}
  ],
  "listCount" : 15
};
/*拨测账户详情*/
exports.accountInfo = {"accountId" : 125, "createTime" : null, "userEmail" : "test@sgcc.com","corpId" : 8,"corpName" : "陕西", "accountStatusId": "0", "accountStatus": "运行中", "testingLastTime": "2016-07-18 12:00:00", "testingItems": "1,7,8,11,13,15,18,19", "testingFrequency": "40" }

/*归档用户服务质量监控点列表数据*/
exports.userArchivingQuality = [
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "Web登录", "itemTypeId" : "21", "alarmStatus" : 5, "pointOrder" : 1, "itemDescription" : "通过对Web登录邮箱的质量进行监控，包括SMTP登录成功率、登录用时。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "邮件归档", "itemTypeId" : "22", "alarmStatus" : 4, "pointOrder" : 1, "itemDescription" : "对邮件归档情况进行监控，包括邮件发送成功率、邮件发送用时。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "读邮件", "itemTypeId" : "23", "alarmStatus" : 5, "pointOrder" : 1, "itemDescription" : "通过对读邮件进行监控，包括POP登录成功率、登录用时。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "邮件检索", "itemTypeId" : "24", "alarmStatus" : 1, "pointOrder" : 1, "itemDescription" : "通过对邮件检索进行监控，包括邮件收送成功率、邮件收送用时和收邮件用时分布状况监控。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "邮件还原", "itemTypeId" : "25", "alarmStatus" : 2, "pointOrder" : 1, "itemDescription" : "通过对邮件还原进行监控，包括IMAP登录成功率、登录用时。" }, 
    {"createTime" : null, "successRates" : 99.52, "avgSendTime" : 221.27, "itemTypeName" : "存储空间", "itemTypeId" : "26", "alarmStatus" : 3, "pointOrder" : 1, "itemDescription" : "通过对存储空间进行监控，包括邮件收取成功率、邮件接收用时和收邮件用时分布状况监控。" }    
];

/*故障告警-告警配置列表*/
exports.configList = [
    {"id" : 19, "taskId" : 19, "rId" : null, "name" : "WebAPI服务", "mtype" : 2, "status" : 1, "alarmCondition" : "当页面5分钟平均交易时间大于3000ms时进行严重告警，超时比例大于30%时进行严重告警，交易成功率小于70%时进行严重告警，进程不存在时进行严重告警", "descp" : "", "lastmodifiedtime" : "2016-07-13 14:39:34", "userName" : "演示"}, 
    {"id" : 37, "taskId" : 37, "rId" : null, "name" : "通讯录查询", "mtype" : 1, "status" : 1, "alarmCondition" : "当页面5分钟平均成功率大于50%时进行严重告警，响应时间大于3000ms时进行严重告警", "descp" : "", "lastmodifiedtime" : "2016-07-13 14:37:51", "userName" : "演示"} 
];

/*故障告警-告警配置列表*/
exports.addConfigList = [
    {"id":1, "type":1, "typeName":"用户服务质量告警配置", "typeDesc":"对集中化邮件邮箱的各类核心业务指标进行监控，包括web邮箱登录、通讯录、短信、邮件收发加载速度及加载成功率等。"},
    {"id":2, "type":2, "typeName":"应用服务质量告警配置", "typeDesc":"应用服务质量是对邮箱应用服务提供监控服务，了解邮箱底层服务运行情况。"},
    {"id":3, "type":3, "typeName":"拨测服务告警配置", "typeDesc":"拨测服务是模拟用户重要业务行为对集中化邮件系统进行异地分布式自动化拨测，优先用户发现问题。"},
    {"id":4, "type":4, "typeName":"VIP监控告警配置", "typeDesc":"VIP用户监控是对VIP用户使用企业邮箱的过程进行监控服务，保障VIP用户使用邮箱的畅通。"}
];

/*故障告警-告警通知列表*/
exports.adviceList = [
  {"businessId" : 0, "id" : 1507, "mitId" : 113, "mitType" : 3, "mitName" : "IMAP登录", "reason" : "成功率为0%", "province" : 35, "provinceName" : "广东", "alarmStatus" : 3, "lastStateChange" : "2015-07-30 08:00:00", "updateTime" : "2015-07-30 15:20:00", "compareOper" : null, "alarmThreshold" : 0.0, "dealStatus" : 0, "createtime" : null, "errorNums" : null, "sendSMSNums" : 1, "sendMailNums" : 1, "indexId" : null, "noticeId" : 58, "taskConfId" : 49, "srvIp" : 0, "srvIpString" : null, "descp" : "", "ruleId" : 971, "alarmCondition" : "成功率小于50%时进行严重告警", "dealDescp" : null, "mit_way" : 0, "searchContent" : null, "currentPage" : 0, "totalPage" : 0, "pageSize" : 0, "totalRecord" : 0, "authToken" : null, "startTime" : null, "endTime" : null, "entityName" : ""}, 
  {"businessId" : 0, "id" : 1329, "mitId" : 22, "mitType" : 1, "mitName" : "附件下载", "reason" : "响应时间为29158.5ms", "province" : 9, "provinceName" : "西藏", "alarmStatus" : 3, "lastStateChange" : "2015-07-30 15:20:00", "updateTime" : "2015-07-30 15:20:00", "compareOper" : null, "alarmThreshold" : 0.0, "dealStatus" : 0, "createtime" : null, "errorNums" : null, "sendSMSNums" : 1, "sendMailNums" : 1, "indexId" : null, "noticeId" : 12, "taskConfId" : 3, "srvIp" : 0, "srvIpString" : null, "descp" : "", "ruleId" : 529, "alarmCondition" : "响应时间大于10000ms时进行严重告警", "dealDescp" : "111", "mit_way" : 0, "searchContent" : null, "currentPage" : 0, "totalPage" : 0, "pageSize" : 0, "totalRecord" : 0, "authToken" : null, "startTime" : null, "endTime" : null, "entityName" : ""}
];
/*故障告警-告警详情*/
exports.getAdviceDetail = {"id": 22, "name": "test_运维工程师", "email": "w3523535@werwe.com", "phone": "12345344465", "createtime": "2015-11-30 14:43:42", "updatetime": "2015-12-08 11:20:45", smsCCount:1, emailCount:1, "rname": null}

/*故障告警-告警历史列表*/
exports.historyList = [
  {"businessId" : 0, "id" : 1507, "mitId" : 113, "mitType" : 3, "mitName" : "IMAP登录", "reason" : "成功率为0%", "province" : 35, "provinceName" : "广东", "alarmStatus" : 3, "lastStateChange" : "2015-07-30 08:00:00", "updateTime" : "2015-07-30 15:20:00", "compareOper" : null, "alarmThreshold" : 0.0, "dealStatus" : 0, "createtime" : null, "errorNums" : null, "sendSMSNums" : 1, "sendMailNums" : 1, "indexId" : null, "noticeId" : 58, "taskConfId" : 49, "srvIp" : 0, "srvIpString" : null, "descp" : "", "ruleId" : 971, "alarmCondition" : "成功率小于50%时进行严重告警", "dealDescp" : null, "mit_way" : 0, "searchContent" : null, "currentPage" : 0, "totalPage" : 0, "pageSize" : 0, "totalRecord" : 0, "authToken" : null, "startTime" : null, "endTime" : null, "entityName" : ""}, 
  {"businessId" : 0, "id" : 1329, "mitId" : 22, "mitType" : 1, "mitName" : "附件下载", "reason" : "响应时间为29158.5ms", "province" : 9, "provinceName" : "西藏", "alarmStatus" : 3, "lastStateChange" : "2015-07-30 15:20:00", "updateTime" : "2015-07-30 15:20:00", "compareOper" : null, "alarmThreshold" : 0.0, "dealStatus" : 0, "createtime" : null, "errorNums" : null, "sendSMSNums" : 1, "sendMailNums" : 1, "indexId" : null, "noticeId" : 12, "taskConfId" : 3, "srvIp" : 0, "srvIpString" : null, "descp" : "", "ruleId" : 529, "alarmCondition" : "响应时间大于10000ms时进行严重告警", "dealDescp" : "111", "mit_way" : 0, "searchContent" : null, "currentPage" : 0, "totalPage" : 0, "pageSize" : 0, "totalRecord" : 0, "authToken" : null, "startTime" : null, "endTime" : null, "entityName" : ""}
];

/*故障告警-监控点列表*/
exports.monitorList = [
  {"id": 38, "type": 1, "name": "smtp登录"},
  {"id": 39, "type": 1, "name": "smtp发邮件"},
  {"id": 40, "type": 1, "name": "pop收邮件"},
  {"id": 41, "type": 1, "name": "imap登录"}
];

/*故障告警-告警规则*/
exports.configRuleList = [
  {"ruleId":3,"ruleName":"交易时间",ruleCondition:{serious_1:"<5000",serious_2:"<5000",serious_3:">6000",unit:'ms'}},
  {"ruleId":4,"ruleName":"成功率",ruleCondition:{serious_1:">90",serious_2:"<88",unit:'ms',serious_3:"<56",unit:'%'}}
];

/*故障告警-选中通知人*/
exports.notifiers = [
  {id:1,userName:"aaa",userRealName:"aaaccc",roleName:'管理员',userPhone:'1111'},
  {id:1,userName:"bbb",userRealName:"aaaddd",roleName:'管理员',userPhone:'1111'},
  {id:1,userName:"ddd",userRealName:"aaaiii",roleName:'管理员',userPhone:'1111'},
  {id:1,userName:"ccc",userRealName:"aaadddccc",roleName:'管理员',userPhone:'1111'},
  {id:1,userName:"eee",userRealName:"aaaffff",roleName:'管理员',userPhone:'1111'},
  {id:1,userName:"ggg",userRealName:"aaaffff",roleName:'管理员',userPhone:'1111'}
];

////VIP保障

/*VIP保障-VIP用户体验跟踪*/
exports.getVipExpList = [
  {id:1, operTime:"2015-07-21", mitName:"邮件到达", respTime:"2015-06-22", status:1, account:"admin", userName:"管理员", province:"广东", respCode:1 ,errorDesc:"邮件到达时间太久"}
];

/*VIP保障-VIP用户问题跟踪*/
exports.getVipQuesList = [
  {id:1, province:"广东", account:"admin", userName:"管理员", vipLevel:"VIP等级", mitName:"邮件到达率", errorType:1, respTime:"2015-06-22", respCode:1, errorDesc:"响应时间慢",operTime:"2015-06-11"}
];

/*VIP保障-VIP服务质量*/
exports.getVipQualityList = [
  {id:1, statisticsTime:"2015-03-21", statisticsWay:"周期", mitName:"邮件提醒", vipCounts:"111", statisticsCount:22, successCounts:1, errorCounts:2, successRate:"80", respTime:"2014-05-20"}
];

/*VIP保障-VIP用户列表*/
exports.getVipUserList = [
  {id:1, province:"广东", account:20, userName:"admin", vipLevel:"VIP等级", status:2, updateTime:"2015-03-22"}
];
