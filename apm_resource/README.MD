## 文档目录说明

+ `css` 存放样式资源文件
+ `images` 存放图片资源文件
+ `template` 存放静态模板资源文件
+ `js` 存放脚本资源文件
    + `lib` 第三方类库
    + `cmp` 项目中的公用组件
    + `util` 项目中的通用方法类
    + `module` 子模块的交互功能类

## 注意
```
1. 某个文件夹超过15个上的文件，请在该文件夹中按模块新建子文件夹
2. 系统使用的弹窗为artDialog库，已经将其再次封装两个常用的函数为util.confirm和util.dialog基本够用
3. 系统使用的时间组件类库为laydate库，使用方式为在input中加入onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm'})"
4. 表格组件为自己封装的grid.js，具体用法参考user.js
5. 当组件中存在下拉框的时候，直接在tmpl中写select标签，然后通过util.my_select方法转换为下拉框组件
```
