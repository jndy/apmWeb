/**
 * dateBar.js
 * usage: web系统的功能导航菜单
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-08
 * useing jQuery JavaScript frame v1.7+、expand.js（原型扩充）
 * you can use like this new dateBar({timeType:5})
 */
define('dateBar',function(){
    var dateBar = function(){
        var options = arguments[0] || {};
        this.options=options;
        this.timeType = 1;
        this.init();
    }

    dateBar.prototype = {
        init:function(){
            var me = this,
                options = me.options;

            me.render();
            me.addEvents();
            me.defaultClick();
        },
        render:function(){
            var me = this,
                options = me.options,
                html = [];

            html.push('<div role="dateBar"');
            html.push('<ul class="mod-tab clearfix">');
            html.push('<li><a href="javascript:;" timeType="1">最近24小时</a></li>');
            html.push('<li><a href="javascript:;" timeType="2">昨天</a></li>');
            html.push('<li><a href="javascript:;" timeType="3">最近7天</a></li>');
            html.push('<li><a href="javascript:;" timeType="4">最近30天</a></li>');
            html.push('<li><a href="javascript:;" timeType="5">自定义范围</a></li>');
            html.push('</ul>');
            //自定义时间
            html.push('<div class="search-range" style="display: none;">');
            html.push('<input type="text" class="module-input" name="st" readonly="readonly" onclick="laydate({istime: true, format:\'YYYY-MM-DD hh:mm\'})">');
            html.push('<input type="text" class="module-input" name="et" readonly="readonly" onclick="laydate({istime: true, format:\'YYYY-MM-DD hh:mm\'})">');
            html.push('<a href="javascript:;" class="btn btn-pink">自定义查询</a>');
            html.push('</div>');

            me.parentCt = $(options.el);
            me.parentCt.append(html.join(''));
            me.el = me.parentCt.find('div[role=dateBar]');
        },
        addEvents:function(){
            var me = this;
            me.el.off().on('click','li>a',function(e,cancelTrigger){
                var dom = jQuery(this);
                var timeType = parseInt(dom.attr('timeType'));
                me.timeType = timeType;
                var time = me.getValue(timeType);
                dom.parent().addClass('current').siblings().removeClass('current');
                if(timeType != 5){
                    me.el.find('.search-range').css('display','none');
                    if(cancelTrigger != true)
                        me.el.trigger('timeChange',time);
                }
                else{
                    me.el.find('.search-range').css('display','');
                }
            }).on('click','.btn',function(e){
                var time = me.getValue(me.timeType);
                if(me.timeType == 5 && !me.isValid(time.st,time.et)){
                    util.showMsg('结束时间不能小于开始时间');
                    return;
                }
                me.el.trigger('timeChange',time);
            });
        },
        defaultClick:function(){
            var timeType = this.options.timeType || 1;
            var dom = this.el.find('a[timeType={0}]'.format(timeType));
            dom.trigger('click',true);
        },
        getValue:function(tt,dateFormat){
            var me = this;
            var timeType = me.timeType;
            var result = {
                timeType:timeType,
                st:new Date(),
                et:new Date()
            };
            var today = new Date().Today();

            switch (timeType){
                case 1://最近24小时
                    result.st = result.et.add(-1,'d');
                    break;
                case 2://昨天
                    result.st = today.add(-1,'d');
                    result.et = today;
                    break;
                case 3://最近7天
                    result.st = today.add(-7,'d');
                    result.et = today;
                    break;
                case 4://最近30天
                    result.st = today.add(-30,'d');
                    result.et = today;
                    break;
                case 5://自定义
                    result.st = new Date(me.el.find('input[name=st]').val());
                    result.et = new Date(me.el.find('input[name=et]').val());
                    break;
                default :
                    break;
            }
            //是否需要返回字符串类型的时间
            if(dateFormat){
                result.st = result.st.Format(dateFormat);
                result.et = result.et.Format(dateFormat);
            }
            me.value = result;
            return result;
        },
        isValid:function(st,et){
            return et-st > 0;
        }
    };

    return dateBar;
});