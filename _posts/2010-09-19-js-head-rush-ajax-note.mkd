---
layout: post
title: '{JS} Head Rush Ajax 笔记'
author: Vayn
date: 2010-09-19T11:21:08+0000
categories:
  -
  - faq
  - javascript

---

<a href="http://book.douban.com/subject/3136781/"><img src="http://img3.douban.com/mpic/s3182952.jpg" style="float:left;padding:0 20px 20px 0;border:0"/></a>
Head Rush Ajax 这本书很适合新手学习，没有大段枯燥的文字，没有过多的难以理解的理论。

下面是我练习中发现的一个小问题，mark之。

在 chapter04 的 Top 5 CD Listings 例子中，可以在 body 标签中加入 onLoad="addOnClickHandlers()" 在页面加载的时候给每个 img 标签添加 onClick 事件处理器，然后就可以利用这个事件处理器回调 addToTop5() 函数：

{% highlight js+genshi %}

function addOnClickHandlers() {

  var cdsDiv = document.getElementById("cds");

  var cdImages = cdsDiv.getElementsByTagName("img");

  for (var i=0; i<cdImages.length; i++) {

    cdImages[i].onclick = addToTop5;

  }

}

function addToTop5() {

  var imgElement = this;

  var top5Element = document.getElementById("top5");

  var numCDs = 0;

  for (var i=0; i<top5Element.childNodes.length; i++) {

    if (top5Element.childNodes[i].nodeName.toLowerCase() == "img") {

      numCDs = numCDs + 1;

    }

  }

  if (numCDs == 5) {

    alert("You already have 5 CDs. Click \"Start Over\" to try again.");

    return;

  }

  top5Element.appendChild(imgElement);

  imgElement.onclick = null;

  var newSpanElement = document.createElement("span");

  newSpanElement.className = "rank";

  var newTextElement = document.createTextNode(numCDs + 1);

  newSpanElement.appendChild(newTextElement);

  top5Element.insertBefore(newSpanElement, imgElement);

}

{% endhighlight %}

（完整样例下载：[Top 5 CD Listings](http://www.headfirstlabs.com/books/hrajax/chapter04/hraj_ch04_examples.zip)）

可以使用 this 关键字来指向被点击的 img 标签：var imgElement = this;

一切看起来都很好。直到……我试图真的给每个 img 标签添加 onClick="addToTop5();"，然后删除 body 标签的 onLoad 事件处理器，结果……一切都停止了，好像现在 imgElement 已经接收不到 this 所指向的 img 标签了。

这是为什么啊？

update:

将 onClick="addToTop5();" 改成 onClick="addToTop5(this);"，然后把 addToTop5() 改成 addToTop5(el) 再把 var imgElement = this; 改成 var imgElement = el; 就好了。

需要注意的是传入的参数不能用 element 或者_element之类的名字。

至于为什么不用 onLoad 后就不能直接用 this 关键字和为什么不能把 element 作为参数名，我都不知道为什么……反正就像是黑魔法一样。

update 2:

在 PHP 中，如果要给函数传一个值进去，要么使用 global + 变量，要么以参数的方式传递进去，这和作用域有关。我想 JavaScript 也是一样。

但唯一让我无法理解的是为什么在 addOnClickHandlers() 函数中以回调函数形式触发的 addToTop5() 函数无需传参，而可以直接使用 this 关键字？

EOF

