---
layout: post
title: '{PHP} PHP 快速分析器(PHP Quick Profiler)'
author: Vayn
date: 2010-09-26
categories:
  - PHP
  - translation

---
原文：[PHP Quick Profiler](http://particletree.com/features/php-quick-profiler/) By Ryan Campbell

翻译：Vayn a.k.a. VT &lt;vayn at(not spam) vayn dot de&gt;

在我们公司，[代码审计](http://en.wikipedia.org/wiki/Code_review)在制作优质软件的开发进程中是一个不可分割的部分。我们开发 Wufoo 的时候选择了 [mentor style approach](http://www.codinghorror.com/blog/archives/001229.html)，也就是一个开发人员在一个部分工作一段时间，然后把这个部分传递给一个更有经验的开发者进行审计。我们很喜欢这个方法，因为这意味更多的开发者慢慢熟悉不同代码层服务的基础。更重要地是，他们充当着对抗安全漏洞、内存泄漏、低效查询（poor queries）、复杂文件结构（heavy file structures）等额外保障的角色。不幸地是，这些审计也非常消耗时间，在一个小型团队中有时会对审计者造成不便——他也有他们自己的 todo list 要完成。

[![HTML Form Builder](http://particletree.com/images/ads/wufooad10.gif)](http://wufoo.com/)

代码审计与同样排在工作表上的开发需求相互冲突，我们发现我们是在一而再再而三的重复同样的任务。我们花了大把时间输出查询、内存统计和对象到浏览器，只是为了查看它们是如何使用在代码中的。为了减少这样的重复，我们花费一些时间创造了一个被称为 __PHP 快速分析器(PHP Quick Profiler)__ 的工具——简称PQP。这是个小工具（想象一下 Firebug for PHP），能根据有关信息为开发人员进行分析和调试，而无需他们在代码里添加一大堆编程开销（programmatic overhead）。现在我们只需切换一个配置设置为 true，我们的审计人员就通过自动化工具来帮助建立一个更快更一致的审查过程（Now，we only need to toggle one config setting to true and our reviewers have access to an automated tool to help create a faster and more consistent review experience）。自从任何人都可以使用PQP，它也给了原始开发人员启示——他们的代码在审查前卡到哪了（Since anyone can use it，PQP also gives the initial developer an idea of where their code stands before the review.）。

我们已经在 Wufoo 项目上使用了PQP一段时间。它是非常有用，所以我们决定花点时间把所有东西打包，写一些文档，然后把PQP提供给所有人使用。

###看看PQP怎样工作

我们已经做好了一个[在线实例](http://particletree.com/examples/pqp/)展示一个开启了PQP的到达页面。分析器包含了 5 个标签页，分别显示记录消息（logging messages），测量执行时间（measuring execution time），分析查询（analyzing queries），内存使用（revealing memory used）和包含页面（showing the files included）。

<a href="http://particletree.com/examples/pqp/"><img src="http://farm4.static.flickr.com/3625/3463457814_0a558911e9_o.png" alt="PQP" width="596" /></a>

感谢 Kevin 的帮助，他做了件伟大的工作——设计和压缩了界面，这样就不用添加外部的 CSS 和脚本以让 PQP 良好显示。PQP 可以运行在 Internet Explorer 6 及更高的版本，以及 Firefox 和 Safari 上。

###开始使用

我们提供一个包含 PQP 全部安装文件和基本安装说明的 zip 文档。

 __Download:__  [pqp.zip](http://particletree.com/mint/pepper/orderedlist/downloads/download.php?file=http%3A//particletree.com/files/pqp/pqp.zip)

你下载了 zip 包后将其解压，然后把全部文件上传至一个支持 PHP 的 web 服务器。用浏览器访问文件所在目录，你会看到一个和上文的在线实例一样的例子。你会看到，除了数据库标签之外的其他标签都工作良好，数据库标签需要一些额外的设置。

当你确定样例能运行，下一步是把它与你自己的项目整合到一起。注意： __把PQP的文件夹直接放入你项目的目录里并不会工作。__ 这是由于演示的代码有 5 个不同的方面，你可能需要用和我们不一样的做法来处理这些情况。也就是说整合其实很简单，你只要跟着下面每一条指导进行设置就能立刻运行PQP了。

###在你的代码中使用 PQP

让 PQP 工作最简单的方法，是在你想显示 PQP 的代码中包含 PhpQuickProfiler.php 文件。这样单独包含可以让控制台、内存记录和文件记录工作。想要数据库和速度记录工作需要额外设置，我们一会儿讲解。现在，缺省记录可以很好的工作，但是只包含文件不会把信息显示在屏幕上。想把信息显示在屏幕上，需要一些包含文件后会发生什么的知识。

当代码被执行，运行细节会被 PQP 记录和分析。当代码执行完毕，PQP 也工作完毕，并且把输出显示到屏幕上。棘手的部分是你得知道代码何时结束，在理想状态下这个工具应该是能在开发人员尽可能少修改的情况下工作。在这个例子中，我们判断代码结束工作的方法是查看父对象的析构函数何时运行。因此时间表会是这样：

<ul>
<li>目标页构造函数声明一个 PhpOuickProfiler 的实例。</li>
<li>目标页执行全部所需代码。</li>
<li>目标页的析构函数告诉 PhpQuickProfiler 清理并显示输出。</li>
</ul>

当然，这样安装会让 PQP 一直显示输出，这对产品而言并不理想。为了让它更有用，我们在代码中加入了一个配置标识（debugMode = true），在显示之前检查这个标识有没有被设置为 true。下面的样本类执行了我们刚才所讲的步骤：

{% highlight php %}
class ExampleLandingPage {

    private $profiler;
    private $db;

    public function __construct() {
        $this->profiler = new PhpQuickProfiler(PhpQuickProfiler::getMicroTime());
    }

    public function __destruct() {
        if($debugMode == true) $this->profiler->display($this->db);
    }

}
{% endhighlight %}

###记录到控制台

通过上面的代码，PQP 已经设置完毕静待使用了。我们可以开始引用帮助函数，从记录开始。控制台记录比 `echo` 声明更进一步，使用 `print_r` 压缩和格式化输出。这对审计人员很有利，因为它提供了一种显示调试信息的方法，这种显示方法不会把页面的布局撑破。把数据输出到控制台只需静态地调用函数：

{% highlight php %}
Console::log($data);
{% endhighlight %}

静态函数调用接受任何数据类型，只要 PhpQuickProfiler.php 类被包含的时候就有效。我们选择用静态调用的方式实现，以便类不必在使用前实例化。下面的静态调用是我们把记录历史存入一个 PHP 全局变量。如果你希望不用全局变量，可以把 Console.php 类实例化这样它会把记录作为一个成员变量保存。但一如这样，这个类只是充当着全局 PHP 变量的包装器（Wrapper）。

在记录变量之上，控制台还有四个附加函数。

{% highlight php %}
Console::logError($exception);
Console::logMemory();
Console::logMemory($variable, $name);
Console::logSpeed();
{% endhighlight %}

让我们从 logError() 开始。记录一个错误对显示有关 PHP 异常信息非常有用。在我们的代码中，我们会用一个 catch 块处理错误，这样能让异常沉默。我们这样做是因为我们想忽略错误，让它不会影响到用户做事。现在，在开发中还是了解被抛出的异常比较好，因此在 catch 块里调用 logError() 可以让信息向下面这样显示在控制台：

{% highlight php %}
try {
    // Execute non critical code
}
catch(Exception $e) {
    Console::logError($e, 'Unable to execute non critical code');
}
{% endhighlight %}

另外，控制台可以通过使用 PHP 内置的帮助函数提供更多的值。比如说，记录 debug_backtrace() 将打印脚本指定时间点上的有关信息。PHP 提供一些魔术常量，比如 ` __LINE__`, `__FILE__`, `__FUNCTION__`, `__METHOD__` 和 `__CLASS__ `，也允许打印脚本数据。看看下面的截图，里面有一些这方面的示例用法：

<a href="http://www.flickr.com/photos/wufoo/3465935161/"><img src="http://farm4.static.flickr.com/3557/3465935161_9cac2d37f6_o.png" alt="PQP" width="596" /></a>

###观察内存使用

Object oriented PHP 是一种看起来很漂亮的东西，但是涉及内存使用的时候有几个明确的问题需要牢记。这些问题会在处理递归输出的时候易于引起一些状况出现（比如：输出到 Excel），如果创造对象的时候有内存泄漏或对象没有被恰当地销毁。所有这些会导致意料之外的资源使用和致命错误，加剧恶化最终用户的使用。

使用有内存管理辅助的调试器可以显示脚本可用的最大内存容量。`memory_get_peak_usage()` 在数据起始的地方内置了一个简单的调用。有关内存使用方面的系统设置（通过 ` ini_get()`）也会被显示出来，以便查看还有多少回旋余地。如果综述还不够，你可以利用特定时间点的内存调用穿过你的资源使用（ you can drill down into your resource usage with a point in time memory call.）。

{% highlight php %}
Console::logMemory();
Console::logMemory($variable, $name);
{% endhighlight %}

在你的代码中不传任何参数地调用 logMemory() 将输出某个函数被调用时 PHP 的当前内存使用量。这是个完美的观察你代码中循环的方法，这个方法可以观察每次迭代的时候内存的增长。同样，一个变量和一个名字可以传给这个函数。这样做会在控制台输出变量的内存使用情况。知晓脚本正在占用内存真是奇妙，知晓哪一个变量在占用内存就可以修正问题。看一下下面截图，这个例子展示了字符串链接（string concatenation）在慢慢吞掉内存。

<a href="http://www.flickr.com/photos/wufoo/3463780326/"><img src="http://farm4.static.flickr.com/3615/3463780326_bfffe5cb13_o.png" alt="PQP" width="596" /></a>

###失控的包含

类似内存失控，包含文件（特别是在大型项目）可以非常快速地在接管你的 app 前增殖。更糟地是，太多的包含不会抛出内存使用造成的系统错误（hard errors）。取而代之的是，页面变慢，资源在每次处理请求中被吃掉。避免这个陷阱很简单——只要确保相同的文件不被多次包含，捕捉任何不必要文件的过度包含。

<a href="http://www.flickr.com/photos/wufoo/3466762904/"><img src="http://farm4.static.flickr.com/3555/3466762904_45da31d7d1_o.png" alt="PQP" width="596" /></a>

PQP 的文档标签通过调用 `get_included_files` 显示了全部文件的包含情况和文件大小的总和。单个文件的名称和大小也输出到控制台，以便容易地查看。最大的包含文件被标注在左侧，这样就清晰地指出一个正在使用的大型库文件是否不应该被使用。比如，在 Wufoo 项目上我们发现有一个脚本一直包含它不需要的 [htmLawed](http://www.bioinformatics.org/phplabware/internal_utilities/htmLawed/index.php)，一个大小还算过得去的文件（a fairly decent sized file）。

同样，请牢记，自动加载的类或使用 `require_once` 通常可以减轻任何由文件包含引起的问题。这就是说，意识到这个问题就不会产生危害（it never hurts to be aware of the situation），特别是当你在使用插件，旧代码，或者借来的代码（borrowed code）。

###页面执行时间
我们总是在谈到性能考虑（理所当然地）的时候强调数据库优化（Emphasis is always placed on database optimization when it comes to performance considerations (rightfully so)），但这不意味着 PHP 执行时间就被忽略了。计算页面加载时间的标准方法是找到脚本开始和结束的时间之间的时间差。这让整合调试器到你自己的项目变得棘手。从父页面的析构调用调试器（Since the debugger is called on the destruction of the parent page），我们了解脚本什么时候结束。但是因为每个项目不同，开始时间可以多种多样。你下载的示例代码用父对象的构造函数调用 PQP 的 `getMicroTime()` 来设置开始时间。此方法可以在大多数情况下工作，但如果你有一大堆代码在父对象构造前运行，务必在需要的时候明确设置开始时间。

{% highlight php %}
$this->profiler = new PhpQuickProfiler(PhpQuickProfiler::getMicroTime());
{% endhighlight %}

给出页面执行时间后，下一步将是找出信息中的意义。快速扫一眼，看看时间是否在可以接受的范围内。假设不在，我们该如何调试解决这个问题？使用调试器的查询部分，我们可以排除查询执行时间（下一节再详细解释）。如果查询不是问题，那么某部分脚本肯定是。我们通过控制台来找到问题。

{% highlight php %}
Console::logSpeed();
{% endhighlight %}

调用 `logSpeed()` 会告诉我们脚本花了多长时间执行到指定时间点。例如，想象一下我们有一个从数据库构造复杂对象的[工厂类](http://en.wikipedia.org/wiki/Factory_object)。我们还有一个从数据库返回对象名称的[对象引擎](http://en.wikipedia.org/wiki/Data_Access_Object)。要显示 100 个对象名到荧幕上，我们可用工厂或引擎。不过使用引擎的话会更快一些，因为我们只需要名字，不需要对象创建的逻辑处理。如果开发人员使用工厂，`logSpeed()` 会在显示循环的过程中揭露减速，最终鉴别出问题所在。

[![PQP Execution Time](http://farm4.static.flickr.com/3489/3463039665_7c65f67535_o.png)](http://www.flickr.com/photos/wufoo/3463039665/)

这儿有个类似的笔记，我们最近发现 [xCache](http://xcache.lighttpd.net/) 将我们的页面执行时间提升了大约 60%。这个结论已经经过基准测试比较，我们所有的开发人员都使用 PQP 对代码进行了快速测试。

###数据库活动一览

让调试器报告数据库信息是将 PQP 整合到你自己项目中最难的部分。除非你的数据库采用某种方法进行抽象的交互，接下来的步骤才会有效。我们不久前讨论过[一个简单的数据库类](http://particletree.com/features/database-simplicity-with-class/)（ We talked about a simple database class awhile back），同时释出了一个带例子的 zip 下载（ __MySqlDatabase.php__  —— 你可以按照代码看到一个完整的实现）。这个类之所以重要的原因是每条查询的相关信息必须在其发生时储存起来，而且这个类让程序员不用添加附加工作就能对每条查询进行同样的分析（ and a class allows the queries to each go through the same analysis without additional work by the programmer）。

当查询被调用，数据库包装类把查询储存并记录时间。简化代码看起来是这样的：

{% highlight php %}
function query($sql) {
    $start = $this->getTime();
    $rs = mysql_query($sql, $this->conn);
    $this->logQuery($sql, $start);
    return $rs;
}

function logQuery($sql, $start) {
    $query = array(
        'sql' => $sql,
        'time' => ($this->getTime() - $start)*1000
    );
    array_push($this->queries, $query);
}
{% endhighlight %}

利用此概念，这个类把所有有效的查询信息都放在一个数组里。然后，调试器可以使用数组，打印出信息。打印出的是最近储存的查询信息自身和执行时间。执行时间不是精确的——它是直到 PHP 处理记录集的时间，如果连接到数据库存在网络延迟的话它会比查询时间慢一点。想看看查询是否比计划中影响了更多记录，比如数据库正在被复制或者对 SQL 注入开放，浏览一下查询时间是个既简单又有用的方法，

添加到调试器的最有用的数据库特性之一是调试器能 __解释__ 每个查询运行。每条查询使用[解释](http://dev.mysql.com/doc/refman/5.0/en/explain.html)声明再次运行，结果会被显示到查询下方。这样就让确定查询是否恰当的使用它们的索引变得容易了。

[![PQP Execution Time](http://farm4.static.flickr.com/3633/3463902088_5d9738164c_o.png)](http://www.flickr.com/photos/wufoo/3463902088/)

###结束语

这个调试工具的最终目标，是将有用信息的摘要以一种自动化格式的方法展示出来。大抵上，是找出需要手工劳动和思考的代码的某些方面（Usually, finding out about certain aspects of the code would require manual work and thought.）。然后如果碰到一个问题，调试人员希望通过使用那些扩展控制台函数更容易地缩小问题。考虑到这一点，这个工具只是一种应急手段，绝不是意味着为开发人员提供取代标准、全面可行的程序（With that in mind, this tool is just an aid and is in no way meant to replace the standard, thorough procedures available to developers.）。我们鼓励开发者使用[slow query log](http://dev.mysql.com/doc/refman/5.1/en/slow-query-log.html)，[PHP error log](http://www.addedbytes.com/php/php-ini-guide-error-handling-and-logging/)以及成熟完整的[调试器和分析器](http://particletree.com/notebook/silence-the-echo-with-macgdbp/)这些高等级查看的补充工具（The slow query log, PHP error log and full fledged debuggers and profilers are encouraged on top of this high level view to supplement the tools available to developers.）。

（完）

译者：自觉翻译的不怎么样，不过大致上还是传达原文的意思了。如果哪里翻译的有问题敬请谅解，并请予以雅正。

EOF