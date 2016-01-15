
##myTpl是一款JavaScript的模板渲染引擎。

##用于apicloud快速开发。

##支持引入，html中的模板以及引入外部文件模板，实现快速管理模板，组织模板代码。减少编码错误。


##myTpl基于laytpl扩展，官网:http://laytpl.layui.com/ 所以，laytpl的功能全部都支持。

#@作者			陈穗龙

#@联系方式		QQ:496928838

#@版本     		1.1

#@修订时间		2016年1月12日06:31:55


使用方法一览
1.模板的引入
     引入外部文件模板，以便组织模板代码
	   setTpl('模板的名称', '模板的文件路径(不用写widget://)', function(is) {
		   //is=true 为引入文件成功 一般都成功的所以不用写.
	   });
     引入html中的模板，
	  setTplByid('模板的名称', 'Dom的id')

2.渲染函数
     快速渲染函数
     showTpl('Dom的id用于显示结果的容器','模板的名称',Data);
     
     获取渲染好的html模板
     getTpl('模板的名称',Data); 
        
     获取html模板，传入数据则返回渲染好的模板
     getTplById('Dom的id',Data);

     自定义的渲染方式
     laytpl('模板的代码').render(传入渲染的数据);
3.模板编写规则
     基本语法，传入的数据统一为变量 d
     输出一个普通字段，不转义html：   {{ d.field }}
     输出一个普通字段，并转义html：   {{= d.field }}
     javaScript脚本： {{# JavaScript code }}
     
     模板中引入模板，并且传入参数渲染
		{{# var data={ 'id':'mytpl' }  }}
		{{ getTpl('模板的名称',data) }}
       循环语句模板
		{{# for(var i = 0, len = d.length; i < len; i++){ }}
		{{# var vo = d[i] }}
			{{vo.content}}
		{{# } }}

4.自定义模板标签，一般用不着~
	  laytpl.config({open: '开始标签', close: '闭合标签'}); //初始化配置
     
     

