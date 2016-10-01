---
layout: post
title: '{PHP} Calculating Relative Path'
author: Vayn
date: 2010-05-24T15:30:00+0000
categories:
  -
  - php

---

写一个函数，算出两个文件的相对路径
如 $a = '/a/b/c/d/e.php';
$b = '/a/b/12/34/c.php';
计算出$b相对于$a的相对路径应该是 ../../c/d

---

对于此题的某一种答案，我分析了下，把分析后的代码放在这里供参考：
{% highlight php %}
<?php
/*
function foo13($path, $consult) {
  if($path[0] == '/') {
    $path = '/'.$path;
  }

  if($consult[0] == '/') {
    $consult = '/'.$consult;
  }

  $i = $k = 0;

  while($path[$i] == $consult[$i]) {
    if($path[$i] == '/') {
      $k = $i;
    }
    $i++;
  }

  if($n = substr_count(substr($path, $k+1), '/')) {
    return str_repeat('../', $n).substr($consult, $k+1);
  }

  return './'. substr($consult, $k+1);
}
 */

$a = '/a/b/c/d/e.php';
$b = '/a/b/12/34/b.php';

// 这段没看出有什么用
if($a[0] == '/') {
  echo $a = '/'.$a;
  echo "\n";
}

// 同上
if ($b[0] == '/') {
  echo $b = '/' . $b;
  echo "\n---\n";
}

$i = $k = 0;

// 将 2 个路径进行对比，直到不同为止
while ($a[$i] == $b[$i]) {
  // 当循环到/时，说明深入到此层目录，改变记录器 $k 的数值
  if ($a[$i] == '/') {
    echo $k = $i;
    echo "\n";
  }
  $i++;
}
echo "---\n";

// 判断是否还有 /
if (substr_count(substr($a, $k+1), '/')) {
  // 显示 $a 剩余内容，也就是和 $b 不同的路径
  echo substr($a, $k+1) . "\n";
  // 计算 $a 剩余路径的目录数量
  echo $n = substr_count(substr($a, $k+1), '/');
  echo "\n---\n";

  // 将剩余路径的目录转化为 ../
  // 找出 $b 中和 $a 不同的路径
  // 将两者接合输出，显示最终路径
  echo str_repeat('../' , $n) . substr($b, $k+1);
}
else {
  // 基本和上面相同，只是为了分析方便才显示出来
  echo substr($a, $k+1) . "\n";
  echo $n = substr_count(substr($a, $k+1), '/');
  echo "\n---\n";

  // 因为在同一目录下，所以直接用 ./
  echo './' . substr($b, $k+1);
}

?>
{% endhighlight %}

EOF

