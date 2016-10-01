---
layout: post
title: '{PHP} Project Nowhere Plus FeedCore'
author: Vayn
date: 2010-08-13T15:13:36+0000
categories:
  - jxlab
  - php

---

**Project Nowhere Plus FeedCore 是什么？**

简单地说，Project Nowhere Plus FeedCore 是我写的添加了 feed 导入功能的 Nowhere。

[![Project Nowhere Plus FeedCore](/images/nowhere_feedcore_small.png)](/images/nowhere_feedcore.png)

**如何使用？**

登录 Nowhere，在右上角会出现一个新的选项“导入”，点击即可开始导入 feed。

**目前支持以下网站的导入：**

Twitter, Wakoopa, 豆瓣, Bangumi, Last.fm, FriendFeed, Google Reader。

**开启自动更新**

如果你想开启自动更新，进入控制面板后可以看到一行新的设置：开启Feed导入（“1”开启，“0”关闭）。在下面的文字框输入“1”即可打开自动更新功能。否则你需要每次在你想更新的时候点击“导入”。

如果你想更改更新频率，打开 inc 目录下的 config.inc.php，找到 $feedrate 变量并修改它的值，$feedrate 的时间单位为秒，默认设置 8 小时更新一次。

**Credits**

感谢 Sai <[http://saicn.com/me](http://saicn.com/me)\>，[Project Nowhere](http://code.google.com/p/project-nowhere/) 是 Sai 一手完成的项目。

感谢 Jeremy Keith <[http://adactio.com/](http://adactio.com/)\>，同步其他 stream project 的最初实现来自他的[源码](http://adactio.com/extras/stream/stream.phps)。

感谢水木 PHP 版的 feuvan <[http://www.newsmth.net/bbsqry.php?userid=feuvan](http://www.newsmth.net/bbsqry.php?userid=feuvan)\> 版主，耐心帮助我解决了异步更新的难题（对我来说，因为我不会 Javascript）。

也感谢 V2EX 的各位网友，Project Nowhere Plus FeedCore 是我看到 [http://www.v2ex.com/t/1093](http://v2ex.appspot.com/t/1093) 这个贴子的时候才萌生了给 Nowhere 加入 feed 导入功能。

**下载地址**

[http://project-vaynwords.googlecode.com/files/nowhere.zip](http://project-vaynwords.googlecode.com/files/nowhere.zip)

安装方法参考 Sai 所写的 [How to install](http://saicn.com/bbs/topic/view/7467.html)。

如果你发现任何问题，欢迎和我联络，我的电子邮件地址是 vt at elnode dot com

EOF