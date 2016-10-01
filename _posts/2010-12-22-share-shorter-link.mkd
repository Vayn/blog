---
layout: post
title: '{Share} Shorter Link'
author: Vayn
date: 2010-12-22
categories:
  - Share
---

有段时间没写 blog 了，拿个练手的玩意充数吧……下面这段脚本叫 Shorter，顾名思义就是用来生成短链的。

使用方法呢，你要先保存这段代码，然后去 [dlvr.it][1] 申请一个 API Key，替换脚本中的 YOURAPIKEY。[dlvr.it][1] 是一个很有趣的网站，它可以自动把你的 blog 文章地址转为短链后分发到 Twitter、Facebook 等等。不过我今天不是介绍 [dlvr.it][1] 的，而是利用它的 API 来生成短链。

之所以用 [dlvr.it][1] 是因为 [dlvr.it][1] 提供 custom domain 绑定，也就是说你可
以用它们的 API 提供自己的短链缩短服务，而且这个功能是免费的！只要一个域名就够了，
不用买空间架软件，对于我这种懒人最合适不过啦。

接下来分两种情况：

1、你用的是 Windows。这段脚本在理论上是能在 Windows 上运行的只要你装了 Python，但是我也没试过，
而且自动复制功能肯定用不成……

2、如果用的是 Linux就简单了，确保你的系统安装有 Python。That's all.

先在终端输入 `chmod +x Shorter` 注意 Shorter 是脚本的名字，你也可以改成别的什么。
这条命令的作用是让 Shorter 能直接以命令方式执行，也就是说之后你就可以直接用
`./Shorter` 运行脚本，而不用先来个 python 这么麻烦。我一般习惯把自制脚本都放到 /usr/local/bin ，这样直接打 Shorter 连 ./ 都省了。

Shorter 有两种玩法：1是 `./Shorter Url`，也就是命令后接超链接（有没有 http:// 都
没关系）；第2种是直接 `./Shorter`，会有提示让你输入 Url。

然后回车，等1秒（或几秒）你就能看到类似这样的提示：

>Your link has been shortened as [http://vayn.de/BwP4D](http://vayn.de/BwP4D)
>
>and it has been copied into clipboard, you can paste it anywhere!

没错，网址已经自动存在于你的剪贴板了，现在你可以四处分发你的短链了！当然如果你是 Windows 用户就麻烦点手动复制吧，囧rz。

废话完毕，上代码：

{% highlight python %}
#!/usr/bin/python
# -*- coding:utf-8 -*-
import os, sys
import urllib2, urllib
from xml.etree import ElementTree
from lxml.html

key = 'YOURAPIKEY' # 注意替换
try:
    url = sys.argv[1]
except IndexError:
    url = raw_input("Please type Url you want to shorten: ")
url = 'http://' + url.replace('http://', '')

page = lxml.html(url)
title = page.find(".//title").text.strip().encode('utf-8')

param = urllib.urlencode([('key', key), ('url', url)])
req = urllib2.Request('http://api.dlvr.it/1/shorten.xml')
ch = urllib2.urlopen(req, param)
data = ch.read()

xmldoc = ElementTree.fromstring(data)
shorten = xmldoc.getiterator("shorten")[0].attrib['short']

clip = 'echo "%s: %s" | xsel -b -i' % (title, shorten)
os.system(clip)

text1 = 'Your link has been shortened as %s' % shorten
text2 = 'has been copied into clipboard, you can paste it anywhere!'

screen_width = 80
text_width = len(text2)
dist = text_width - len(text1)
box_width = text_width + 6
left_margin = (screen_width-box_width) // 2

print ' ' * left_margin + '+'   + '-' * (box_width - 2) +   '+'
print ' ' * left_margin + '|  ' + ' ' * text_width      + '  |'
print ' ' * left_margin + '|  ' +       text1+' '*dist  + '  |'
print ' ' * left_margin + '|  ' +       text2           + '  |'
print ' ' * left_margin + '|  ' + ' ' * text_width      + '  |'
print ' ' * left_margin + '+'   + '-' * (box_width - 2) +   '+'
{% endhighlight %}

接下来是 PHP 吹替版……

{% highlight php%}
#!/usr/bin/php -q
<?php
$url = '';
$key = 'YOURAPIKEY';

if (!isset($argv[1])) {
    echo "Please type url you want to shorten: ";

    $tty = shell_exec('stty -g');
    shell_exec('stty icanon min 1 time 0');

    while (True) {
        $char = fgetc(STDIN);
        if ($char === "\n") {
            break;
        }
        elseif (ord($char) === 127) {
            if (strlen($url) > 0) {
                fwrite(STDIN, "\x08\x08");
                $url = substr($url, 0, -1);
            }
        }
        else {
            $url .= $char;
        }
    }
    shell_exec('stty ' . $tty);
}
else {
    $url = $argv[1];
}
$url = 'http://' . str_replace('http://', '', $url);

$command = "curl -sd 'key={$key}' -d 'url={$url}' 'http://api.dlvr.it/1/shorten.xml'";
$ret = shell_exec($command);

$xml = simplexml_load_string($ret);
$attributes = $xml->shorten->attributes();
$short = $attributes['short'];

$clip = "echo \"$short\" | xsel -b -i";
shell_exec($clip);

echo "\nYour link has been shortened as {$short}\r
and it has been copied into clipboard, you can paste it anywhere!\n";
?>
{% endhighlight %}

update: 貌似 xfruits 歇菜了？唉，又一家 web 2.0 服务关门。

update: xfruits 又能访问了，不过不打算再用了。另外把 python 版的输出稍微美化了
下。

2011-01-17: 给 Python 版 Shorter 添加网页标题解析。

EOF

[1]: http://dlvr.it
