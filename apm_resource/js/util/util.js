/**
 * util.js
 * usage: 通用函数
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('util',function(require,exports,module){
    var util = {
        /**
         * ajax请求封装
         * @param options
         */
        request:function(options){
            var me = this;

            me.showMsg('正在请求数据，请稍后...');
            jQuery.ajax({
                type: options.type || 'POST',
                url: '/apm/'+options.url || "",
                data: JSON.stringify(options.param||{}),
                dataType: 'json',
                contentType: "text/javascript; charset=UTF-8",
                success: function(resp){
                    me.hideMsg();
                    if(resp.code == 'S_OK'){
                        if(options.fnSuc){
                            options.fnSuc(resp,1);
                        }
                        else{
                            me.showMsg(resp.msg);
                        }
                    }
                    else{
                        if(!!options.fnFail){
                            options.fnFail(resp);
                        }
                        else if(options.defaultFail === false){
                            var msg = resp.msg || options.url + '接口出错';
                            me.showMsg(msg,-1);
                        }
                    }
                },
                error: function(resp){
                    if(!!options.fnErr)
                        options.fnErr(resp);
                    else
                        me.showMsg(options.url + '接口出错',-1);
                }
            });
        },
        /**
         * 导出数据接口
         * @param options
         */
        exports:function(options){
            // 如果url不存在直接返回
            if(!options.url){
                return;
            }
            else{
                var openUrl = '/apm/'+options.url;
                for(var key in options.param){
                   openUrl = openUrl + "&" + key + "=" + options.param[key];
                }
                return window.open(openUrl);
            }
        },
        /**
         * 展示loading信息
         * @param msg 提示信息
         * @param type 展示类型 （-1,0,1）0是默认，分别展示错误、提示、正确的消息
         * @param autoHide 自动消失
         */
        showMsg:function(msg, type, autoHide){
            var tipDiv = jQuery('#tips'),
                type = type == undefined ? 0: type,
                cssArr = ['red','orange','green'];

            tipDiv.attr('class',cssArr[type+1]);
            tipDiv.html(msg);
            tipDiv.show();
            if(autoHide !== false){
                if(window.autoHideHandler){
                    clearTimeout(window.autoHideHandler)
                }
                window.autoHideHandler = setTimeout(function(){
                    tipDiv.hide();
                },2000);
            }
        },
        /**
         * 隐藏loading信息
         */
        hideMsg:function(){
            jQuery('#tips').hide();
            if(window.autoHideHandler){
                clearTimeout(window.autoHideHandler)
            }
        },
        /**
         * 获取某个输入组件的值
         * @param selector
         * @param type
         */
        getVal:function(selector,type){
            switch (type){
                case 'select':
                    return $(selector).attr('optionValue');
                default :
                    return $.trim($(selector).val());
            }
        },
        /**
         * ajax请求封装
         * @param selector
         * @param value
         * @param type
         */
        setVal:function(selector,value,type){
            switch (type){
                case 'select':
                    var dom = $(selector),
                        target = dom.next().next().find('a[optionValue={0}]'.format(value));

                    dom.attr('optionValue',value);
                    dom.text(target.text());
                    return;
                default :
                    return $(selector).val(value);
            }
        },
        /**
         * 正则式进行数据校验
         * @param str
         * @param type
         */
        validate:function(str,type){
            var result = true;
            var msg = '';
            switch (type){
                case 'phone':
                    if(!str.match(/^1[3|4|5|8][0-9]\d{4,8}$/)){
                        msg = '请输入正确的手机号码';
                        result = false;
                    }
                    break;
                case 'ip':
                    if(!str.match(/\d+\.\d+\.\d+\.\d+/)){
                        msg = '请输入正确的IP地址';
                        result = false;
                    }
                    break;
                case 'email':
                    if(!str.match(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)){
                        msg = '请输入正确的邮箱地址';
                        result = false;
                    }
                    break;
                case 'url':
                    if(!str.match(/[a-zA-z0-9]+(\.[a-zA-z0-9]{2,})+/)){
                        msg = '请输入正确的url地址';
                        result = false;
                    }
                    break;
                case 'chinese':
                    if(!str.match(/[\u4e00-\u9fa5]/)){
                        msg = '请输入中文字符';
                        result = false;
                    }
                    break;
                case 'zipcode':
                    if(!str.match(/[1-9]\d{5}(?!\d)/)){
                        msg = '请输入正确的邮政编码';
                        result = false;
                    }
                    break;
                case 'id':
                    if(!str.match(/\d{15}|\d{18}/)){
                        msg = '请输入正确的身份证号码';
                        result = false;
                    }
                    break;
                case 'qq':
                    if(!str.match(/[1-9][0-9]{4,}/)){
                        msg = '请输入正确的QQ号码';
                        result = false;
                    }
                    break;
                default :
                    break;
            }

            return {flag:result,msg:msg};
        },
        /**
         * 批量进行某个容器内的输入组件校验
         * @param selector
         */
        validateDiv:function(selector){
            var result = {
                flag:true,
                msg:''
            };
            var doms = $(selector).find('input:enabled');
            for(var i = 0;i<doms.length;i++){
                var dom = $(doms[i]),
                    label = dom.parent().prev().text().replace(/[：|*]/g,''),
                    value = $.trim(dom.val()),
                    requiredRule = dom.attr('data-required'),
                    formatRule = dom.attr('data-format'),
                    lenRule = dom.attr('data-len');

                if(!!requiredRule){
                    if(value == ''){
                        result.flag = false;
                        result.msg =label+ '不能为空';
                        break;
                    }
                }
                if(!!formatRule){
                    result = this.validate(value,formatRule);
                    if(!result.flag){
                        break;
                    }
                }
                if(!!lenRule){
                    var min = parseInt(lenRule.split(',')[0]);
                    var max = parseInt(lenRule.split(',')[1]);
                    var len = value.length;
                    if(!isNaN(min) && len < min){
                        result.flag = false;
                        result.msg = label +'的长度应该不能小于{0}'.format(min);
                        break;
                    }
                    if(!isNaN(max) && len > max){
                        result.flag = false;
                        result.msg = label +'的长度应该不能大于{0}'.format(max);
                        break;
                    }
                }
            }

            return result;
        },
        /**
         * 验证开始、结束时间合法性
         * @param st
         * @param et
         * @param allowEqual是否允许两者相等
         */
        compareTimeValid:function(st,et,allowEqual){
            if(st == '' || et == '')
                return true;

            var sd = +st,
                ed = +et;
            if(typeof(st) == 'string'){
                sd = +new Date(st.replace(/-/g, "/"));
                ed = +new Date(et.replace(/-/g, "/"));
            }

            if(allowEqual === false)
                return ed - sd > 0;
            else
                return ed - sd >= 0;
        },
        /**
         * dialog-confirm式封装
         * @param title
         * @param content
         * @param handler
         * @param cancelHandler
         */
        confirm:function(title,content,handler,cancelHandler){
            var d = dialog({
                id:'dialog_confirm',
                title:title,
                content:content,
                ok:handler,
                okValue: '确定',
                cancelValue:'取消',
                cancel:cancelHandler || function(){
                    return true;
                }
            });

            d.showModal();
        },
        /**
         * dialog-window式封装
         * @param title
         * @param content
         * @param handler
         * @param cancelHandler
         * @param config 额外配置项
         */
        dialog:function(title,content,handler,cancelHandler,config){
            var option = {
                id:'dialog_window',
                title:title,
                content:content,
                ok:handler,
                okValue: '确定',
                cancelValue:'取消',
                cancel:cancelHandler || function(){
                    return true;
                }
            };
            if(config && typeof(config) == 'object'){
                for(var item in config){
                    option[item] = config[item];
                }
            }
            var d = dialog(option);
            d.showModal();
            return d;
        },
        /**
         * 将普通的select批量转换为样式美观的下拉框
         */
        my_select:function () {
            $("select").each(function () {
                var that = $(this);
                var elName = that.attr('name') === undefined ? ' ': ' name="{0}"'.format(that.attr('name'));
                var widthCss = 'w' + (that.attr('widthNo')|| 150);

                if (that.parent(".module-select").length == 0) {
                    var select_wrap = $('<div active="false" class="module-select '+widthCss +'"></div>');
                    var $arrow = $('<a href="javascript:;" class="btn-select"><i class="i-select"></i></a>');
                    var $ul = $('<ul style="display: none;"></ul>');
                    var $li = "";
                    that.wrap(select_wrap);
                    var select_val = [];
                    var i = 0;
                    var len = that.find("option").length;
                    for (i; i < len; i++) {
                        select_val.push(that.find("option").eq(i).text());
                        $li += ("<li><a href='javascript:;' optionValue = '"+ that.find("option").eq(i).val() +"'>" + that.find("option").eq(i).text() + "</a></li>")
                    }
                    var $p = $("<span {0} optionValue='{1}'>".format(elName,that.find("option").eq(0).val()) + select_val[0] + "</span>");
                    that.parent(".module-select").append($p);
                    that.parent(".module-select").append($arrow);
                    that.parent(".module-select").append($ul);
                    that.parent(".module-select").find("ul").append($li)
                } else {
                    $(".module-select").off("click")
                }
                that.find("option").each(function () {
                    if ($(this).attr("selected") == "selected") {
                        var now_select_txt = $(this).text();
                        that.parent(".module-select").find("span").text(now_select_txt)
                    }
                })
            });
            $(".module-select").on("click",function (event) {
                var _this = $(this);
                var ulList = _this.find("ul");
                var ul_li = ulList.find("li");
                var p_txt = _this.find("span");

                $('.module-select ul:visible').each(function(index,item){
                    var selectItem = $(item);
                    if(selectItem.is(':visible') && !selectItem.is(ulList))
                        selectItem.slideToggle(100);
                });
                event.stopPropagation();
                ulList.slideToggle(100);
//                if ($(this).css("zIndex") == 888) {
//                    $(this).css("zIndex", 999)
//                } else {
//                    $(this).css("zIndex", 888)
//                }
                ul_li.off().on("click",function () {
                    var index = $(this).index();
                    p_txt.text($(this).text());
                    p_txt.attr('optionValue',$(this).find('a').attr('optionValue'));
                    _this.find("option").removeAttr("selected").eq(index).prop("selected", "selected");
                    _this.find("select").trigger("change");
                });
            });
        },
        /**
         * 将普通的radio批量转换为样式美观的单选框
         */
        my_radio:function (){
            $('input[type="radio"]').each(function () {
                var that = $(this);
                var radio_name = that.attr("name");
                var radio_wrap = that.parent(".my-radio");
                if (radio_wrap.length == 0) {
                    that.wrap('<div class="my-radio"></div>');
                    radio_wrap = that.parent(".my-radio");
                    radio_wrap.append("<i></i>")
                }
                if (that.prop("checked") == true) {
                    $('input:radio[name="' + radio_name + '"]').prop("checked", false).parent(".my-radio").removeClass("radio-on");
                    that.prop("checked", true);
                    radio_wrap.addClass("radio-on")
                }
                $('input:radio[checked="checked"]').parents(".my-radio").addClass("radio-on");
                radio_wrap.parent("label").off("click");
                radio_wrap.parent("label").on("click",
                    function () {
                        if (that.prop("checked") == false) {
                            var _this = radio_wrap;
                            $('input:radio[name="' + radio_name + '"]').prop("checked", false).parent(".my-radio").removeClass("radio-on");
                            _this.addClass("radio-on").find('input[type="radio"]').prop("checked", true)
                        }
                    })
            })
        },
        /**
         * 将普通的check批量转换为样式美观的复选框
         */
        my_check:function () {
            $('input[type="checkbox"]').each(function () {
                var that = $(this);
                var check_name = that.attr("name");
                var check_wrap = that.parent(".my-check");
                if (check_wrap.length == 0) {
                    that.wrap('<div class="my-check"></div>');
                    check_wrap = that.parent(".my-check");
                    check_wrap.append("<i></i>")
                }
                if (that.prop("checked") == true) {
                    check_wrap.addClass("check-on")
                } else {
                    check_wrap.removeClass("check-on")
                }
            });
            $(".my-check").off("click");
            $(".my-check").on("click",
                function () {
                    var $checkbox = $(this).find("input");
                    if ($checkbox.prop("checked") == true) {
                        $(this).addClass("check-on")
                    } else {
                        $(this).removeClass("check-on")
                    }
                })
        },
        /***
         *格式化字符串高级版，提供数组和object两种方式
         *@example
         *util.format("hello,{name}",{name:"kitty"})
         *util.format("hello,{0}",["kitty"])
         *@returns {String}
         */
        format_advanced: function (str, arr) {
            var reg;
            if ($.isArray(arr)) {
                reg = /\{([\d]+)\}/g;
            } else {
                reg = /\{([\w]+)\}/g;
            }
            return str.replace(reg, function ($0, $1) {
                var value = arr[$1];
                if (value !== undefined) {
                    return value;
                } else {
                    return "";
                }
            });
        },
        /**
         * 将URL请求参数转为JSON对象
         * @param url 
         * @return json obj
         */
        urlParamObj: function (url) {
          var reg_url = /^[^\?]+\?([\w\W]+)$/,
              reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
              arr_url = reg_url.exec(url),
              ret = {};
          if(arr_url && arr_url[1]){
            var str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
          }
          return ret;
         },
        /**
         * 生成下拉框options
         * @param  {[type]} obj 数据对象
         * @param  {[type]} key 对象key
         * @param  {[type]} val 对象val
         * @param  {[type]} all 是否显示全部
         * @return {[type]}     [description]
         */
        createOptions: function(obj,key,val,all){
            var optionHtml = "";
            key = key ? key : "key";
            val = val ? val : "val";
            $.each(obj, function(index, item){
                optionHtml += "<option value='"+item[val]+"'>"+item[key]+"</option>";
            })
            return optionHtml;
        },
        /**
         * 用于系统内部的模块跳转，支持A模块跳转到B模块B1功能的第N视图
         * @param url
         * @example uitl.jumpModule('alarm/configList?childView=addConfig')；
         */
        jumpModule:function(url){
            window.router.navigate(url,{trigger:false});
            window.router.loadModule();
        }
    };

    window.util = util;
});