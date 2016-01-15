<h1 id="mytpl-javascript的html模板引擎">myTpl JavaScript的HTML模板引擎</h1>

<p>myTpl是一款JavaScript的模板渲染引擎。 <br>
用于apicloud快速开发。 <br>
支持引入，html中的模板以及引入外部文件模板，实现快速管理模板，组织模板代码。减少编码错误。</p>

<p>myTpl基于laytpl扩展，官网:<a href="http://laytpl.layui.com/">http://laytpl.layui.com/</a> <br>
所以，laytpl的功能全部都支持。</p>

<p>@作者         陈穗龙 <br>
@联系方式       QQ:496928838 <br>
@版本             1.1 <br>
@修订时间       2016年1月12日06:31:55</p>

<hr>



<h2 id="使用方法一览">使用方法一览</h2>

<p>1.模板的引入 <br>
    引入外部文件模板，以便组织模板代码</p>

<pre><code>   setTpl('模板的名称', '模板的文件路径(不用写widget://)', function(is) {
       is=true 为引入文件成功 一般都成功的所以不用写.
   });
</code></pre>

<p>引入html中的模板，</p>

<pre><code>  setTplByid('模板的名称', 'Dom的id')
</code></pre>

<p>2.渲染函数 <br>
     快速渲染函数 <br>
     showTpl(‘Dom的id用于显示结果的容器’,’模板的名称’,Data);</p>

<pre><code> 获取渲染好的html模板
 getTpl('模板的名称',Data); 

 获取html模板，传入数据则返回渲染好的模板
 getTplById('Dom的id',Data);

 自定义的渲染方式
 laytpl('模板的代码').render(传入渲染的数据);
</code></pre>

<p>3.模板编写规则 <br>
     基本语法，传入的数据统一为变量 d <br>
     输出一个普通字段，不转义html：   {{ d.field }} <br>
     输出一个普通字段，并转义html：   {{= d.field }} <br>
     javaScript脚本： {{# JavaScript code }}</p>

<pre><code> 模板中引入模板，并且传入参数渲染
    {{# var data={ 'id':'mytpl' }  }}
    {{ getTpl('模板的名称',data) }}
   循环语句模板
    {{# for(var i = 0, len = d.length; i &lt; len; i++){ }}
    {{# var vo = d[i] }}
        {{vo.content}}
    {{# } }}
</code></pre>

<p>4.自定义模板标签，一般用不着~ <br>
      laytpl.config({open: ‘开始标签’, close: ‘闭合标签’}); //初始化配置</p>