---
layout: post
title: '{MySQL} Cascading Delete'
author: Vayn
date: 2010-03-26T02:36:00+0000
categories:
  -
  - mysql
  - trick

---

{% highlight mysql %}
ALTER TABLE foo ADD FOREIGN KEY(bar_id)
REFERENCES bar (id) ON DELETE CASCADE;
{% endhighlight %}

EOF