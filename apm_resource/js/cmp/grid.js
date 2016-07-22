/**
 * grid.js
 * usage: 自己封装的表格组件
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-04-01
 * useing jQuery JavaScript frame v1.7+
 */
define('grid',function(require,exports,module){
    var grid = function(){
        var options = arguments[0] || {};
        this.options=options;
        this.columns = options.columns || [];
        this.page = 1;
        this.totalPage = 1;
        this.pageSize = options.pageSize || 20;
        this.init();
    };

    grid.prototype={
        init:function(){
            var me = this;
            me.render();
            //渲染完毕后触发事件
            if(typeof(me.options.afterrender) == 'function'){
                me.options.afterrender(me);
            }
            if(me.options.autoLoad !== false){
                me.requestData(me.options.params);
            }
        },

        render:function(){
            var me = this,
                thead = me.renderHeader(),
                tableCss = me.options.tableCss || '';

            me.parentCt = document.body;
            if(me.options.el){
                me.parentCt = $(me.options.el);
            }
            var table = $('<div><table class="table table-striped {1}" cellspacing="0" cellpadding="0">{0}<tbody></tbody></table></div>'.format(thead,tableCss));
            $(me.parentCt).append(table);
            me.table = table;

            me.initPlugin();
        },

        renderHeader:function(){
            var me = this,
                th = ['<thead><tr>'],
                columns = me.options.columns;

            if(me.options.selfHeader){
                return me.options.selfHeader;
            }

            for(var i =0,len =columns.length;i<len;i++){
                var thWidth = columns[i].width ? ' width="{0}"'.format(columns[i].width):'';
                th.push('<th {1}>{0}</th>'.format(columns[i].text,thWidth));
            }
            th.push('</tr></thead>');
            return th.join('');
        },

        initPlugin:function(){
            var me = this;

            if(me.options.plugin){
                var style = 'style="text-align:{0};"'.format(me.options.pluginAlign || 'right')
                me.table.append('<div class="grid-plugin" '+ style +'></div>');
                me.renderPlugin();
                me.addPluginEvent();
            }
        },

        renderPlugin:function(data){
            var me = this,
                pageDiv;
            if(!data){
                var pageSizeDiv = $('<div class="module-select page-size"><span>20</span><a href="javascript:;" class="btn-select choosePageSize"><i class="i-select"></i></a><ul style="display: none;"><li><a href="javascript:;">20</a></li><li><a href="javascript:;">40</a></li><li><a href="javascript:;">100</a></li></ul></div>'),
                    pageDiv = $(me.renderPageDiv(1));

                me.table.find('.grid-plugin').append(pageSizeDiv);
            }
            else{
                var totalNo = data['var']['listCount'],
                    totalPage = parseInt((totalNo-1)/me.pageSize)+ 1,
                    pageDiv = $(me.renderPageDiv(totalPage));

                me.totalPage = totalPage;
            }

            me.table.find('.grid-plugin').find('.pages').remove();
            me.table.find('.grid-plugin').append(pageDiv);
        },

        renderPageDiv:function(totalPage){
            var me = this;
            var page = me.page;
            var preEL='<a class="page page-prev" href="javascript:;">上一页</a>';
            var nextEL='<a class="page page-next" href="javascript:;">下一页</a>';
            var midEl=['<span class="page-num">'];

            if(totalPage <= 8){
                for(var i=1;i<=totalPage;i++){
                    var el ='<a href="javascript:;" class={1}>{0}</a>';
                    var css = '';
                    if(me.page == i)
                        css='current';
                    midEl.push(el.format(i,css));
                }
            }
            else{
                var pageArr=[];
                if(page<1+3)
                    pageArr = [1,2,3,4,5,'...',totalPage];
                else if(page>totalPage-3)
                    pageArr = [1,'...',totalPage-4,totalPage-3,totalPage-2,totalPage-1,totalPage];
                else
                    pageArr = [1,'...',page-2,page-1,page,page+1,page+2,'...',totalPage];

                for(var i=0;i<pageArr.length;i++){
                    var el ='<a href="javascript:;" class={1}>{0}</a>';
                    var css = '';
                    if(page == pageArr[i])
                        css='current';
                    midEl.push(el.format(pageArr[i],css));
                }

            }
            midEl.push('</span>');
            var pageControl = ['<div class="pages">',preEL,midEl.join(''),nextEL,'</div>'].join('');
            return pageControl;
            $('.mod-page').find('.pages').remove();
            $('.mod-page').append(pageControl);
        },

        addPluginEvent:function(){
            var me = this;
            me.table.off().on('click','.choosePageSize',function(e){
                e.stopPropagation();
                $(this).next().css('display','');
            }).on('click','.page-size ul>li>a',function(e){
                var dom = $(this);
                me.pageSize = parseInt(dom.text());
                $('.page-size span:eq(0)').text(dom.text());
                me.requestData(null,1);
//                me.requestData(me.lastParam);
            }).on('click','.pages a',function(e){
                var dom = $(this);
                if(dom.hasClass('page-prev')){
                    me.goPage(me.page-1);
                }
                else if(dom.hasClass('page-next')){
                    me.goPage(me.page+1);
                }
                else if(!dom.hasClass('current')){
                    var pageNo = parseInt(dom.text());
                    if(isNaN((pageNo)))
                        return;
                    me.goPage(pageNo);
                    dom.addClass('current').siblings().removeClass('current');
                }
            });
        },

        goPage:function(page,param){
            var me = this,
                newParam = param || me.lastParam;

            if(page < 1 || page >me.totalPage)
                return;

            me.page=page;
            me.requestData(newParam);
        },

        requestData:function(param,page){
            var me = this,
                options = me.options,
                param = param || me.lastParam || {},
                url = options.url;

            if(!url)
                return;

            param.pageNo = page || me.page;
            param.pageSize = me.pageSize;
            me.page = param.pageNo;
            me.lastParam = me.param;
            me.param = param;

            util.request({
                url:url,
                param:param,
                fnSuc:function(resp){
                    var dataListProp = options.dataListProp || 'dataList';
                    me.loadData(resp['var'][dataListProp]);
                    me.renderPlugin(resp);
                    $(me.parentCt).trigger("loadChange",resp['var']);
                }
            });
        },

        loadData:function(data){
            var me = this,
                columns = me.columns,
                tbody = '';

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
                    else if(typeof(fun) == 'string'){
                        td = me.defaultColumnRender(fun, i, item)
                    }
                    tbody +='<td>'+td+'</td>';
                }
                tbody +='</tr>'
            }
            if(data.length == 0){
                tbody +='<tr><td colspan="{0}">无数据</td></tr>'.format(columns.length);
            }
            me.table.find('tbody').empty().append(tbody);
        },

        defaultColumnRender:function(type, index, record){
            var me = this,
                td = '';
            switch (type){
                case 'serial':
                    var page = me.options.page || 1;
                    var pageSize = me.options.pageSize || 20;
                    td = (page-1) * pageSize + index + 1;
                    break;
                default :
                    break;
            }

            return td;
        }
    };

    return grid;
});