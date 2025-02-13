---
title: 从零开始开发一个属于自己的Hexo主题
date: 2025-02-12 15:55:32
tags: Hexo
categories:
  - 主题
  - Hexo
excerpt: 还在寻找心仪的博客主题吗？干脆自己来开发一个吧。
---

## 一、前言

用了一段时间`Redefine`主题了，但还是感觉没有满足我的审美。梦想能找到一款空洞骑士风格的主题，简约淡雅的那种，最好是阅读起来让人感觉心无杂念专注于文章的知识和内容。

可惜一直找不到，想了想都学这么九的前端了不如自己开发一个。

## 二、创建主题文件结构

正常使用过Hexo框架写博客的小伙伴可能注意过，你的根目录一直睡着一个`theme`文件夹，里面一直空空如也。你就没有想过他是用来干什么的吗？没错，这个文件夹就是用来开发主题的哦。

在里面添加如下文件结构：

- themes
  - sy-theme
    - languages
    - layout
      - index.ejs
      - layout.ejs
    - scripts
    - source
    - config.yml

这里的`sy-theme`文件夹的名字是我的主题名称（仅测试使用，取得很简陋），你可以改成你自己的主题。`languages`、`layout`、`scripts`、`source`是文件夹并且名称固定。`index.ejs`、`layout.ejs`下面会说。

完成上述步骤后，将根目录下的`_config.yml`中的`theme`选项改成：

```
theme: sy-theme(根据你的来更改)
```

完成后终端`hexo s`启动你会发现一片空白，很好的开始！

## 三、给白纸写字 layout.ejs

### 3.1 layout.ejs

在`layout.ejs`中写入下面的代码：

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  This is the layout.ejs file
  <br>
  <%- body %>
  <br>
  This is the layout.ejs file
</body>
</html>
```

在`index.ejs`中写入下面的代码：

```ejs
This is the index.ejs file!
```

再次运行`hexo s`，刷新页面后可以看到：

![image-20250212160736953](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121607925.png)

我们来解读一下，`layout.ejs`是最大的那个骨架。`<%- body %>`将被替换为`index.ejs`中的内容。

接下来，我们在根目录的`source`文件夹下放点东西玩一玩。首先`_post`下放一个文章，我这里已经有很多文章了。在`source`下放的任何一个文件夹都是一个页面，结构如下：

- source
  - _post
    - 你好世界.md
    - 打造世界攻略.md
  - mypage
    - index.md

可以看到，默认情况下会在`localhost:4000`开发这个本地的应用。我们用`localhost:4000/mypage`访问会得到和上图一莫一样的结果，这里就不贴出来了。

## 四、给文章页面写字 post.ejs

### 4.1 post.ejs

接着我们试试给`post`，也就是所有的文章单独写一个layout。只需要在`layout`文件夹下添加一个`post.ejs`即可。接着我们用`localhost:4000/2024/12/23/你好世界`访问到特定文章的页面。

> 这里的2024/12/23是用`hexo new`创建文章后产生的日期，作为访问该文章的前置路由。

访问后什么都没有，那是因为`post.ejs`和`layout.ejs`一样，那是因为`post.ejs`中还没有写东西。我们在`post.ejs`中写入：

```ejs
<h1>
  I am the POST Ejs!
</h1>
```

再次访问该路由并刷新，页面渲染的效果：

![image-20250212162308258](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121623765.png)

你会发现和之前`index.ejs`中的内容替换了`<%- body %>`一样，这次也只是`post.ejs`中的内容替换了`<%- body %>`。

从这两个例子中我们已经可以窥见规律了，`layout.ejs`是所有布局中最大的那个框架。每次创建一个新的页面的**ejs**文件，文件中的内容都会替换`layout.ejs`的body内容。`layout.ejs`就像是整个博客网站的蓝图一样的存在。

### 4.2 page.ejs

还记得之前我们创建了一个`mypage`文件夹吗？`source`下的文件夹都是页面，`mypage`也不例外（你也可以不叫`mypage`，比如`sypage`什么的也可以）。我们来再创建一个`page.ejs`玩玩。回到`layout`文件夹下，创建一个文件`page.ejs`，写入如下内容：

```ejs
<h1>This is the page</h1>
```

然后访问`https://localhost:4000/mypage`，你会发现页面内容变成了这样：

