---
layout: post
title: '{Linux} 一些命令'
author: Vayn
date: 2010-03-15T04:33:00+0000
categories:
  -
  - linux
  - trick
  - ubuntu


---
自动挂载 NTFS 分区

{% highlight sh %}
$ sudo fdisk -l

$ sudo mkdir /media/winDisk

$ sudo vim /etc/fstab

/dev/sda1 /media/winDisk ntfs-3g defaults,locale=zh_CN.UTF-8 0 0

$ sudo remount -a
{% endhighlight %}

备份

{% highlight sh %}
tar -cvpzf /backup/backup.tgz --exclude=/proc --exclude=/lost+found --exclude=/mnt --exclude=/sys --exclude=/media /
{% endhighlight %}

还原

__注意：切勿轻易尝试使用此命令！__

{% highlight sh %}
tar -xvpzf /backup/backup.tgz -C /

mkdir proc

mkdir lost+found

mkdir mnt

mkdir sys

mkdir media
{% endhighlight %}

Permanent Alias

{% highlight sh %}
vim ~/.bashrc

if [ -f ~/.bash_aliases ]; then

. ~/.bash_aliases

fi

echo "alias ls='ls -al'" >> ~/.bash_aliases
{% endhighlight %}

/etc/bashrc

/etc/profile

在 xampp 中安装 PEAR Package

Go to /opt/lampp/bin

$ sudo ./pear install package-name

EOF