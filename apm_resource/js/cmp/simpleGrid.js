/**
 * simpleGrid.js
 * usage: 自己封装的简单表格组件
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-04-01
 * useing jQuery JavaScript frame v1.7+
 */
define('simpleGrid',function(require,exports,module){
    var simpleGrid = function(){
        var options = arguments[0] || {};
        this.options=options;
        this.columns = options.columns || [];
        this.init();
    };

    simpleGrid.prototype={
        init:function(){
            var me = this;
            me.render();
            //渲染完毕后触发事件
            if(typeof(me.options.afterrender) == 'function'){
                me.options.afterrender(me);
            }
            if(me.autoLoad !== false){
                me.requestData();
            }
        },

        render:function(){
            var me = this,
                th = [],
                columns = me.options.columns;

            me.parentCt = document.body;
            //是否需要展示headers
            if(me.options.hideHeaders !== true){
                for(var i =0,len =columns.length;i<len;i++){
                    th.push('<th>{0}</th>'.format(columns[i].text));
                }
            }

            if(me.options.el){
                me.parentCt = $(me.options.el);
            }
            var table = $('<div><table class="">{0}</table></div>'.format(th.join('')));
            $(me.parentCt).empty().append(table);
            me.table = table;
        },

        requestData:function(){
            var me = this,
                options = me.options,
                param = options.param,
                url = options.url;

            if(!url)
                return;

            param.page = me.page;
            me.lastParam = me.param;
            me.param = param;
            util.request({
                url:url,
                param:param,
                fnSuc:function(resp){
                    me.loadData(resp['var']);
                },
                fnErr:function(resp){
                    var data = [{nodeName:'gl胖胖哒',percent:'100%'},{nodeName:'flm帅帅哒',percent:'100%'},{nodeName:'wn可爱哒',percent:'100%'}];
                    me.loadData(data);
                }
            });
        },

        loadData:function(data){
            var me = this,
                tbody = '',
                columns = me.columns;

            me.data = data || [];
            //根据data构造tbody
            for(var i =0,len =data.length;i<len;i++){
                var item = data[i];
                tbody += '<tr>';
                for(var j =0,len2 =columns.length;j<len2;j++){
                    var fun = columns[j].renderer,
                        td = item[columns[j].name];
                    if(typeof(fun) == 'function'){
                        td = fun(td, i ,item);
                    }
                    tbody +='<td>'+td+'</td>';
                }
                tbody +='</tr>'
            }
            if(data.length == 0){
                tbody +='<tr><td colspan="{0}">无数据</td></tr>'.format(columns.length);
            }
            me.table.find('tbody').append(tbody);
        }
    };

    return simpleGrid;
});