![image-20250212163229093](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121632264.png)

没错，所有的页面都使用了`page.ejs`的模板，并且`page.ejs`使用了`layout.ejs`的模板。

### 4.3 tag.ejs

你是否还记得你的Hexo博客中有`category`和`tag`这样的东西，反应到页面就有`https://localhost:4000/tags/`这样的路由：

<img src="../../../../AppData/Roaming/Typora/typora-user-images/image-20250212163453819.png" alt="image-20250212163453819" style="zoom:50%;" />

我们继续在`layout`文件夹下创建一个文件名为`tag.ejs`，没有打错哟，是`tag`不是`tags`。比如我的文章中有一个标签叫做`其他` ：

![image-20250212163845550](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121638816.png)

我们访问试试：`https://localhost:4000/tags/其他`

![image-20250212163921704](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121639680.png)

可以看到`tag.ejs`中的内容替换了`layout.ejs`中的内容，和之前也一样。既然如此，`categories`也应该是同样的原理了。

## 五、组件化ejs

### 5.1 partial 传参

这样已经很酷了，但是你有没有想过更酷的。比如，向Vue的组件那样？接下来我没要试着玩一玩的`partial`就是这样的东西。

我们在已有的`layout`文件夹下创建一个新的文件夹 **partial**，并在该文件夹下创建一个`header.ejs`文件：

- layout
  - partial
    - header.ejs

在`header.ejs`中写入：

```ejs
<h1>Sy_的个人网站</h1>
<hr>
```

然后回到，`layout.ejs`中。你猜我要做什么？猜错了。哦不，猜对了，我要使用这个`partial`。

修改原来的`layout.ejs`：

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <%- partial('partial/header.ejs') %>
  This is the layout.ejs file
  <br>
  <%- body %>
  <br>
  This is the layout.ejs file
</body>
</html>
```

我们加入了一行新的代码：`<%- partial('partial/header.ejs') %>`，这代表着在这个位置将会使用该组件。文件的目录以`layout`为根相对引用这个很好理解。

刷新页面后看到所有的页面都有了这个新的网站标题，诸如`https://localhost:4000/tags/其他`也不例外！

![image-20250212165148012](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121651028.png)

### 5.2 partial 应用于 style

其实，`<%- partial('partial/header.ejs') %>`中也能给像函数一样接受一个参数，这个参数会在模板中动态调用。就像个真正的函数那样。

将我们的`partial/header.ejs`修改为：

```ejs
<h1> <%= title %> </h1>
<hr>
```

将`layout.ejs`修改为：

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <%- partial('partial/header.ejs', {title: "Sy's personal website"}) %>
  This is the layout.ejs file
  <br>
  <%- body %>
  <br>
  This is the layout.ejs file
</body>
</html>
```

再次打开首页发现变量成功被接收和读取使用啦：

![image-20250212170225758](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121702675.png)

但是，**partial**的功能远不止如此。你会发现，他其实还能响应式**style**变量。

我们将`header.ejs`中的代码修改为：

```ejs
<h1 style="color:<%= mycolor %>;"> <%= title %> </h1>
<hr>
```

将`layout.ejs`修改为：

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <%- partial('partial/header.ejs', {title: "Sy's personal website", mycolor: 'blue'}) %>
  This is the layout.ejs file
  <br>
  <%- body %>
  <br>
  This is the layout.ejs file
</body>
</html>
```

主要修改的语句是：`<%- partial('partial/header.ejs', {title: "Sy's personal website", mycolor: 'blue'}) %>`

我测，变蓝了！

![image-20250212171239550](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121713437.png)

如果你的VSCode和我一样飘了无独有偶的红色报错：

![image-20250212171319322](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121713514.png)

