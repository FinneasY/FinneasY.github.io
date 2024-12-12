---
title: hexo撰写博客时排版常用代码
date: 2024-11-29 11:20:11
tags: 建站
categories: 建站
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

---
