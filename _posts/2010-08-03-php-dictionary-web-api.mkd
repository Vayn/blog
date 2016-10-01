---
layout: post
title: '{PHP} Dictionary Web API'
author: Vayn
date: 2010-08-03T03:32:16+0000
categories:
  -
  - jxlab
  - php
  - share

---

先来个 Google Translate API 自制版

__Notice:__ This class has been out of data since Google Translate uses Ajax. [Google Translate™ API PHP Wrapper](http://code.google.com/p/gtranslate-api-php/) is a better solution if you want to use Google Translate API. (updated on Sep 24 2010)

[http://labs.involutive.com/2007/06/05/google-translator-api-php-5-class/](http://labs.involutive.com/2007/06/05/google-translator-api-php-5-class/)

{% highlight php %}
<?php
class Google_API_translator {
    public $opts = array("text" => "", "language_pair" => "en|it");
    public $out = "";

    function __construct() {}

    function setOpts($opts) {
        if($opts["text"] != "") $this->opts["text"] = $opts["text"];
        if($opts["language_pair"] != "") $this->opts["language_pair"] = $opts["language_pair"];
    }

    function translate() {
        $this->out = "";
        $google_translator_url = "http://google.com/translate_t?langpair=";
        $google_translator_url .= urlencode($this->opts["language_pair"])."&#038;";
        $google_translator_url .= "text=".urlencode($this->opts["text"]);
        $gphtml = $this->getPage(array("url" => $google_translator_url));
        preg_match('/(.*?)/', $gphtml, $out);
        $this->out = utf8_encode($out[0]);
        return $this->out;
    }

    function getPage($opts) {
        $html = "";
        if($opts["url"] != "") {
            $ch = curl_init($opts["url"]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($ch, CURLOPT_TIMEOUT, 15);
            $html = curl_exec($ch);
            if(curl_errno($ch)) {
                $html = "";
            }
            curl_close ($ch);
        }
        return $html;
    }
}

// Example
$g = new Google_API_translator();
$g->setOpts(array("text" => "ciao", "language_pair" => "it|en"));
$g->translate();
echo $g->out;
?>
{% endhighlight %}

在线词典 API：

dict.cn: http://api.dict.cn/ws.php?utf8=true&#038;q=#word

XML 格式。Project Vaynwords 之前一直在用，说实话查询质量一般。

爱词霸: http://dict-co.iciba.com/api/dictionary.php?w=#word

XML格式。

QQ 词典: http://dict.qq.com/dict?q=#word

JSON 格式。

