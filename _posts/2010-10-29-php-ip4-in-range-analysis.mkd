---
layout: post
title: '{PHP} 分析 ip4_in_range 函数'
author: Vayn
date: 2010-10-29
categories:
  - php
---

在 [Leechael](http://yan-yan.info) 同学那里看到一个很有趣的检查 ip 范围的函数，刚好对这方面不熟，权当学习了。

{% highlight php %}
<?php
function ip4_in_range ($ip, $start, $end = null) {
    if (func_num_args() === 2) {
        if (strpos($start, '*') !== false) {
            $end = str_replace('*', '255', $start);
            $start = str_replace('*', 0, $start);
        } elseif (strpos($start, '/') !== false) {
            $ip_dec = ip2long($ip);
            list($range, $netmask) = explode('/', $start);
            $netmask_dec = ~ (pow(2, (32 - intval($netmask))) - 1);
            $range_dec = ip2long($range);
            return (($ip_dec & $netmask_dec) === ($range_dec & $netmask_dec));
        } else {
            trigger_error('ip4_in_range: Parameter $start maybe in invalid format.');
            return false;
        }
    }
    extract(array_map(function ($ip) {
        return (float) sprintf("%u", ip2long($ip));
    }, compact('ip', 'start', 'end')));
    if ($start > $end) {
        list($start, $end) = array($end, $start);
    }
    return ($ip >= $start && $ip <= $end);
}
?>
{% endhighlight %}

以上是全部函数片段，以下开始分析。

该函数有 3 个参数，$ip, $start, $end。$ip 即需要检测的 ip 地址。$start 可以是 CIDR 地址块、最后一段带 wildcard 的 ip 地址、具体的 ip 地址。$end 是另一个具体 ip 地址。示例用法如下：

+ `ip4_in_range('10.0.1.13', '10.0.1.0/24');`
+ `ip4_in_range('10.0.1.13', '10.0.1.*');`
+ `ip4_in_range('10.0.1.13', '10.0.1.10', '10.0.1.20');`

Okay，搞清参数之后，接下来正式分析函数。

{% highlight php %}
<?php
function ip4_in_range ($ip, $start, $end = null) {
    if (func_num_args() === 2) { // 传入 2 个参数的情况
        if (strpos($start, '*') !== false) { // 传入的 $start 是 wildcard 的情况
            // 将最后一段的 wildcard 换成 255
            $end = str_replace('*', '255', $start);

            // 将最后一段的 wildcard 换成 0
            // 这样就构成了一个合法的 ip 范围
            $start = str_replace('*', 0, $start);
        } elseif (strpos($start, '/') !== false) { // 传入的 $start 是 CIDR 地址块的情况
            // 将 $ip 转换为整数
            $ip_dec = ip2long($ip);

            // 把 $start 分为 $range 和 $netmask（掩码） 两部分
            list($range, $netmask) = explode('/', $start);

            // 把 CIDR 形式的 $netmask 用 intval 转换（我觉得好像没必要）
            // 然后用公式 2^(32-netmask)-1 算出不可用的范围（我觉得应该减2，Hmm）http://goo.gl/VWfS
            // 再用位运算符 ~ 按位非，获得反值（这块不明白，求解）
            // 最后获得了 netmask
            $netmask_dec = ~ (pow(2, (32 - intval($netmask))) - 1);

            // 把 $range 也转换成整数形式
            $range_dec = ip2long($range);

            // 将 ip 地址与 netmask 做与运算，同时 range 也与 netmask 做与运算
            // 这样我们得到两个网络标识，将这两个网络标识做比较
            // 如果相同，说明 ip 与 range 在一个网络段，否则不在
            // 根据比较结果返回 true 或 false 
            return (($ip_dec & $netmask_dec) === ($range_dec & $netmask_dec));
        } else {
            // 此处略过
            trigger_error('ip4_in_range: Parameter $start maybe in invalid format.');
            return false;
        }
    }
    // 此处接传入指定 ip 作为 $start 和 $end 以及 wildcard 的情况
    // 看起来有点复杂，从内到外分析好了
    //
    // 首先创造一个匿名函数，用来返回整数形式 ip 地址的浮点数
    // 再用 compact 创造一个关联数组，三个元素分别为 $ip, $start, $end
    // 然后用 array_map 分别将其换为浮点整数
    // 最后用 extract 把三个元素还原为 $ip, $start, $end
    extract(array_map(function ($ip) {
        return (float) sprintf("%u", ip2long($ip));
    }, compact('ip', 'start', 'end')));

    // 如果 $start 比 $end 大就把两者倒过来
    if ($start > $end) {
        list($start, $end) = array($end, $start);
    }

    // 若 $start <= $ip <= $end，说明 $ip 在给定范围
    // 最终，根据比较结果返回 true or false
    return ($ip >= $start && $ip <= $end);
}
?>
{% endhighlight %}

我关于 ip 地址这方面的知识是现学的，所以……如有错处，万万还请指出！谢谢。

EOF