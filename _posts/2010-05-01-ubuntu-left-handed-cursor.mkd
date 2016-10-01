---
layout: post
title: '{Ubuntu} GTK Left-handed Cursor'
author: Vayn
date: 2010-05-01T22:25:00+0000
categories:
  - cursor
  - linux
  - trick
  - ubuntu

---

1、在 GNOME-Look.org 下载 [Aero Mouse Cursors with Drop Shadow](http://gnome-look.org/content/show.php/Aero+Mouse+Cursors+with+Drop+Shadow?content=67833) 这套指针中的左手指针。你也可以下载别的主题，我喜欢 Aero 指针。

2、将压缩包解开，复制到 /usr/share/icons 中。

3、打开 /usr/share/icons/default/index.theme 文件，修改&nbsp;Inherits=XXX 这一行， 把 XXX 改成刚才复制到目录的文件夹名字，如 Inherits=aero-left。

在 ubuntu 9.10 的时候我的做法是打开外观，直接把主题压缩包拖进去，但在 10.04 此方法失效了 Orz。

4、重启 X。

注意，在 GDM（登录介面）还是老样子，登录后就好了。

也许 `xsetroot -cursor_name right_ptr` 可以解决？一会儿试试。

EOF
