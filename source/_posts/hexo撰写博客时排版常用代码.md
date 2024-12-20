---
title: hexo撰写博客时排版常用代码
date: 2024-11-29 11:20:11
tags: 建站
categories: 建站
urlname: paiban
---
# 前言
这篇文章收录一些我排版时常会遇到的问题，以及解决方法。
用来用去还是直接在vscode里面markdown文章最方便，因为obsidian那个排版布局怎么看怎么奇怪，怎么看怎么丑，标题太大了！然后标题和标题之间间距也不知道该怎么自定义。
思前想后未来可能还是会直接vscode排版，反正hexo s以后可以实时渲染。
## callout栏
- 很多时候需要对正文内容进行解释，我会比较喜欢用callout栏，在butterfly主题中
默认的灰色callout栏是这样的：
```
{% note %}
{% endnote %}
```
{% note %}
默认的callout栏
{% endnote %}
- 我个人通常喜欢用蓝色的callout栏：
```
{% note info no-icon %}
{% endnote %}
```
{% note info no-icon %}
蓝色的callout栏
{% endnote %}
- 除此之外，其他的callout栏可以见官方的主题文档教程，官方命名为[**外挂标签**](https://butterfly.js.org/posts/ceeb73f/)。

## 时间线（更新于2024.12.13）
在[关于](https://blog.econfinny.com/about/)界面的教育经历中，我想使用时间线来表示我的教育经历，查资料后方法如下：

```
{% timeline 教育经历, green %}

<!-- timeline 2021.9-2025.6 -->

中央民族大学······经济学院······经济学

<!-- endtimeline -->
<!-- timeline title -->

xxxxx

<!-- endtimeline -->

{% endtimeline %}
```

## Tabs板
```
{% tabs Unique name, [index] %}

<!-- tab [Tab caption] [@icon] -->

Any content (support inline tags too).

<!-- endtab -->

{% endtabs %}
```

---
## 公式问题
今天在修改索洛模型一章笔记的时候遇到了一点问题，我想要在长等号上输入内容，但是markdown语法中似乎不能调latex的宏包，不确定能不能用以下代码：
```
\xlongequal
```
渲染出来如下
$$
A \xlongequal{xxxxxxxx} B
$$

我还在知乎上看到一个有趣的解决方案：可以采用多个等号连接，用\!减小其间距直至间隙消失，如果要在上下编辑内容可以使用overset和underset。
```
\overset{\text{text}}{=\!=\!=}
```
渲染出来如下：
$$
\overset{\text{text}}{=\!=\!=}
$$