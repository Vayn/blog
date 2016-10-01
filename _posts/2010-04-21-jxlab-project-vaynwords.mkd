---
layout: post
title: '{JxLab} Project Vaynwords'
author: Vayn
date: 2010-04-21T07:07:00+0000
categories:
  - jxlab
  - php

---

耗费整整一个晚上，我学习 PHP 以来真正自己动手完成的第一个项目 [Project Vaynwords](http://lab.jixia.org/project_vws/) 终于上线了！

我经常用 G1 上英文网站阅读电子书，于是会碰到很多不认识的单词。一般碰到生词的时候我会顺手查一下，不过这样做有个问题——当时知道是什么意思过不了多久就会忘掉。恰巧有次查单词时 Seesmic（android 上的 twitter 客户端）提示有新消息，我就想干脆把单词发到 twitter 上好了，因此就有了单词推~

除了发单词推我也发别的推文，后来发现这样单词推就不好找了，于是我用 hashtag 把单词推专门标记出来。可是即便如此找单词还是不太方便，而且找到的只有单词，有关单词的内容（音标、发音、解释等）还得再打开 twitter，搜索，复制，打开词典，粘贴，查看。花在这些方面的时间比记单词本身还花时间，未免得不偿失。

所以我就琢磨怎么才能把单词更快的整理出来，并且带有音标、发音、解释、例句。我从平常的习惯出发，最后真让我琢磨出一个点子——用 twitter API 获得单词推，用 Google Dictinary 获得发音（我喜欢 GDict 的发音，而且可以用 GDict 的播放器），用 Dict.cn 的 Web API 获得音标、解释、例句，然后用 PHP 把这些内容结合到一起，生成一个基于 web 2.0 生态系统的生词本。

[![Project Vaynwords](/images/intro_vws_small.png)](/images/intro_vws.png)

如果没有这些多种多样的 API，我是不可能实现这个想法。Web 2.0 is magnificent!

欢迎访问 [Project Vaynwords](http://lab.jixia.org/vws/)！

p.s. Project Vaynwords 0.1 最大的问题是某些单词的发音没有解决，比如 contemplate 就没法发音，只能说 Google Dictionary 的发音文件路径太古怪了，也许下个版本我会换个方法获取文件。

如果哪位朋友知道 Google Dictionary 的路径规则，请发邮件到 vt at elnode dot com，或者在 [twitter](http://twitter.com/vayn) 上告诉我，谢谢。

EOF