安装扩展VSCode插件`.ejs`，将红色方框内的语言修改为`EJS`就能解决了。

![image-20250212181004191](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121810510.png)

## 六、变量和Hexo

### 6.1 font-Matter变量

在`_post`下文件夹下的文章中我们能看到最上方的**font-Matter**变量：

<img src="https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121815916.png" alt="image-20250212181534799" style="zoom: 80%;" />

就比如这里的`title`，`date`。那我们如何去在`layout`中获取并使用他们呢？

我们改写`layout/post.ejs`：

```ejs
<h1>
  <%- page.title %>
</h1>
```

然后打开随便一篇`_post`下的文章：

![image-20250212181810743](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121818624.png)

可以看到，`<%- title %>`被成功读取。实际上，如果你改变`.md`文章中的`titel`，那么这里的变量也会动态改变。进一步修改代码，可以发现，所有`.md`中的变量都能被读取：

![image-20250212182117072](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121821465.png)

### 6.2 读取文章的内容

接下来这个变量最让人激动，它叫做：`<%- page.content %>`，他能获取文章的内容。我们修改`post.ejs`：

> 可以看到已经有点雏形了。

![image-20250212182458100](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121824848.png)

既然如此，我们怎样知道Hexo准备了哪些变量给我们玩呢？这很简单，我们可以查询官方文档[https://hexo.io/zh-cn/docs/variables](https://hexo.io/zh-cn/docs/variables)。

### 6.3 自定义变量

事情其实不仅仅这么简单，我们还可以通过`font-Matter`来定义我们的自定义变量。

```markdown
---
title: 12月24日Java作业
date: 2024-12-24 18:52:14
tags: 学校
categories:
  - 其他
  - 学校
excerpt: "Java作业"
syname: 'sy'
---
```

这里的`syname`就是我自定义的变量，变量值为'sy'，在`post.ejs`可以通过`page.syname`来拿到它的值。

## 七、程序语句

### 7.1 条件语句 if

到这里了，是时候谈谈`if`语句这样的执行语句了(statement)。在`post.ejs`中写入：

![image-20250212184144802](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121841915.png)

其中`if`语句的代码为：

```ejs
<% if (page.author == 'Sy') { %>
    作者是Sy!
  <% } else { %>
    作者不是Sy!
  <% } %>
```

鄙人也是第一次见这么设计的语法，感觉很惊讶。应该是可以理解为`<% %>`内包裹的语句会被当成程序执行，其他部分就是普通的渲染。

### 7.2 循环语句 forEach

#### 7.2.1 实现文章标题列表

如果我们想在博客的首页展示所有文章的标题，我们就需要用到`for`语句了，修改`index.ejs`：

```ejs
<h1>Sy_的个人博客</h1>
<hr>
<h2>文章列表：</h2>
<% site.posts.forEach((post, index) => { %>
  <%- index %>：<%- post.title %>
  <br>
<% }) %>
<hr>
<h1>主题：sy-theme</h1>
```

完成后启动Hexo调试，访问`https://localhost:4000/`，我们的博客首页：

![image-20250212185508577](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121855168.png)

> 此时已经让人感觉初出茅庐了，是不是很好玩呢。

#### 7.2.2 升级文章标题列表

不过，还不够好玩，我们再尝试加一点调料。正常的文章标题能让人点击后跳转到文章，我们继续修改`index.ejs`：

```ejs
<h1>Sy_的个人博客</h1>
<hr>
<h2>文章列表：</h2>
<% site.posts.forEach((post, index) => { %>
  <li><a href="<%- post.path %>">
    <%- index %> - <%- post.title %>
  </a></li>
  <br>
<% }) %>
<hr>
<h1>主题：sy-theme</h1>
```

效果如下：

![image-20250212190012898](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121900656.png)

> 再感叹一下，真的是可见一斑了！

#### 7.2.3 补充site变量

除了`site.posts`，其实还有很多诸如此类的变量，这里举几个例子，详细可查询官方文档：

- **site.categories**
- **site.tags**

他们都可以使用`for`来循环和迭代！

## 八、有用的函数(helper)

理论上来说，`<%- %>`内包裹的东西都可以是一个`JavaScript`表达式。不然你猜猜他为什么叫`EJS`而不是`E`呢？比如，`<%- trim('  st    ') %>`会返回并渲染一个`st`，去掉两头的空格。

再举个有用的函数作为例子：`<%- titlecase('This is my string') %>`，这个函数会将句子中的每个单词首字母转成大写返回，结果就是`This Is My String`，在很多场景非常的实用。

接着是`date()`，这个Api的使用场景可太广了，我的博客最底部的建站时间统计功能就是利用的这个`date()`。我们来试一试，首先将`layout.ejs`中多余的代码删掉，改为：

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  Header
  <br>
  <%- body %>
  <br>
  Footer
</body>
</html>
```

然后将`index.ejs`改为：

```ejs
年月日：<%- date(Date.now(), 'YYYY/M/D') %>
<br>
小时分秒：<%- date(Date.now(), 'h:mm:ss a') %>
```

页面效果：

![image-20250212191816375](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121918893.png)

## 九、本地数据 _data

Hexo还提供了本地数据的自定义功能，你可以在`_data`中放入`.json`文件并读取和使用它。同样的，Hexo还提供了`.yml`格式的文件以供使用。较为推荐的是`.yml`，因为他简单。

在本地的`_data`文件夹下创建一个文件，例如`sydata.yml`。你可以理解为`json`一样的本地配置文件。在其中写入：

```yml
name: 'Sy'
age: 19
sex: 'man'
```

将`index.ejs`改写为：

```ejs
name: <%- site.data.sydata.name %><br>
age: <%- site.data.sydata.age %><br>
sex: <%- site.data.sydata.sex %>
```

查看首页的页面：

![image-20250212194426754](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121944134.png)

我们发现，我们配置的`yml`文件名将会被`site.data`作为属性识别。通过类似对象的取值操作符能取到我们存取在其中的数据。

同样的，我们也可以将其改写成`for`循环来遍历所有`yml`中的数据的格式来应对更加通用的情况。尝试将`index.ejs`中的数据改为：

```ejs
<% for (let key in site.data.sydata) { %>
  key: <%- key %> @@ value: <%- site.data.sydata[key] %> <br>
<% } %>
```

页面的渲染结果为：

![image-20250212195258244](https://ccccooh.oss-cn-hangzhou.aliyuncs.com/img/202502121953835.png)

## 十、使用 Hexo 插件

可以在官方文档找到Hexo相关的插件：[Hexo插件列表](https://hexo.io/docs/plugins)。使用一个插件只需要按如下步骤：在官网的插件列表中选择他，点击进入其Github描述页面。最后根据其描述的`npm`代码在根目录下安装。

例如，`hexo-admin`插件的安装代码：

```bash
npm install --save hexo-admin
```

安装完成后哦，在根目录的`pacakge.json`的依赖属性"**dependencies**"中能找到`hexo-admin`的信息。其他插件也是同样原理。

## 十一、Hexo generate

在本地，我们可以通过`hexo s`获取一个地址，并在浏览器访问他。但是如果是在服务器上呢？服务器可不认什么markDown格式，服务器只认前端三件套。学过Vue的同学都知道，Vue也是一个原理。将Vue语法的文件打包成浏览器认识的前端三件套，部署到服务器。

同理，`hexo generate`也能将`hexo`才认识的语法和文件转化成浏览器认识的三件套，会生成一个`public`文件夹，下面的文件就是浏览器认识的文件。论你是部署到私有服务器还是部署到GithubPages都是这个原理。

当然，它有一个大家都知道的缩写：`hexo g`。

## 十二、结语

看到这里，恭喜你看完了最基础的`Hexo`主题开发教程。本教程整理自[Hexo官方视频教程](https://hexo.io/zh-cn/docs/index.html)：

<iframe style="margin: auto" width="560" height="315" src="https://www.youtube.com/embed/PsXWbI2Mqu0?si=bAgVxmD4cwbpjOYp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
