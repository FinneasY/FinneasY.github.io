---
title: Solow模型
date: 2024-11-17 15:15:41
tags: [宏观经济, 笔记, 经济增长]
categories: 宏观经济学
copyright_author: Finneas
mathjax: true
---


# 索洛模型 (Solow Model)
---
## 1. 经济增长的一些基本事实

- **增长奇迹**：  
  一个国家的增长在长期中远远高于世界平均水平，从而导致该国在世界收入分布中的排名迅速上升。

- **增长灾难**：  
  一个国家的增长远远低于世界平均水平的现象。

- **研究经济增长的最终目的**：
  - 探索是否可以全面加快增长，或者使穷国的生活水平更接近先进国家。
- **索洛模型的基本结论**：
  - 不论是人均产出随着时间大幅增长，还是人均产出在不同地区存在巨大差异，都难以用实物资本的积累来解释。

---

## 2. 假设

### 2.1.投入与产出

#### 2.1.1关于生产函数的假定

$$
Y(t) = F(K(t), A(t)L(t))
$$
{% note info no-icon%}
1. $Y$ 是产出，$K$ 是资本，$A$ 是知识（劳动效率），$L$ 是劳动。
2. $t$ 不直接进入函数，而是通过 $K$, $L$, $A$ 进入。
3. **劳动增强型/哈罗德中性技术进步**：  
   $AL$ 以乘积形式进入函数，称 $AL$ 为**有效劳动**。
{% endnote%}


- **假设**：
	- **规模报酬不变**：
    $$
    F(cK, cAL) = cF(K, AL), \quad \forall c \geq 0
    $$
    {%note info no-icon%}
      1. 经济规模已经足够大，使得专业分工的好处已得到最大限度的利用。
      2. 相对于资本、劳动和知识来说，其他投入要素并不重要。
    {%endnote%}

  - **稻田条件** (Inada, 1964)：  
    $$
    \lim_{k \to 0} f'(k) = \infty, \quad \lim_{k \to \infty} f'(k) = 0
    $$
- **Intensive Form** （由规模报酬不变推出）
$$
F\left(\frac{K}{AL}, 1\right) = \frac{1}{AL}F(K, AL)
$$
{%note info no-icon%}
定义：
  - $k = \frac{K}{AL}$：单位有效劳动的平均资本量。
  - $y = \frac{Y}{AL}$：单位有效劳动的平均产出。

简化形式：$y = f(k)$
假定 $f(0) = 0$, $f'(k) > 0$, $f''(k) < 0$。  
    即资本边际产出为正，并且它随资本量增加而递减，保证经济路径不会发散。
  
 {%endnote%}
- Cobb-Douglas 函数满足上述所有条件。
#### 3.1.2关于投入要素变化的假定

1. **时间的连续性**：模型中假定时间是连续的。

2. **资本、劳动和知识的初始值**：  
   $L(0) > 0, A(0) > 0, K(0) > 0$，且 $L$ 和 $A$ 分别按固定比率增长：
   $$
   \dot{L}(t) = nL(t), \quad \dot{A}(t) = gA(t)
   $$
   - 其中 $n$ 和 $g$ 是外生参数。
   - $L(t)$ 和 $A(t)$ 分别按指数增长（$A$、$L$上加点表示其对t的导数）：
    $$
    \dot{L}(t)=nL(t),\quad \dot{A}(t)=gA(t)
    $$
     $$
     L(t) = L(0)e^{nt}, \quad A(t) = A(0)e^{gt}
     $$


3. **资本动态方程**：  
   总产出用于消费和投资，其中投资等于 $Y(t) - C(t)$，资本的变化由以下方程决定：
   $$
   \dot{K}(t)=[Y(t)-C(t)]-\delta K(t), \quad n + g + \delta > 0
   $$
   $$
   \dot{K}(t) = sY(t) - \delta K(t), \quad n + g + \delta > 0
   $$
   - 其中 $s$ 为储蓄率，$\delta$ 为折旧率。
       {%note info no-icon%}
      solow model中，产出的分配是外生给定的，即用于投资的产出比例是外生不变的常数s
       {%endnote%}

---

## 3. Solow 模型的动态变化

### 3.1. k 的动态变化

- 对 $k$ 求导：
  $$
  \dot{k}(t) = sf(k(t)) - (n + g + \delta)k(t)
  $$
- 单位有效劳动平均资本存量的变化率由两项之差决定：
  - 单位有效劳动的**实际投资**：$sf(k)$。
  - 所需的**持平投资**：$(n + g + \delta)k$。

