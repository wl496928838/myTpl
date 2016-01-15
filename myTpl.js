/**
 * myTpl是一款JavaScript的模板渲染引擎。
 * 用于apicloud快速开发。
 * 支持引入，html中的模板以及引入外部文件模板，实现快速管理模板，组织模板代码。减少编码错误。
 * 
 * myTpl基于laytpl扩展，官网:http://laytpl.layui.com/
 * 所以，laytpl的功能全部都支持。
 * 
 * @作者			陈穗龙
 * @联系方式		QQ:496928838
 * @版本     		1.1
 * @修订时间		2016年1月12日06:31:55
 *
 * 使用方法一览
 * 1.模板的引入
 *         引入外部文件模板，以便组织模板代码
		   setTpl('模板的名称', '模板的文件路径(不用写widget://)', function(is) {
			   //is=true 为引入文件成功 一般都成功的所以不用写.
		   });
 *         引入html中的模板，
		  setTplByid('模板的名称', 'Dom的id')

 * 2.渲染函数
 *         快速渲染函数
 *         showTpl('Dom的id用于显示结果的容器','模板的名称',Data);
 *         
 *         获取渲染好的html模板
 *         getTpl('模板的名称',Data); 
 *            
 *         获取html模板，传入数据则返回渲染好的模板
 *         getTplById('Dom的id',Data);
 *
 * 
 *         自定义的渲染方式
 *         laytpl('模板的代码').render(传入渲染的数据);
 * 3.模板编写规则
 *         基本语法，传入的数据统一为变量 d
 *         输出一个普通字段，不转义html：   {{ d.field }}
 *         输出一个普通字段，并转义html：   {{= d.field }}
 *         javaScript脚本： {{# JavaScript code }}
 *         
 *         模板中引入模板，并且传入参数渲染
			{{# var data={ 'id':'mytpl' }  }}
			{{ getTpl('模板的名称',data) }}
 *
 *          循环语句模板
			{{# for(var i = 0, len = d.length; i < len; i++){ }}
			{{# var vo = d[i] }}
				{{vo.content}}
			{{# } }}
 *
 * 
 *  4.自定义模板标签，一般用不着~
		  laytpl.config({open: '开始标签', close: '闭合标签'}); //初始化配置
 *         
 *         
 *  
 */

/**
 * 把时间转换成容易阅读的时间
 * @作者     陈穗龙
 * @时间     2016-01-12T06:24:34+0800
 * @param  {String}                 time 传入时间文本
 * @return {String}                      返回容易阅读时间
 */
function timeToStr(time){
	t= Math.round(new Date().getTime()/1000) - time;
	s= [31536000,2592000,604800,86400,3600,60,1];
	timeStr=['年','个月','星期','天','小时','分钟','秒'];
	for (var i = 0; i < s.length; i++) {
		c = Math.floor(t/ s[i] ) ;
		if (0 != c)
		{
			if (c<=0) {c=1;};
			return c + timeStr[i] +'前';
		}
	  }
}

var tplList = [];
/**
 * 设置文件模板apicloud专用.
 * @作者    陈穗龙
 * @时间    2016-01-12T06:18:14+0800
 * @param {String}                 name 模板名称
 * @param {String}                 path 模板对应的路径
 * @param {Function}               fn   回调函数 加载成功返回真 失败返回假 基本都成功..没遇到失败.
 */
function setTpl(name, path, fn) {
	api.readFile({
		path: 'widget://' + path
	}, function(ret, err) {
		if (ret.status) {
			tplList[name] = ret.data;
			status = true;
		} else {
			status = false;
		}
		if (fn !== undefined) {
			fn(status);
		}
	})
}
/**
 * 获取模板，如果设置传递参数则返回渲染好结果的内容
 * @作者     陈穗龙
 * @时间     2016-01-12T06:16:08+0800
 * @param  {String}                 name 模板名称 setTpl中设置的
 * @param  {obj}                 data 传入渲染的数据 可空
 * @return {String}                      返回模板或者渲染好的结果
 */
