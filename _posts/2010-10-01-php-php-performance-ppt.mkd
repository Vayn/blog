---
layout: post
title: '{PHP} PHP Performance PPT'
author: Vayn
date: 2010-10-01
categories:
  - think
  - php
---

刚看到一篇 [Rasmus Lerdorf](http://twitter.com/rasmus) 最新的有关 PHP 性能的[演讲](http://talks.php.net/show/digg/)，因为视频是放在 Vimeo 上的就不在文内嵌入了。演讲中说 PHP 一般情况下不会是性能瓶颈，并且以 WordPress 为例进行了一系列性能分析和优化。

很多的调试工具我都是头一回听到，而且全部是运行在 Linux 环境下。这让我就没办法试验了，因为我的笔记本电脑（安装有 Ubuntu）烧了，暂时没环境。不过文中的优化措施和调试工具的使用的确让我大开眼界，我总算知道 [Hiphop](http://wiki.github.com/facebook/hiphop-php/) 是什么了……

文章的结论值得深思，在这里做以转载：

>• Performance is all about flexibility vs. cost tradeoffs.
>
>• If you don't know what things cost, you are lost.
>
>• Learn your tools - strace, Callgrind, Xdebug, xhprof.
>
>• Check your assumptions.
>
>• Real performance is architecture-driven.

稍微翻译一下：

<ul>
<li>性能就是灵活性与开销的权衡。</li>
<li>如果你不知道事物消耗了什么，你是失败的。</li>
<li>你要学习使用的工具——strace, Callgrind, Xdebug, xhprof。</li>
<li>检查你的假设。</li>
<li>真正的性能是架构驱动的。</li>
</ul>

学无止境。

EOF
