/**
 * expand.js
 * usage: 扩充原生js原型
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('expand',function(require,exports,module){
    /**
     * 字符串简单模板函数
     * @returns {*}
     */
    String.prototype.format = function(){
        if (arguments.length>0) {
            var result = this;
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    var reg=new RegExp ("({"+key+"})","g");
                    result = result.replace(reg, args[key]);
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    var reg=new RegExp ("({["+i+"]})","g");
                    result = result.replace(reg, arguments[i]||'');
                }
            }
            return result;
        }
        else {
            return this;
        }
    };

    /**
     * 日期字符串格式化日期输出
     * @param fmt
     * @returns {*}
     */
    String.prototype.str2date = function(fmt){
        var ndt = new Date(this.replace(/-/g, "/"));
        return ndt.Format(fmt);
    };

    /**
     * Date格式化字符串函数
     * @param fmt
     * @returns {*}
     * @constructor
     */
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    /**
     * Date格式化字符串函数（进阶版）
     * @param fmt
     * @returns {*}
     */
    Date.prototype.pattern=function(fmt) {
        var o = {
            "M+" : this.getMonth()+1, //月份
            "d+" : this.getDate(), //日
            "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
            "H+" : this.getHours(), //小时
            "m+" : this.getMinutes(), //分
            "s+" : this.getSeconds(), //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S" : this.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "/u65e5",
            "1" : "/u4e00",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
        };
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    };

    /**
     * 日期计算：支持负数，即可加可减，返回计算后的日期
     * num：必选，必须是数字，且正数是时期加，负数是日期减
     * field：可选，标识是在哪个字段上进行相加或相减，字段见如下的约定。无此参数时，默认为d
     * 约定如下格式：
     * （1）Y/y 年

     * （2）M 月
     * （3）W/w 周
     * （4）D/d 日
     * （5）H/h 时
     * （6）m 分
     * （7）S/s 秒
     * （8）Q/q 季
     */
    Date.prototype.add = function(num, field){
        if((!num)||isNaN(num)||parseInt(num)==0){
            return this;
        }
        if(!field){
            field = "d";
        }
        switch(field){
            case 'Y':
            case 'y':return new Date((this.getFullYear()+num), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());break;
            case 'Q':
            case 'q':return new Date(this.getFullYear(), (this.getMonth()+num*3), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());break;
            case 'M':return new Date(this.getFullYear(), this.getMonth()+num, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());break;
            case 'W':
            case 'w':return new Date(Date.parse(this) + ((86400000 * 7) * num));break;
            case 'D':
            case 'd':return new Date(Date.parse(this) + (86400000 * num));break;
            case 'H':
            case 'h':return new Date(Date.parse(this) + (3600000 * num));break;
            case 'm':return new Date(Date.parse(this) + (60000 * num));break;
            case 'S':
            case 's':return new Date(Date.parse(this) + (1000 * num));break;
            default: return this;
        }
        return this;
    };

    /**
     * 获取某天零点，比如2016-06-06 00:00:00
     * @returns {Date}
     */
    Date.prototype.Today = function(){
        var todayStr = new Date().Format('yyyy/MM/dd')+' 00:00:00';
        return new Date(todayStr);
    };

    /**
     * 扩充IE8不支持indexOf方法
     * @returns {elt}
     */
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0) from += len;
            for (; from < len; from++) {
                if (from in this && this[from] === elt) return from;
            }
            return - 1;
        };
    }
});