- **相图分析**：
  - 当 $sf(k) > (n+g+\delta)k$，即 $\dot{k} > 0$，$k$ 上升。
  - 当 $sf(k) < (n+g+\delta)k$，即 $\dot{k} < 0$，$k$ 下降。
![相图分析](/img/solow模型/xtfx.png)
  - $k$的相图
  ![k的相图](/img/solow模型/kxt.png)

{%note info no-icon%}
相图：
一种来自于物理学动力系统分析的工具，在此不做过多介绍。
{%endnote%}
### 3.2. 平衡增长路径
在前文的相图分析中，我们知道$k = k^*$时经济达到稳态。稳态时的经济增长路径，即稳态时各经济变量的增长率就是平衡增长路径。
- 当 $k = k^*$ 时，经济达到稳定状态，也即$\dot{k}(t)=0$。此时：
  - $A$ 的增长率为 $g$，$L$ 的增长率为 $n$。（这一条是前文假设中规定的）
  - $K$ 和 $Y$ 的增长率为 $n + g$：
    $$
    \frac{\dot{K}}{K} = n + g, \quad \frac{\dot{Y}}{Y} = n + g
    $$
    $$
    {K\over AL} =k\to K=ALk\to lnK=lnA+lnL+lnk\to {\dot{K}\over K}=g+n
    $$
    $$
    {Y\over AL}=y\to Y=ALy\to lnY=lnA+lnL+lny\to {\dot{Y}\over Y}=g+n
    $$
  - 人均资本 $\frac{K}{L}$ 和人均产出 $\frac{Y}{L}$ 的增长率为 $g$：
    $$
    \frac{\dot{K}/L}{K/L} = g, \quad \frac{\dot{Y}/L}{Y/L} = g
    $$
    $$
    \frac KL=Ak\to ln{\frac KL}=lnA-lnk\to {\dot{K/L}\over K/L}=g
    $$
    $$
    \frac YL=Ak\to ln{\frac YL}=lnA-lnk\to {\dot{Y/L}\over Y/L}=g
    $$
- 以上分析表明，不论起点位置在何处，经济总时收敛于平衡增长路径，即模型中每个变量的增长率都是常数。
- 平衡增长路径上，人均产出的增长率由技术进步率 $g$ 唯一决定。

---

## 4. 储蓄率变化的影响
{% note %}
因为政府最能触及的就是储蓄率
{% endnote %}
### 4.1. 对产出的影响

- 储蓄率 $s$ 增加：
  - 实际投资 $sf(k)$ 增加。
  - 均衡单位有效劳动资本量 $k^*$ 上升。
  - 均衡单位有效劳动平均产出 $f(k^*)$ 增加。
![储蓄率变动分析](/img/solow模型/储蓄率变动分析.png)
- 人均产出 $\frac{Y}{L}$ 的增长率：
  $$
  \frac{Y}{L} = Af(k), \quad \frac{\dot{Y}/L}{Y/L} = g
  $$
- 因为$\frac YL$的增长来自于$A$和$f(k)$，在$s$发生变动后，$\dot k$突然跃升，然后回归至0，所以$\frac YL$的增长率也会突然跃升然后回归至$g$

- **结论**：  
  储蓄率的变化只有**水平效应**，没有**增长效应**。改变了经济平衡增长路径的位置，但不影响人均产出的增长率，该增长率仅由技术进步率 $g$ 决定。

### 4.2. 对消费的影响

