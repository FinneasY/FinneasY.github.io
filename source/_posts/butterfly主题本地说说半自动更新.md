---
title: butterfly主题本地说说半自动更新
date: 2024-12-15 15:55:29
tags: 建站
categories: 建站
urlname: 20241215
description: 好友帮助下已实现全自动
---

# 问题
周末闲来无事想把博客的说说页面重新弄一下，原来的artitalk必须要梯子才能看到，否则就一直在下雨界面。于是我想试试butterfly主题自带的本地说说页面。但如果这样就面临一个很严重的问题：
由于本地说说是静态的，每次部署都要更新一次`shuoshuo.yml`文件，然后还要很不优雅地摘抄日期，然后再输入一遍指令推送到git仓库。

# 我的博客配置
- hexo框架
- butterfly主题
- git仓库托管
- netlify部署

也就是说我只需要能够`一键更改`git仓库的`shuoshuo.yml`文件，我就可以实现一键发送说说。

# 解决方案
我能想到的解决方案如下：
- 利用ios快捷指令编辑文案，自动配置好`yml`文件所需要的格式
- ios快捷指令get仓库的内容
- 拼接已有内容和更新内容
- 再push到仓库中

但是快捷指令只能get到内容，到push就总是报错我的content is invalid（我检查过是正确的base64编码格式），status是422。

于是我只能做一个实现半自动的快捷指令了。

# 半自动快捷指令
目前能够实现：
- 1. 自动编辑`yml`文件要求的说说格式
- 2. 自动获取当前时间
- 3. 能够保存到本地备忘录 or 直接打开github编辑`shuoshuo.yml`的页面
快捷指令icloud链接请点击：{% btn 'https://www.icloud.com/shortcuts/de89564e27224eebb73c08a55945651e',说说编辑, blue %}

快捷指令截图如下：
<img src='https://blog.econfinny.com/img/快捷指令说说编辑/IMG_6636.PNG' height='600'/>
<img src='https://blog.econfinny.com/img/快捷指令说说编辑/IMG_6638.PNG' height='600'/>
<img src='https://blog.econfinny.com/img/快捷指令说说编辑/IMG_6639.PNG' height='600'/>
<img src='https://blog.econfinny.com/img/快捷指令说说编辑/IMG_6640.PNG' height='600'/>


# 快捷指令运行样式
<img src='https://blog.econfinny.com/img/快捷指令说说编辑/IMG_6641.PNG' height='600'/>
<img src='https://blog.econfinny.com/img/快捷指令说说编辑/IMG_6642.PNG' height='600'/>

# 快捷指令桌面启动
<img src='https://blog.econfinny.com/img/快捷指令说说编辑/IMG_6643.PNG' height='600'/>

# 我在butterfly主题下的询问
但毕竟我没学过编程，感觉有些需求应该也是不难实现的，所以我在butterfly主题的github留言板下发了一条讨论帖，希望能得到回复。
留言回复请点击：{% btn 'https://github.com/jerryc127/hexo-theme-butterfly/discussions/1623',讨论帖, blue %}

# 好友帮助下已实现全自动
