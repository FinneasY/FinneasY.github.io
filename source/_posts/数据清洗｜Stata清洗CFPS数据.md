---
title: 数据清洗｜Stata清洗CFPS数据
date: 2024-11-22 15:17:47
tags:
  - 数据清洗
  - CFPS
  - Stata
categories: 数据清洗
copyright_author: Finneas
urlname: data-clean
---
## 开始之前
- 首先要明确自己的数据清洗需求，我的需求如下：
	- 构建一个面板数据，其中需要包含所有我需要的变量。
- 其次是拆分需求：
	- 1. 面板数据需要由**截面数据**来合并；
	- 2. 变量需要的保留与否暂不清晰，但根据已读文献，有初步方向。
	
## 开始清洗
### 制定根目录
- 为了方便合作清洗/给他人检查代码，先确定目录如下：

```
clear all
clear matrix
set more off

global root         = "/Users/finneas/Desktop/CFPS数据库中国家庭追踪调查数据库"
global cfps2020     = "$root/CFPS2020"
global cfps2018     = "$root/CFPS2018"
global cfps2016     = "$root/CFPS2016"
global cfps2014     = "$root/CFPS2014"
global cfps2012     = "$root/CFPS2012"
global dofiles      = "$root/Result_data/Dofiles"
global logfiles     = "$root/Result_data/Logfiles"
global temp_data    = "$root/Result_data/Temp_data"
global working_data = "$root/Result_data/Working_data"
*log using "$logfiles/cfpsclean.log", replace

```

### 清洗截面数据
#### 筛选变量
- 首先清洗2012年数据，用`keep`指令保留所有需要的变量

```
*-----------------------2012年--------------------------------
*- 提取变量
use "$cfps2012/cfps2012adult_201906.dta", clear
keep pid fid12 fid10 provcd countyid cid urban12

gen year = 2012
gen age = year - cfps2012_birthy_best //年龄
label variable 年龄
```

{%note info no-icon%}
考虑到只靠do文件清理变量会面临一些问题：
1. 变量太多，很容易乱
2. 无法核对我需要的变量是否已清洗
3. 无法核对已清洗的变量和问卷中被`keep`掉的变量

故而决定采用表格来整理已经清洗的变量
{%endnote%}

- 在excel表格构建表格如下

| 变量           | 变量名称   | 变量定义   | 2012  | 2014 | …… |
|--------------|--------|--------|-------|------|----|
| cig          | 是否吸烟   | 是否吸烟   | qq201 |      |    |
| cig_num      | 吸烟数量   | 每天吸多少支 | qq202 |      |    |
| cig_quit     | 是否曾经戒烟 | 是否曾经戒烟 | qq204 |      |    |
| cig_quit_age | 戒烟年龄   | 戒烟年龄   | qq205 |

- 变量名为`rename`之后的变量名称，即用在后续回归中的变量名称；
- 变量定义为问卷中变量的定义/自己构建的变量定义；
- 其中年列代表每年问卷中的问题代码。



