---
layout: post
title: '{JxLab} TAPP'
author: Vayn
date: 2010-10-25
categories:
  - jxlab
  - DIY
---

[TAPP](http://zdxia.com/2xbz )（点击下载）是由 [disinfeqt](http://www.zdxia.com) 发起的项目。

[TAPP](http://zdxia.com/2xbz ) 的目标：用最简单的手段展示你的 Twitter，无须过多设置。

<p style="text-align:center;"><img src="/images/archive/tapp1.png" alt="TAPP" /></p>

[TAPP](http://zdxia.com/2xbz ) 的界面设计由 [disinfeqt](http://www.zdxia.com) 完成，后端代码由 [Vayn](http://elnode.com) 完成。

TAPP 的安装共分为两步：一、将 TAPP 上传到服务器；二、设置文件夹权限为 775。结束。

接下来从浏览器来访问 TAPP 安装目录，输入 TAPP 的初始密码 __admin__ 后就正式进入 TAPP 的设置界面了。

<p style="text-align:center;"><img src="/images/archive/tapp2.png" alt="TAPP" /></p>

Twitter username 既你的 Twitter 用户名。

Amount 是你想输出的条目数量。

通过  @Replies 可以选择是否输出回复别人的 Tweet。

Cache Time 是缓存生存时间，配合 cron.php 使用达到自动化更新的效果。

Output 为输出格式，有 HTML，JSON 和 RSS 三种格式可以选择。下方 Your include code 中的内容会随着格式的变化而变化。

选择 RSS 会很直观的输出一个 RSS 地址。

选择 JSON 会输出一段标准 HTML 代码和一个 JSON 格式的 cache 文档。

{% highlight html %}
<!-- HTML -->
<div id="twitter_div">
<h2 class="sidebar-title">Twitter Updates</h2>
<ul id="twitter_update_list"></ul>
</div>
<!-- Javascript -->
<script type="text/javascript" src="http://localhost/tapp/js/twitter.js"></script>
<script type="text/javascript" src="http://localhost/tapp/cache.json"></script>
{% endhighlight %}

这段代码完全实现了 [Twitter Badge](http://twitter.com/goodies/widget_profile) 的功能，你可以在 blog 的侧边栏之类的地方嵌入它，并通过 CSS 来定制样式。

选择 HTML 输出……一段 PHP 代码？没错，并不是简单的输出 HTML 代码而以。

<p style="text-align:center;"><img src="/images/archive/tapp3.png" alt="TAPP" /></p>

你可以把这段 PHP 代码 require 到服务器上的任意 PHP 文件中（比如 WordPress 的主题文件），require 之后就可以使用 print_tweet() 函数来直接输出 HTML 代码。

<p style="text-align:center;"><img src="/images/archive/tapp4.png" alt="TAPP" /></p>

最下方还提供了修改密码、清空 cache 等功能。

在 TAPP 最新的 0.9.2 版中加入了测试功能——输出图片，在这里特别感谢 [Sai](http://twitter.com/saic) ，这个功能的原始代码及模板均来自于 [Parasy](http://saicn.com/get_parasy/) 项目。

使用输出功能需要你自己找一个支持中文的 TrueType 字体（我推荐文泉驿开源字体），改名 wqy.ttc 后放入 show 文件夹。然后访问一下 show.php 就能看到效果了。

<p style="text-align:center;"><img src="/images/archive/tapp5.png" alt="TAPP" /></p>

TAPP 并不是 Another Twitter API Application，而是一个小小的工具，为你展示自己的 Twitter 提供了简洁化的手段。

有什么疑问和建议欢迎留言提出，或者 follow [@disinfeqt](http://twitter.com/disinfeqt) 和 [@Vayn](http://twitter.com/vayn) 均可。

EOF