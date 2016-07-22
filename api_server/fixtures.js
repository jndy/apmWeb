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
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "SMTP登录", "item_type_id" : "1", "alarm_status" : 0, "point_order" : 1, "item_description" : "对通过SMTP协议登录邮箱的质量进行监控，包括SMTP登录成功率、登录用时。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "SMTP发邮件", "item_type_id" : "2", "alarm_status" : 0, "point_order" : 1, "item_description" : "对SMTP发邮件情况进行监控，包括邮件发送成功率、邮件发送用时。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "POP登录", "item_type_id" : "3", "alarm_status" : 0, "point_order" : 1, "item_description" : "对通过POP协议登录邮箱的质量进行监控，包括POP登录成功率、登录用时。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "POP收邮件", "item_type_id" : "4", "alarm_status" : 1, "point_order" : 1, "item_description" : "对通过POP协议收邮件的情况进行监控，包括邮件收送成功率、邮件收送用时和收邮件用时分布状况监控。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "IMAP登录", "item_type_id" : "5", "alarm_status" : 2, "point_order" : 1, "item_description" : "对通过IMAP协议登录邮箱的质量进行监控，包括IMAP登录成功率、登录用时。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "IMAP收邮件", "item_type_id" : "6", "alarm_status" : 3, "point_order" : 1, "item_description" : "对通过IMAP协议收取邮件的情况进行监控，包括邮件收取成功率、邮件接收用时和收邮件用时分布状况监控。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "通讯录加载", "item_type_id" : "7", "alarm_status" : 0, "point_order" : 3, "item_description" : "对通讯录加载质量进行监控，包括整体通讯录加载成功率、通讯录加载用时及通讯录加载用时分布。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "通讯录查询", "item_type_id" : "8", "alarm_status" : 0, "point_order" : 3, "item_description" : "对通讯录查询功能进行监控，包括整体通讯录查询成功率、通讯录查询用时。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "邮件到达通知", "item_type_id" : "9", "alarm_status" : null, "point_order" : 4, "item_description" : "对用户所接收的邮件到达通知短信质量进行监控，包括邮件到达通知发送成功率。" }, 
	  {"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "Web邮箱登录", "item_type_id" : "10", "alarm_status" : 0, "point_order" : 5, "item_description" : "对Web邮箱登录质量进行监控，包括Web邮箱整体登录成功率、登录用时、登录人数。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "Web首页打开", "item_type_id" : "11", "alarm_status" : 0, "point_order" : 5, "item_description" : "对Web邮箱的首页打开质量进行监控，包括Web邮箱整体首页打开成功率、首页打开用时及首页打开用时分布。" }, 
  	{"createtime" : null, "success_rates" : 89.51, "avgsendtime" : 1671.11, "item_type_name" : "Web写信打开", "item_type_id" : "12", "alarm_status" : 3, "point_order" : 6, "item_description" : "对Web邮箱的写信页打开质量进行监控，包括Web邮箱整体写信页打开成功率、写信页打开用时及写信页打开用时分布。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "Web收邮件", "item_type_id" : "13", "alarm_status" : 1, "point_order" : 6, "item_description" : "对用户打开Web收件箱列表的情况进行监控，包括邮件打开收件箱列表成功率、打开用时。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "Web发邮件", "item_type_id" : "14", "alarm_status" : null, "point_order" : 6, "item_description" : "对Web邮箱发送邮件情况进行监控，包括邮件发送成功率、邮件发送用时、发邮件人数和发邮件用时分布状况监控。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "Web读邮件", "item_type_id" : "15", "alarm_status" : null, "point_order" : 6, "item_description" : "对Web邮箱读取邮件情况进行监控，包括邮件读取成功率、邮件读取用时、读取邮件失败次数监控。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "附件上传", "item_type_id" : "16", "alarm_status" : 0, "point_order" : 7, "item_description" : "对附件上传质量进行监控，包括整体附件上传成功率、附件上传用时、附件上传用时分布。" }, 
	  {"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "附件下载", "item_type_id" : "17", "alarm_status" : 2, "point_order" : 7, "item_description" : "对附件下载质量进行监控，包括整体附件下载成功率、附件下载用时及附件下载用时分布。" }, 
  	{"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "网盘上传", "item_type_id" : "18", "alarm_status" : 0, "point_order" : 8, "item_description" : "网盘上传描述" }, 
  	{"createtime" : null, "success_rates" : 89.51, "avgsendtime" : 1671.11, "item_type_name" : "网盘下载", "item_type_id" : "19", "alarm_status" : 3, "point_order" : 8, "item_description" : "网盘下载描述" }
];

/*用户服务质量监控点数据明细*/
exports.userServiceDetail = {
  "startTime" : "2016-07-12 09:25",
  "endTime" : "2016-07-13 09:25",
  "item_name" : "SMTP登录",
  "item_description" : "对通过SMTP协议登录邮箱的质量进行监控，包括SMTP登录成功率、登录用时",
  "listCount" : 25,
  "dataList" : [
    {"corp_id" : 11,"name" : "北京","time_value" : "2016-07-13 08:00","rate" : 100.0,"nums" : 89.0,"error_nums" : 2,"averagetime" : 401.2,"createtime" : null,"resp_time" : 21.0,"file_size" : 0.0,"probe_rate" : 0.0, "probe_resp_time" : 0.0}, 
    {"corp_id" : 12,"name" : "天津","time_value" : "2016-07-13 08:00","time_value" : "2016-07-13 08:00","rate" : 100.0,"nums" : 176.0,"error_nums" : 0.0,"averagetime" : 40.09,"createtime" : null,"resp_time" : 25.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0}, 
    {"corp_id" : 13,"name" : "上海","time_value" : "2016-07-13 08:00","rate" : 95.0,"nums" : 176.0,"error_nums" : 42,"averagetime" : 89.09,"createtime" : null,"resp_time" : 25.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0}, 
    {"corp_id" : 14,"name" : "江苏","time_value" : "2016-07-13 08:00","rate" : 89.0,"nums" : 176.0,"error_nums" : 0.0,"averagetime" : 42.09,"createtime" : null,"resp_time" : 25.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0}, 
    {"corp_id" : 15,"name" : "浙江","time_value" : "2016-07-13 08:00","rate" : 87.0,"nums" : 17.0,"error_nums" : 0.0,"averagetime" : 223.09,"createtime" : null,"resp_time" : 25.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0},
    {"corp_id" : 16,"name" : "福建","time_value" : "2016-07-13 08:00","rate" : 77.0,"nums" : 17.0,"error_nums" : 0.0,"averagetime" : 23.09,"createtime" : null,"resp_time" : 25.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0},
    {"corp_id" : 17,"name" : "安徽","time_value" : "2016-07-13 08:00","rate" : 75.0,"nums" : 117.0,"error_nums" : 0.0,"averagetime" : 211.09,"createtime" : null,"resp_time" : 25.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0},
    {"corp_id" : 18,"name" : "山东","time_value" : "2016-07-13 08:00","rate" : 70.0,"nums" : 17.0,"error_nums" : 0.0,"averagetime" : 23.09,"createtime" : null,"resp_time" : 25.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0},
    {"corp_id" : 19,"name" : "山西","time_value" : "2016-07-13 08:00","rate" : 69.0,"nums" : 17.0,"error_nums" : 0.0,"averagetime" : 133.09,"createtime" : null,"resp_time" : 25.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0},
    {"corp_id" : 20,"name" : "内蒙古","time_value" : "2016-07-13 08:00","rate" : 67.0,"nums" : 127.0,"error_nums" : 0.0,"averagetime" : 63.09,"createtime" : null,"resp_time" : 25.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0},
  ]
};

/*用户质量监控错误分析*/
exports.userServiceErrors = {
  "startTime" : "2016-07-12 09:25",
  "dataList" : [
    {"corp_id" : 0,"name" : "ANTISPAM邮件地址错误","rate" : 0.0,"nums" : 0.0,"error_nums" : 19.0,"averagetime" : 0.0,"createtime" : null,"resp_time" : 0.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0},
    {"corp_id" : 0,"name" : "SMTP服务异常","rate" : 0.0,"nums" : 0.0,"error_nums" : 12.0,"averagetime" : 0.0,"createtime" : null,"resp_time" : 0.0,"file_size" : 0.0,"probe_rate" : 0.0,"probe_resp_time" : 0.0}
  ],
  "endTime" : "2016-07-13 09:25"
};

/*业务拨测数据列表*/
exports.businessAnalasyList = {
  "startTime" : "2016-07-12 09:25",
  "dataList" : [
    {"createtime" : null,"user_email" : "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","item_type_name" : "WEB发邮件","item_type_id" : "21","testing_nums": 11,"testing_errors": 4,"success_rates": 10,"avgsendtime": 124,"maxsendtime": 1325},
    {"createtime" : null,"user_email" : "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","item_type_name" : "WEB发邮件","item_type_id" : "21","testing_nums": 10,"testing_errors": 3,"success_rates": 10,"avgsendtime": 124,"maxsendtime": 325},
    {"createtime" : null,"user_email" : "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","item_type_name" : "WEB发邮件","item_type_id" : "21","testing_nums": 12,"testing_errors": 7,"success_rates": 10,"avgsendtime": 124,"maxsendtime": 1825},
    {"createtime" : null,"user_email" : "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","item_type_name" : "WEB发邮件","item_type_id" : "21","testing_nums": 10,"testing_errors": 4,"success_rates": 10,"avgsendtime": 224,"maxsendtime": 825}
  ],
  "listCount" : 15,
  "endTime" : "2016-07-13 09:25"
};

/*拨测行为跟踪数据列表*/
exports.actionTraceList = {
  "startTime" : "2016-07-12 09:25",
  "dataList" : [
    {"createtime" : null,"user_email" :  "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","item_type_name" : "WEB发邮件","item_type_id" : "21","testing_time": "2016-07-13 17:00:00","testing_status": "成功","response_time": 124,"error_code": "12321","error_description": "错误描述1"},
    {"createtime" : null,"user_email" :  "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","item_type_name" : "WEB发邮件","item_type_id" : "21","testing_time": "2016-07-13 17:00:00","testing_status": "成功","response_time": 114,"error_code": "12321","error_description": "错误描述2"},
    {"createtime" : null,"user_email" :  "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","item_type_name" : "WEB发邮件","item_type_id" : "21","testing_time": "2016-07-13 17:00:00","testing_status": "失败","response_time": 1224,"error_code": "12221","error_description": "错误描述3"},
    {"createtime" : null,"user_email" :  "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","item_type_name" : "WEB发邮件","item_type_id" : "21","testing_time": "2016-07-13 17:00:00","testing_status": "成功","response_time": 2124,"error_code": "22321","error_description": "错误描述4"}
  ],
  "listCount" : 15,
  "endTime" : "2016-07-13 09:25"
};

/*拨测账户管理数据列表*/
exports.accountManageList = {
  "dataList" : [
    {"account_id" : 115, "createtime" : null,"user_email": "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","account_status_id": "0","account_status": "运行中","testing_lasttime": "2016-07-18 12:00:00","testing_items": "1,11,13,15,18,19","testing_frequency": "30"},
    {"account_id" : 125, "createtime" : null,"user_email": "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","account_status_id": "0","account_status": "运行中","testing_lasttime": "2016-07-18 12:00:00","testing_items": "1,11,13,15,18,19","testing_frequency": "30"},
    {"account_id" : 135, "createtime" : null,"user_email": "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","account_status_id": "0","account_status": "运行中","testing_lasttime": "2016-07-18 12:00:00","testing_items": "1,11,13,15,18,19","testing_frequency": "30"},
    {"account_id" : 145, "createtime" : null,"user_email": "test@sgcc.com","corp_id" : 12,"corp_name" : "北京","account_status_id": "0","account_status": "运行中","testing_lasttime": "2016-07-18 12:00:00","testing_items": "1,11,13,15,18,19","testing_frequency": "30"}
  ],
  "listCount" : 15
};
/*拨测账户详情*/
exports.accountInfo = {"account_id" : 125, "createtime" : null, "user_email" : "test@sgcc.com","corp_id" : 8,"corp_name" : "陕西", "account_status_id": "0", "account_status": "运行中", "testing_lasttime": "2016-07-18 12:00:00", "testing_items": "1,7,8,11,13,15,18,19", "testing_frequency": "40" }

/*归档用户服务质量监控点列表数据*/
exports.userArchivingQuality = [
    {"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "Web登录", "item_type_id" : "21", "alarm_status" : 0, "point_order" : 1, "item_description" : "通过对Web登录邮箱的质量进行监控，包括SMTP登录成功率、登录用时。" }, 
    {"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "邮件归档", "item_type_id" : "22", "alarm_status" : null, "point_order" : 1, "item_description" : "对邮件归档情况进行监控，包括邮件发送成功率、邮件发送用时。" }, 
    {"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "读邮件", "item_type_id" : "23", "alarm_status" : 0, "point_order" : 1, "item_description" : "通过对读邮件进行监控，包括POP登录成功率、登录用时。" }, 
    {"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "邮件检索", "item_type_id" : "24", "alarm_status" : 1, "point_order" : 1, "item_description" : "通过对邮件检索进行监控，包括邮件收送成功率、邮件收送用时和收邮件用时分布状况监控。" }, 
    {"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "邮件还原", "item_type_id" : "25", "alarm_status" : 2, "point_order" : 1, "item_description" : "通过对邮件还原进行监控，包括IMAP登录成功率、登录用时。" }, 
    {"createtime" : null, "success_rates" : 99.52, "avgsendtime" : 221.27, "item_type_name" : "存储空间", "item_type_id" : "26", "alarm_status" : 3, "point_order" : 1, "item_description" : "通过对存储空间进行监控，包括邮件收取成功率、邮件接收用时和收邮件用时分布状况监控。" }    
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
  {"businessId" : 0, "id" : 1507, "mit_id" : 113, "mit_type" : 3, "mit_name" : "IMAP登录", "reason" : "成功率为0%", "province" : 35, "provinceName" : "广东", "alarm_Status" : 3, "last_State_Change" : "2015-07-30 08:00:00", "last_Update" : "2015-07-30 15:20:00", "compare_Oper" : null, "alarm_Threshold" : 0.0, "deal_Status" : 0, "createtime" : null, "error_Nums" : null, "send_SMS_Nums" : 1, "send_Mail_Nums" : 1, "index_Id" : null, "notice_Id" : 58, "task_Conf_Id" : 49, "srv_ip" : 0, "srv_ip_string" : null, "descp" : "", "ruleId" : 971, "alarmCondition" : "成功率小于50%时进行严重告警", "dealDescp" : null, "mit_way" : 0, "searchContent" : null, "currentPage" : 0, "totalPage" : 0, "pageSize" : 0, "totalRecord" : 0, "authToken" : null, "searchStartDate" : null, "searchEndDate" : null, "entityName" : ""}, 
  {"businessId" : 0, "id" : 1329, "mit_id" : 22, "mit_type" : 1, "mit_name" : "附件下载", "reason" : "响应时间为29158.5ms", "province" : 9, "provinceName" : "西藏", "alarm_Status" : 3, "last_State_Change" : "2015-07-30 15:20:00", "last_Update" : "2015-07-30 15:20:00", "compare_Oper" : null, "alarm_Threshold" : 0.0, "deal_Status" : 0, "createtime" : null, "error_Nums" : null, "send_SMS_Nums" : 1, "send_Mail_Nums" : 1, "index_Id" : null, "notice_Id" : 12, "task_Conf_Id" : 3, "srv_ip" : 0, "srv_ip_string" : null, "descp" : "", "ruleId" : 529, "alarmCondition" : "响应时间大于10000ms时进行严重告警", "dealDescp" : "111", "mit_way" : 0, "searchContent" : null, "currentPage" : 0, "totalPage" : 0, "pageSize" : 0, "totalRecord" : 0, "authToken" : null, "searchStartDate" : null, "searchEndDate" : null, "entityName" : ""}
];
/*故障告警-告警详情*/
exports.getAdviceDetail = {"id": 22, "name": "test_运维工程师", "email": "w3523535@werwe.com", "phone": "12345344465", "createtime": "2015-11-30 14:43:42", "updatetime": "2015-12-08 11:20:45", sms_count:1, email_count:1, "rname": null}

/*故障告警-告警历史列表*/
exports.historyList = [
  {"businessId" : 0, "id" : 1507, "mit_id" : 113, "mit_type" : 3, "mit_name" : "IMAP登录", "reason" : "成功率为0%", "province" : 35, "provinceName" : "广东", "alarm_Status" : 3, "last_State_Change" : "2015-07-30 08:00:00", "last_Update" : "2015-07-30 15:20:00", "compare_Oper" : null, "alarm_Threshold" : 0.0, "deal_Status" : 0, "createtime" : null, "error_Nums" : null, "send_SMS_Nums" : 1, "send_Mail_Nums" : 1, "index_Id" : null, "notice_Id" : 58, "task_Conf_Id" : 49, "srv_ip" : 0, "srv_ip_string" : null, "descp" : "", "ruleId" : 971, "alarmCondition" : "成功率小于50%时进行严重告警", "dealDescp" : null, "mit_way" : 0, "searchContent" : null, "currentPage" : 0, "totalPage" : 0, "pageSize" : 0, "totalRecord" : 0, "authToken" : null, "searchStartDate" : null, "searchEndDate" : null, "entityName" : ""}, 
  {"businessId" : 0, "id" : 1329, "mit_id" : 22, "mit_type" : 1, "mit_name" : "附件下载", "reason" : "响应时间为29158.5ms", "province" : 9, "provinceName" : "西藏", "alarm_Status" : 3, "last_State_Change" : "2015-07-30 15:20:00", "last_Update" : "2015-07-30 15:20:00", "compare_Oper" : null, "alarm_Threshold" : 0.0, "deal_Status" : 0, "createtime" : null, "error_Nums" : null, "send_SMS_Nums" : 1, "send_Mail_Nums" : 1, "index_Id" : null, "notice_Id" : 12, "task_Conf_Id" : 3, "srv_ip" : 0, "srv_ip_string" : null, "descp" : "", "ruleId" : 529, "alarmCondition" : "响应时间大于10000ms时进行严重告警", "dealDescp" : "111", "mit_way" : 0, "searchContent" : null, "currentPage" : 0, "totalPage" : 0, "pageSize" : 0, "totalRecord" : 0, "authToken" : null, "searchStartDate" : null, "searchEndDate" : null, "entityName" : ""}
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