- 平衡增长路径上的消费量：
  $$
  c^* = f(k^*) - sf(k^*) = f(k^*) - (n+g+\delta)k^*
  $$
  - 单位有效劳动的平均消费=单位有效劳动的平均收入-单位有效劳动的实际投资（平衡增长路径下等于持平投资）
  - 消费达到最大时，对应的 $k^*$ 称为**资本存量的黄金律水平**。
  - 由于$k$是$n、g、\delta、s$共同确定的，$k^*$可以写成$k^*(s,n,g,\delta)$
  $$
  \frac{\partial c^*}{\partial s} =[f'(k^*)-(n+g+\delta) ]\frac{\partial k^*}{\partial s}
  $$
    - 已知$s$上升时，$k^*$会跟着上升，所以$\frac{\partial k^*}{\partial s}>0$
    - 所以储蓄对消费的影响，即$\frac{\partial c^*}{\partial s}$的大小仅仅只需要看$f'(k^*)与(n+g+\delta)$的关系
      - 当$f'(k^*)>(n+g+\delta)$，$f(k^*)$的斜率更陡峭，$k^*$点位于低位，储蓄率的增加会使得单位有效劳动的平均消费上升
      ![1](/img/solow模型/1.png)
      - 当$f'(k^*)<(n+g+\delta)$时，$s\uparrow \to c^*\downarrow$
      ![2](/img/solow模型/2.png)
      - 当$f'(k^*)=(n+g+\delta)$时，消费达到最大水平，此时的$k^*$被称为资本存量的黄金律水平
      ![3](/img/solow模型/3.png)
- 由于储蓄是外生的，没法内生确定平衡增长路径上的资本存量水平，因而更无法确定它是否等于黄金律水平



---

## 5. 定量意义

### 5.1. 储蓄率对产出的长期影响

- 储蓄率上升对长期产出的弹性：
  $$
  \frac{\partial y^* / y}{\partial s / s} = \frac{\alpha_{k^*}}{1 - \alpha_{k^*}}
  $$
  - 其中 $\alpha_{k^*} = \frac{k^*f'(k^*)}{f(k^*)}$，表示资本收入占总收入的比例。

#### 5.1.1. 储蓄率对产出的长期影响推导过程
- 求微分如下：
$$
\frac{\partial y^*}{\partial s}=f'(k^*)\frac{\partial k^*}{\partial s}\qquad (1)
$$
- 对$sf(k^*)=(n+g+\delta)k^*$两端求导：
$$
f(k^*)+sf'(k^*)\frac{\partial k^*}{\partial s}=(n+g+\delta)\frac{\partial k^*}{\partial s}\qquad (2)
$$
- 整理得：
$$
\frac{\partial k^*}{\partial s}=\frac{f(k^*)}{(n+g+\delta)-sf'(k^*)}\qquad(3)
$$
- 将式（3）带入（1）得：
$$
\frac{\partial y^*}{\partial s}=\frac{f'(k^*)f(k^*)}4{(n+g+\delta)-sf'(k^*)}
$$
- 两边乘$\frac{s}{y^*}$化为弹性形式：
$$
\frac{\partial y^*/y}{\partial s/s}=\frac{sf'(k^*)f(k^*)}{f(k^*)[(n+g+\delta)-sf'(k^*)]}
$$
- 因为均衡路径水平上，$sf(k^*)=(n+g+\delta)k^*$
$$
\frac{\partial y^*/y}{\partial s/s}=\frac{(n+g+\delta)k^*}{(n+g+\delta)-(n+g+\delta)k^*\frac{f'(k^*)}{f()k^*}}
$$
$$
\frac{\partial y^*/y}{\partial s/s}=\frac{(n+g+\delta)k^*f'(k^*)}{[(n+g+\delta)-(n+g+\delta)k^*\frac{f'(k^*)}{f()k^*}]f(k^*)}
$$
$$
\frac{\partial y^*/y}{\partial s/s}=\frac{k^*f'(k^*)/f(k^*)}{1-k^*f'(k^*)/f(k^*)}
$$
- 因为$\frac{f'(k^*)/f(k^*)}{1/k^*}=k^*f'(k^*)/f(k^*)$，是$k=k^*$ 的产出资本弹性，设$\alpha_{k^*}(k^*)=k^*f'(k^*)/f(k^*)$
- $\alpha_{k^*}$表示资本收入占总收入的比例
$$
\frac{\partial y^*/y}{\partial s/s}=\frac{\alpha_{k^*}}{1-\alpha_{k^*}}
$$
- 换言之，可以用“资本收入占总收入的比例”来估计产出的资本弹性


### 5.2. 收敛速度
讨论$s$变化带来效果的速度
- 根据泰勒展开式：
$$
\dot{f(k)} \simeq [\frac{\partial \dot{k}}{\partial k} |_{k=k^*}](k-k^*)
$$
- 记 $\frac{\partial \dot{k}}{\partial k} |_{k=k^*}=-\lambda$
$$
\lambda=- \frac{\partial \dot{k}}{\partial k} |_{k=k^*}=[sf(k)-(n+g+\delta)k]|_{k=k^*}'=(n+g+\delta)-sf'(k^*)
$$
$$
\begin{aligned}
\lambda &=(n+g+\delta)-sf'(k^*)\\
        &=(n+g+\delta)-sf'(k^*)·{f(k^*)\over f(k^*)}\\
        &=(n+g+\delta)-sf(k^*)\dot {f'(k^*)\over f(k^*)}\\
        &\overset{sf(k^*)=(n+g+\delta)k^*}{=\!=\!=\!=\!=\!=\!=\!=\!=\!=}(n+g+\delta)-(n+g+\delta)k^*{f'(k^*)\over f(k^*)}
\end{aligned}
$$
$$
\therefore \lambda=(n+g+\delta)[1-\alpha_k(k^*)]
$$
- $\lambda$ 表示收敛速度。