---
layout: post
title: '{PHP} Binary Search'
author: Vayn
date: 2010-04-20T22:14:00+0000
categories:
  - algorithm
  - php

---

{% highlight php %}
<?php
function binary_search() {

  $key = rand(1, 10000);
  $arr = range(1, 10000);

  $low = 0; # 最低位
  $high = count($arr) - 1;  # 最高位

  $counter = 0; # 计数器

  while ($key != $mid) {
    $arr_mid = floor(($low + $high) / 2); # 中间数在数组的位置
    $mid = $arr[$arr_mid];  # 中间数

    $counter++;

    if ($key > $mid) {  # 随机数大于中间数
      $low = $arr_mid + 1;
    }
    elseif ($key < $mid) {  # 随机数小于中间数
      $high = $arr_mid -1 ;
    }
  }

  echo "找到 Array[" . $arr_mid . "] => " . $key . "";
  echo "共循环" . $counter . "次";
}
?>
{% endhighlight %}

EOF
