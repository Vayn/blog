---
layout: post
title: '{JxLab} 中国的超级防火墙如何让我们更有效率(How China’s Great Firewall Can Make Us More Productive)'
author: Vayn
date: 2010-09-28
categories:
  - think
  - translation
---
原文：[How China’s Great Firewall Can Make Us More Productive](http://www.azarask.in/blog/post/chinas-great-firewall-productivity/) By Aza Raskin

翻译：Vayn a.k.a. VT &lt;vayn at(not spam) vayn dot de&gt;

人总想得到自己得不到的。这条人类哲学的基本格言说明不留余地地审查制度对于隐藏想法和信息而言是一个错误的方法。禁忌，明确会让人们更加渴望信息，不管信息的内容是启示性的或者是平淡无奇的。本段的观点是你可以把这些知识用到自己身上，重新塑造自己的行为。

中国的大防火墙小心的规避你“想得到自己得不到的东西”的欲望。我最近一次游访北京的时候尝试访问 BBC，其实我希望 BBC 被封锁了。但与我所想不同的是，网站缓慢而不稳定地打开了。如果我等的时间足够长，刷新次数足够多，网页就应该能完全打开。根据零零星星的经验，我发现我的沮丧是针对 BBC 而不是防火墙。甚至我有意识地认识到将会发生什么，我还是会发自肺腑地觉得这是 BBC 的过错而不是全国范围的审查的问题。

我们可以把同样的伎俩用到提升我们自己的生产力上。这能促成一种帮助我们集中注意力的新工具——不封锁某个东西而是限制它，一条既提升生产力里又最不让惹人烦的路子。

思路很简单：每当你访问那些会让你耽搁事情的网站，它会随机变慢。你在一天中头次访问网站是全速的，但当你第四次打开网站，它会偶尔下载一点页面数据，就好像网站被放到了中国超级防火墙后面。我们称之为 _生产力代理_ 。

这让人恼火，但等待一个加载缓慢的页面比关掉屏蔽要容易，你需要做的唯一一件事就是等。我已经发现当 Reddit 在我访问的头七秒内打不开，我就会关掉网站继续做我刚才在做的事情。一般来讲，让那些通过小小点击获得的快乐来得慢些，让我们的大脑有时间反应它在做什么；好理性地重视做工作而得的延迟的满足感，而不是选择感性点击而获得的即时的满足感。(More generally, by making those little hits of joy take longer, it gives our brain the time it needs to reflect on what it’s doing; to rationally value the delayed gratification of doing the work, instead of opting for the emotional hit of instant gratification. )。最终，就像中国超级防火墙一样，你内心的愤怒会指向延迟的网站而非生产力代理。这就巧妙地训练你，让你变得更有效率。

我们从拖延获得的快乐来自于，当我们看到或学到某些新东西时候多巴胺的释放。多巴胺让我们在 Wikipedia 上一个劲儿的点链接，让我们在 [demotivational posters](http://verydemotivational.com/) 上一个劲儿的看图片。为了成功打断这些习惯，我们要慢慢摆脱多巴胺的控制（we need to ween ourselves off the dopamine）。在真实的场景中，我们的大脑，会沉溺于不断涌入的新东西（Our brain, in a real sense, is addicted to the constant influx of new.）。这是为什么我们不断检查邮件的原因：[我们的大脑](http://en.wikipedia.org/wiki/Nucleus_accumbens)寻找从新邮件和潜在的重要信息获得的随机奖励。告诉自己以后再也不拖延了和告诉自己正在戒烟一样有效。我们需要给我们的大脑类似于尼古丁贴片的东西。这就是生产力代理。

把那些会让你产生拖延症的网站变慢，而不是封锁它们，是一种生产力和精神上的柔术（Slowing procrastinatory sites, instead of blocking them, is the jujitsu of productivity and the mind.）。

__征集：__ 我正在找一名开发者，帮我把这个想法变成功能完备的代理。现在已经有两个简单的[Python](http://pypi.python.org/pypi/throxy.py/0.1) 写成的代理实现，它们是为 [Node.js](http://github.com/toolness/throxode) 写的，可以很容易的添加生产力过滤器。如果你感兴趣，请发推到 [@azaaza](http://twitter.com/azaaza)。

（完）

译者：还是有诸多翻译的不通顺甚至词不达意的地方，请各位指正。

EOF