---
layout: post
title: '{VBS} SAPI.SpVoice'
author: Vayn
date: 2010-08-19T15:46:23+0000
categories:
  -

  - vbs
  - windows

---

{% highlight vbnet %}
Dim txt,sapi
txt="I LOVE YOU"
set sapi=CreateObject("SAPI.SpVoice")
sapi.Speak txt
{% endhighlight %}

来自 [Kaisir™](http://www.kaisir.com)
<p>虽然不研究 Windows 编程，但我还是觉得很赞。也许可以设置计划任务什么的，囧。</p>
<p>EOF</p>
