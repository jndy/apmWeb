/**
 * mainControl.js
 * usage: 主控台
 * development by flm
 * mail: 892905668@qq.com
 * create at 2016-07-01
 * useing jQuery JavaScript frame v1.7+
 */
define('mainControl',function(require,exports,module){
    var simpleGrid = require('simpleGrid'),
        rightGrid = require('rightGrid'),
        leftMap = require('leftMap'),
        tpl = require('{rootPath}/template/main/mainControl.html');

    var view = Backbone.View.extend({
        el:'.control',
        initialize:function(){
            this.render();
            this.initEvents();
            this.defaultClick();
        },
        render:function(){
            var html = _.template(tpl)({
            });
            this.$el.empty().append(html);
        },
        initEvents:function(){
            var me = this;

            me.$el.find('input[name="viewType"]').off().on('change',function(){
                var viewType = parseInt($(this).val());
                rightGrid(viewType);
                leftMap(viewType);
            });
        },
        defaultClick:function(){
            this.$el.find('input[type=radio][name=viewType][value=1]').prop("checked","checked").trigger('change');
            //this.$el.find('input[name="viewType"]:first').trigger('change');
        },
        getSeverTime: function(){
            var me = this;

        },
        onTypeChange:function(e){

        }
    });

    return view;
});