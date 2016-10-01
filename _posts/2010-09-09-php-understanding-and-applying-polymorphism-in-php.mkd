---
layout: post
title: '{PHP} 理解和应用PHP中的多态性(Understanding and Applying Polymorphism in PHP)'
author: Vayn
date: 2010-09-09T15:46:42+0000
categories:
  -
  - jxlab
  - php
  - translation
  - tutorial

---

原文：[Understanding and Applying Polymorphism in PHP](http://net.tutsplus.com/tutorials/php/understanding-and-applying-polymorphism-in-php/) by Steve Guidetti

译者：Vayn a.k.a. VT &lt;vt at notspam elnode dot com&gt;

>教程细节
>
>程序: PHP
>
>版本: \>=5
>
>难度: 中等
>
>大概完成时间: 30 Mins.
>
>Demo下载：[Source Files](http://nettuts.s3.amazonaws.com/789_polyPHP/demo.zip)

在面向对象编程中，多态性是一件强力而基础的工具。它可以用来在你的应用里创造一个更有机的流程。本篇教程将讲述多态性的基本概念，并告诉你在PHP中使用多态性是一件多么简单的事情。

---

__什么是多态性（Polymorphism）？__

>多态性（Polymorphism）这个单词看起来很长，其实是一个非常简单的概念。
>
>“多态性描述了面向对象编程中的一种模式，这就是多个类通过分享一个通用接口而拥有不同的功能。”

多态性之美在于使用不同类工作的代码无须知道它在用哪个类，因为所有类都以相同的方法使用。

真实世界里与多态性类似的一个例子是按钮（button）。每个人都知道怎样使用一个按钮：你只需把压力施于其上。一个按钮做什么，取决于它与什么相连以及被用到什么环境中——但结果并不影响怎么使用按钮。如果你老大让你按按钮，你就已经晓得接下来要执行任务的所有信息了。

在程序世界，多态性使程序更加模组化和可扩展。你可以根据你的需要选择创建可互换的对象，替代那些描述不同动作过程的混乱的条件声明。这是多态性的基本目标。

---

__接口（Interfaces）__

多态性的一个重要组成部分是通用接口。PHP有两种定义接口的方法 ：<strong>接口（Interfaces）</strong>和<strong>抽象类（Abstract Classes）</strong>。它们均有自己的适用性，你可以把它们混合和匹配到你认为合适的类层级中。

###使用接口

接口类似于类，但接口中不能包含代码。它可以定义方法名和参数，但方法中不可有内容。任何实现接口的类必须实现接口所定义的方法。一个类可以实现多个接口。

用 &#8216;interface&#8216; 关键字来声明一个接口：

{% highlight php %}
interface MyInterface {
    // methods
}
{% endhighlight %}

用 &#8216;implements&#8216; 关键字将接口附加到一个类：

{% highlight php %}
class MyClass implements MyInterface {
    // methods
}
{% endhighlight %}

可以像在类中一样在接口中定义方法，除了不能含有主体（括号之间的部分）：

{% highlight php %}
interface MyInterface {
    public function doThis();
    private function doThat();
    public function setName($name);
}
{% endhighlight %}

我们需要把所有（接口）定义的方法严格按照其所描述的那样包含进实现（接口）的类中。（注意下面的代码注释。）

{% highlight php %}
// VALID
class MyClass implements MyInterface {
    protected $name;
    public function doThis() {
        // code that does this
    }
    private function doThat() {
        // code that does that
    }
    public function setName($name) {
        $this->name = $name;
    }
}

// INVALID
class MyClass implements MyInterface {
    // missing doThis()!
    public function doThat() {
        // this should be private!
    }
    public function setName() {
        // missing the name argument!
    }
}
{% endhighlight %}

###使用抽象类

抽象类是介于接口和类之间的混合体。它可以和接口一样定义功能（以抽象方法的形式）。由抽象类扩展的类必须实现所有抽象类定义的抽象方法。

抽象类使用和类一样的方法来声明，不过要附加 &#8216;abstract&#8216; 关键字：

{% highlight php %}
abstract class MyAbstract {
    // methods
}
{% endhighlight %}

用 &#8216;extends&#8216; 关键字将抽象类附加到一个类：

{% highlight php %}
class MyClass extends MyAbstract {
    // class methods
}
{% endhighlight %}

常规方法可以像在常规类中一样在抽象类中定义，就像抽象方法（使用 &#8216;abstract&#8216; 关键字）。抽象方法行为类似于接口中定义的方法，而且必须严格按照其所定义的那样在扩展类中实现。

{% highlight php %}
abstract class MyAbstract {
    protected $name;
    public function doThis() {
        // do this
    }
    abstract private function doThat();
    abstract public function setName($name);
}
{% endhighlight %}

---

__Step 1：确定问题__

让我们想像下你有一个Article类，负责管理网站上的文章。它包含一篇文章的信息，包括标题，作者，日期，以及类别。就像这样：

{% highlight php %}
class poly_base_Article {
    public $title;
    public $author;
    public $date;
    public $category;

    public function  __construct($title, $author, $date, $category = 0) {
        $this->title = $title;
        $this->author = $author;
        $this->date = $date;
        $this->category = $category;
    }
}
{% endhighlight %}

__注意：__ 此教程中的样本类使用了 &#8220;package_component_Class.&#8221; 命名惯例。这是把各种类分离成虚拟命名空间，以避免命名冲突的一个常用方法。

现在你想增加一个可以用不同格式输出信息的方法，例如 XML 和 JSON。你可能总想着这么做：

{% highlight php %}
class poly_base_Article {
    //...
    public function write($type) {
        $ret = '';
        switch($type) {
            case 'XML':
                $ret = '
<article>';
                $ret .= '';
                $ret .= '<author>' . $obj->author . '</author>';
                $ret .= '<date>' . $obj->date . '</date>';
                $ret .= '';
                $ret .= '</article>
';
                break;
            case 'JSON':
                $array = array('article' => $obj);
                $ret = json_encode($array);
                break;
        }
        return $ret;
    }
}
{% endhighlight %}

这个是丑陋的方法，不过至少现在能用。问问你自己未来会发生什么——在我们想增加更多格式的时候。你可以继续编辑这个类，添加更多cases，但现在你在稀释你的类。

>“OOP的一条重要原则是一个类应当只做一件事，并且把这一件事做好。”

有鉴于此，条件声明应被视为一个警戒标识，指出你的类正试图做过多不同的事情。而这正是多态性到来的原因。

我们的例子很明确地展现出两个任务：管理文章，格式化其数据。在本教程中，我们将会把格式化代码重构到多个类的新集合中，发现使用多态性是一件多么简单的事情。

---

__Step 2：定义你的接口__

我们要做的第一件事是定义接口。动脑筋思考下你的接口非常重要，因为对它的任何改变都需要改变调用代码。在样例中，我们将用一个简单的接口去定义我们的方法：

{% highlight php %}
interface poly_writer_Writer {
    public function write(poly_base_Article $obj);
}
{% endhighlight %}

它很简单；我们已经定义了一个public write() 方法来允许将一个Article对象作为一条参数。任何实现Writer接口的类都一定有这个方法。

贴士：如果你想限制那些能传递给你的函数和方法的参数的类型，你可以用类型提示，就像我们在 write() 方法中做的那样——它只允许 poly_base_Article 类型的对象。不幸地是，现在的PHP版本不支持返回类型提示，所以由你来决定如何处理返回的值。

---

__Step 3：创建你的实现__

随着你的接口被定义，是时候创造真正做事的类了。在样例中，我们想输出两种格式。因此我们有两个Writer类：XMLWriter和JSONWriter。用于从传递来的Article对象提取数据和格式化信息。

XMLWriter看起来像这样：

{% highlight php %}
class poly_writer_XMLWriter implements poly_writer_Writer {
    public function write(poly_base_Article $obj) {
        $ret = '
<article>';
        $ret .= '';
        $ret .= '<author>' . $obj->author . '</author>';
        $ret .= '<date>' . $obj->date . '</date>';
        $ret .= '';
        $ret .= '</article>
';
        return $ret;
    }
}
{% endhighlight %}

像你能从类声明中看到的那样，我们使用了 implements 关键字来实现我们的接口。Write() 方法包含针对格式化XML的功能。

接下来是我们的 JSONWriter类：

{% highlight php %}
class poly_writer_JSONWriter implements poly_writer_Writer {
    public function write(poly_base_Article $obj) {
        $array = array('article' => $obj);
        return json_encode($array);
    }
}
{% endhighlight %}

我们所有针对每种格式的代码现在被单独的类所包含。这些类每个都仅仅单独负责处理一个特定格式。你程序的其他部分都无需为了使用它而去关心它是如何工作的，感谢我们的接口吧。

---

__Step 4：使用你的实现__

随着我们的新类被定义，是时候重访我们的Article类了。所有住在原生 write() 方法中的代码都已经被析出因子到我们新类的集合了。我们所有的方法现在必须要做的是使用这些新类，比如：

{% highlight php %}
class poly_base_Article {
    //...
    public function write(poly_writer_Writer $writer) {
        return $writer->write($this);
    }
}
{% endhighlight %}

所有的方法现在要做的是接受Writer类（也就是任何实现Writer接口的类）的对象，调用它的 write() 方法，把它自己（$this）做为一个参数传递，然后直接发送它的返回值到客户端代码。它们不再需要担心格式化代码的细节，可以专注于它的主要任务。

###获得一个Writer

你也许会奇怪你最初是从哪得到一个Writer对象，从你需要传递一个对象到这个方法。这取决于你，而且有多种策略。例如，你也许会用一个工厂类去抓取请求数据和创建对象：

{% highlight php %}
class poly_base_Factory {
    public static function getWriter() {
        // grab request variable
        $format = $_REQUEST['format'];
        // construct our class name and check its existence
        $class = 'poly_writer_' . $format . 'Writer';
        if(class_exists($class)) {
            // return a new Writer object
            return new $class();
        }
        // otherwise we fail
        throw new Exception('Unsupported format');
    }
}
{% endhighlight %}

就像我说的，根据你的需求可以采用多种其他的策略。在本例中，一个请求变量可以选择要使用的格式。它从请求变量构造一个类名，检测此类是否存在，然后返回一个新的Writer对象。如果那个类名下什么都不存在，一个异常被抛出，让客户端代码解决该做什么。

---

__Step 5：信息汇总__

随着一切准备就绪，下面是我们的客户端代码如何把它们接合到一起：

{% highlight php %}
$article = new poly_base_Article('Polymorphism', 'Steve', time(), 0);

try {
    $writer = poly_base_Factory::getWriter();
}
catch (Exception $e) {
    $writer = new poly_writer_XMLWriter();
}

echo $article->write($writer);
{% endhighlight %}

首先我们创建一个有效的样本Article对象，然后我们尝试从工厂（the Factory）获得一个Writer对象，如果一个异常抛出就回滚到缺省类（XMLWriter）。最终，我们把Writer对象传递给我们的 Write() 方法，打印结果。

---

__结论__

在本篇教程，我提供给你了一份多态性的初步介绍，并且解释了PHP的接口。我希望你意识到我只是向你展示了一个关于多态性的潜在用例。实际上有许许多多的应用。在你的OOP代码中，多态性是一种优雅的从丑陋的条件声明中逃离的方法。它遵从于组件分离原则，而且它是许多设计模式所必须的组成部分。如果你有许多疑问，不要犹豫，[在评论中提出你的问题吧！](http://net.tutsplus.com/tutorials/php/understanding-and-applying-polymorphism-in-php/#respond)

EOF

