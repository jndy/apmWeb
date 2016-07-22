/**
 * notifier.js
 * usage: 故障告警-新建告警配置-选择通知人
 * development by lgf
 * useing jQuery JavaScript frame v1.7+
 */
define('notifier',function(require,exports,module){

  var grid = require('grid');
  var _gridView = null;

  //当前选择的级别
  var currentLevel = "";

  //选中的人
  //{name:'',realName:'',role:''}
  var notifiers = {
    serious_1:{
                aaa:{name:'aaa',realName:'aaa',role:'ccc'}
              },
    serious_2:{
                ddd:{name:'ddd',realName:'ddd',role:'fff'},
                ggg:{name:'ggg',realName:'ggg',role:'ccc'}
              },
    serious_3:{
                ccc:{name:'ccc',realName:'ccc',role:'ccc'},
                bbb:{name:'bbb',realName:'bbb',role:'ccc'},
                mmm:{name:'mmm',realName:'nnn',role:'ccc'}
              }
  }

  /**
   * 判断notifiers中是否存在某个name
   * @return {Boolean} [description]
   */
  var _has = function(name){
    return _getCurrent()[name];
  }

  /**
   * 获取当前选中级别的对象
   * @return {[type]} [description]
   */
  var _getCurrent = function(){
    return notifiers[currentLevel];
  }
  /**
   * 匹配表格复选框 表格-->显示
   * @return {[type]} [description]
   */
  var _matching = function(){
    $("input[role=checked-single]").each(function(){
        var name = $(this).attr("name");
        if(!$(this).is(":checked")){
          if(_has(name)){
            delete _getCurrent()[name];
          }
        }else{
          if(!_has(name)){
            _getCurrent()[name] = {name:name,realName:name,role:'ccc'};
          }
        }
        
    })
    _renderSingleNotifier(currentLevel);
  }

  /**
   * 更新选中的通知人 显示-->表格
   * @return {[type]} [description]
   */
  var _updateNotifier = function(){
    $("input[role=checked-single],input[role=checked-all]").prop({checked:false});
    $("input[role=checked-single]").each(function(){
        var name = $(this).attr("name");
        if(_has(name)){
          $(this).prop({checked:true});
        }
    })
  }

  /**
   * 渲染单行
   * @return {[type]} [description]
   */
  var _renderSingleNotifier = function(key){
    var notifierHtml = "";
    var notify = notifiers[key];
    $.each(notify,function(key,value){
      notifierHtml += '<a href="javascript:void(-1);" data-name="'+value.name+'" role="notifier-remove">'+value.realName+'</a>,'
    });
      
    notifierHtml = notifierHtml.substring(0,notifierHtml.length-1); //去掉最后一个逗号

    $("span."+key).empty().html(notifierHtml);
  }

  /**
   * 渲染每个级别选中的通知人
   * @return {[type]} [description]
   */
  var _renderNotifier = function(){
    $.each(notifiers,function(key,val){
      _renderSingleNotifier(key);
    })
    _updateNotifier();
  }

  //绑定+号
  var _onIconAdd = function(self){
    $("dd.current").removeClass("current");
    self.parent("dd").addClass("current");

    currentLevel = self.data("level");

    _updateNotifier();
  }

  //查询
  var _onQuery = function(){

  }

  /**
   * 点击删除每个级别已经选中的通知人
   * @param  {[type]} _self [description]
   * @return {[type]}       [description]
   */
  var _onRemove = function(_self){
    var name = _self.data("name");
    delete _getCurrent()[name];
    _renderSingleNotifier(currentLevel);
    _updateNotifier();
  }

  /**
   * 渲染通知人
   * @return {[type]} [description]
   */
  var _loadNotifier = function(){
    var option = {
        el:'.notofier-table',
        url:'data.do?func=alarm:getNotifiers',
        plugin:'page',
        tableCss:'table-con mb-20',
        columns:[{
            name:'id',
            text:'<input type="checkbox" role="checked-all" />',
            renderer:function(a,b,item){
              
              return "<input type='checkbox' role='checked-single' name='"+item.userName+"'/>";
            }
        },{
            name:'userName',
            text:'账号'
        },{
            name:'userRealName',
            text:'姓名'
        },{
            name:'roleName',
            text:'角色'
        },{
            name:'userPhone',
            text:'手机号'
        }]
    };
    _gridView = new grid(option);
  }

  /**
   * 绑定事件
   * @return {[type]} [description]
   */
  var _eventHandler = function(){
    
    $("a.icon-add").on('click',function(){
      _onIconAdd($(this));
    });

    $("a[role=notifier-query]").on('click',function(){
      _onQuery();
    });

    $("input[role=checked-all]").on("click",function(){
      if($(this).is(":checked")){
        $("input[role=checked-single]").prop({checked:true});
      }else{
        $("input[role=checked-single]").prop({checked:false});
      }
      _matching();
    })

    $(".select-notier").on("click", "input[role=checked-single]",function(){
      _matching();
    }).on("click","a[role=notifier-remove]",function(){
      _onRemove($(this));
    });

    $(".select-notier").on("loadChange",function(e, resp){
      //渲染已经选中的通知人
      _renderNotifier();
    });

  }

  exports.init = function(){
    //设置默认选中严重级别
    currentLevel = "serious_1";

    //加载表格
    _loadNotifier();

    //绑定事件
    _eventHandler();  

  }

  /**
   * 获取选中的通知人
   * @return {[type]} [description]
   */
  exports.getNotifiers = function(){
    return notifiers;
  }


});