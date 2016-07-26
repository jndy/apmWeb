var express = require('express');
var bodyParser = require('body-parser');
var app = express()
    , fixtures = require('./fixtures'),
    appService = require('./appServiceData');

var server = require('http').createServer(app);
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

//allow custom header and CORS
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
        /*让options请求快速返回*/
    }
    else {
        next();
    }
});

// 对网站首页的访问返回 "Hello World!" 字样
app.get('/apm/', function (req, res) {
    res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/apm/', function (req, res) {
    res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/apm/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/apm/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});

var server = app.listen(19000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

//测试GET数据
app.get('/apm/getList', function (req, res) {
    res.send(fixtures.users);
});

/*用户登录*/
app.post('/apm/login.do', function (req, res) {
    var response;
    var userName = req.body.userName;
    if (userName == 'admin') {
        response = {'code': 'S_OK', 'errorCode': '', 'msg': 'success', 'var': {'powerList': fixtures.permissionCJ, 'userId': '1', "userName": userName, 'userRealName': '超级管理员', isSuperAdmin: true, needModPwd: 0, sid: '1457asd45asd45asd8dasdas'}};
    } else if (userName == 'system') {
        response = {'code': 'S_OK', 'errorCode': '', 'msg': 'success', 'var': {'powerList': fixtures.permissionXT, 'userId': '2', "userName": userName, 'userRealName': '系统管理员', isSuperAdmin: false, needModPwd: 1, sid: '1457asd45asd45asd8dasdas'}};
    } else if (userName == 'user') {
        response = {'code': 'S_OK', 'errorCode': '', 'msg': 'success', 'var': {'powerList': fixtures.permissionPT, 'userId': '3', "userName": userName, 'userRealName': '测试用户', isSuperAdmin: false, needModPwd: 0, sid: '1457asd45asd45asd8dasdas'}};
    } else {
        response = {'code': 'FAIL', 'errorCode': 'err_007', 'msg': 'account forbid login', 'var': {'powerList': [], isSuperAdmin: false, needModPwd: 0, sid: ''}};
    }
    // console.log(response);
    // console.log(req.params);
    // console.log(req.query);
    // console.log(req.body);
    res.send(response);
});

/*用户注销*/
app.post('/apm/logout.do', function (req, res) {
    res.send({'code': 'S_OK', 'errorCode': '', 'msg': '用户注销成功'});
});

/*导入联系人*/
app.post('/apm/uploadSmsAddr.do', function (req, res) {
    res.send({"code": "S_OK", "errorCode": "", "msg": "导入联系人成功", "var": { "addrList": fixtures.exportAddrList}});
});

/*请求数据接口*/
app.post('/apm/data.do', function (req, res) {
    // console.log(req.params);
    //console.log(req.query);
    // console.log(req.body);
    var response = '';
    switch (req.query.func) {
        case 'user:addUser': //添加用户
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '添加用户成功'};
            break;
        case 'company:getCompanyList'://获取公司列表
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '公司列表', "var": {'listCount': 5, 'companyList': fixtures.companyList}};
            break;
        case 'service:getUserServiceQuality':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '用户服务质量', "var": {'startTime': '07月12日17:00:00', 'endTime': '17:04:59', 'dataList': fixtures.userServiceQuality}};
            break;
        case 'service:getUserServiceDetail':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '用户服务质量明细', "var": fixtures.userServiceDetail};
            break;
        case 'service:getUserServiceErrors':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '用户服务质量错误明细', "var": fixtures.userServiceErrors};
            break;
        case 'business:getDataAnalasyList':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '业务拨测数据', "var": fixtures.businessAnalasyList};
            break;
        case 'business:getActionTraceList':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '拨测行为跟踪', "var": fixtures.actionTraceList};
            break;
        case 'business:getAccountManageList':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '拨测账户管理', "var": fixtures.accountManageList};
            break;
        case 'business:getAccountInfo':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '操作成功', "var": fixtures.accountInfo};
            break;
        case 'business:editAccount':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '操作成功', "var": ""};
            break;
        case 'service:getUserArchivingQuality':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '用户服务质量', "var": {'startTime': '07月12日17:00:00', 'endTime': '17:04:59', 'dataList': fixtures.userArchivingQuality}};
            break;
        case 'alarm:configList':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '告警配置', "var": {'startTime': '07月12日17:00:00', 'endTime': '17:04:59', "current": 0, "retCode": 0, "listCount": 82, 'dataList': fixtures.configList}};
            break;
        case 'alarm:getConfigType':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '添加告警配置', "var": {'startTime': '07月12日17:00:00', 'endTime': '17:04:59', "current": 0, "retCode": 0, 'dataList': fixtures.addConfigList}};
            break;
        case 'alarm:advice':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '', "var": { "listCount": 82, 'dataList': fixtures.adviceList}};
            break;
    case 'alarm:getAdviceDetail':
    response = {'code': 'S_OK', 'errorCode': '', 'msg':'', "var": fixtures.getAdviceDetail};
    break;
        case 'alarm:history':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '告警历史', "var": {'startTime': '07月12日17:00:00', 'endTime': '17:04:59', "current": 0, "retCode": 0, "listCount": 82, 'dataList': fixtures.historyList}};
            break;
    case 'alarm:getNotifiers':
    response = {'code': 'S_OK', 'errorCode': '', 'msg':'', "var": {"listCount" : 40, 'dataList': fixtures.notifiers}};
    break;
        case 'alarm:getMonitor':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '', "var": {'dataList': fixtures.monitorList}};
            break;
        case 'alarm:getConfigRule':
            response = {'code': 'S_OK', 'errorCode': '', 'msg': '', "var": {"id": 19, "mit_name": "WebAPI服务", "mit_type": 2, 'alarmCondition': fixtures.configRuleList}};
            break;
        case 'service:getAllServiceQuality':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.appAllServiceList}
            break;
        case 'service:getServiceQuality':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.getServiceQuality}
            break;
        case 'service:getServiceDetailByChart':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.getServiceDetailByChart}
            break;
        case 'service:getServiceDetailByGrid':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.getServiceDetailByGrid}
            break;
        case 'service:getServerAndCmd':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.getServerAndCmd}
            break;
        case 'service:analyseServerFail':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.analyseServerFail}
            break;
        case 'actionlog:getActionLogList':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.analyseServerFail}
            break;
        case 'connect:getLoginAnalasyChart':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.chartData}
            break;
        case 'connect:getLoginAnalasyGrid':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.loginGridData}
            break;
        case 'connect:getSpamAnalasyList':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.chartData}
            break;
        case 'connect:getVirusAnalasyList':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.chartData}
            break;
        case 'connect:getExternalAnalasyChart':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.threeChartData}
            break;
        case 'connect:getExternalAnalasyGrid':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.mailGridData}
            break;
        case 'connect:getQualityAnalasyChart':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.threeChartData}
            break;
        case 'connect:getQualityAnalasyGrid':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": appService.qualityGridData}
            break;

        //VIP保障
        case 'vip:getVipExpList':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": {'dataList':fixtures.getVipExpList}}
            break;
        case 'vip:getVipQuesList':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": {'dataList':fixtures.getVipQuesList}}
            break;
        case 'vip:getVipQualityList':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": {'dataList':fixtures.getVipQualityList}}
            break;
        case 'vip:getVipUserList':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": {'dataList':fixtures.getVipUserList}}
            break;
        case 'vip:updateStatus':
            response = {"code": "S_OK", "errorCode": "", "msg": "", "var": {}}
            break;

        // case '':
        //   response =
        //   break;
        default:
            response = {'code': 'FAIL', 'errorCode': 'err_001', 'msg': 'interface does not exist'};
            break;
    }
    res.send(response);
});