function getTpl(name, data) {
	var tplHtml = tplList[name];
	if (undefined == data) {
		return tplHtml;
	}
	return laytpl(tplHtml).render(data);
};
/**
 * 设置某id的模板到模板列表中
 * @作者    陈穗龙
 * @时间    2016-01-12T06:23:45+0800
 * @param {String}                 name 模板名称
 * @param {String}                 id   dom中的id
 */
function setTplByid(name, id) {
	var tplHtml = document.getElementById(id).innerHTML;
	tplList[name] = tplHtml;
}
/**
 * 获取某id属性的模板，设置传递参数则返回渲染好的结果
 * @作者     陈穗龙
 * @时间     2016-01-12T06:22:24+0800
 * @param  {String}                 cssId 传入id
 * @param  {obj}                 data  传入数据渲染 可选
 * @return {String}                       返回模板或者渲染好的结果
 */
function getTplById(id, data) {
	var tplHtml = document.getElementById(id).innerHTML;
	if (undefined == data) {
		return tplHtml;
	}
	return laytpl(tplHtml).render(data);
};

/**
 * 用于快速编写，显示模板，该功能依赖setTpl或getTplById 设置的模板
 * @作者     陈穗龙
 * @时间     2016-01-12 05:44:33
 * @param  {String}                 cssId   设置内容的容器 请输入id属性
 * @param  {String}                 tplName setTpl所设置的模板Name
 * @param  {String}                 data    传入模板的数据
 * @return {String}                         没有返回值
 */
function showTpl(cssId, tplName, data){
		document.getElementById(cssId).innerHTML = laytpl(getTpl(tplName)).render(data);
}






/** 
 
 @Name：laytpl-v1.1 精妙的js模板引擎 
 @Author：贤心 - 2014-08-16
 @Site：http://sentsin.com/layui/laytpl 
 @License：MIT license
 */
 
;!function(){"use strict";var f,b={open:"{{",close:"}}"},c={exp:function(a){return new RegExp(a,"g")},query:function(a,c,e){var f=["#([\\s\\S])+?","([^{#}])*?"][a||0];return d((c||"")+b.open+f+b.close+(e||""))},escape:function(a){return String(a||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},error:function(a,b){var c="Laytpl Error：";return"object"==typeof console&&console.error(c+a+"\n"+(b||"")),c+a}},d=c.exp,e=function(a){this.tpl=a};e.pt=e.prototype,e.pt.parse=function(a,e){var f=this,g=a,h=d("^"+b.open+"#",""),i=d(b.close+"$","");a=a.replace(/[\r\t\n]/g," ").replace(d(b.open+"#"),b.open+"# ").replace(d(b.close+"}"),"} "+b.close).replace(/\\/g,"\\\\").replace(/(?="|')/g,"\\").replace(c.query(),function(a){return a=a.replace(h,"").replace(i,""),'";'+a.replace(/\\/g,"")+'; view+="'}).replace(c.query(1),function(a){var c='"+(';return a.replace(/\s/g,"")===b.open+b.close?"":(a=a.replace(d(b.open+"|"+b.close),""),/^=/.test(a)&&(a=a.replace(/^=/,""),c='"+_escape_('),c+a.replace(/\\/g,"")+')+"')}),a='"use strict";var view = "'+a+'";return view;';try{return f.cache=a=new Function("d, _escape_",a),a(e,c.escape)}catch(j){return delete f.cache,c.error(j,g)}},e.pt.render=function(a,b){var e,d=this;return a?(e=d.cache?d.cache(a,c.escape):d.parse(d.tpl,a),b?(b(e),void 0):e):c.error("no data")},f=function(a){return"string"!=typeof a?c.error("Template not found"):new e(a)},f.config=function(a){a=a||{};for(var c in a)b[c]=a[c]},f.v="1.1","function"==typeof define?define(function(){return f}):"undefined"!=typeof exports?module.exports=f:window.laytpl=f}();