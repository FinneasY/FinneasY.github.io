---
title: 标准误到底在估计什么？｜从 Robust 到 Cluster
date: 2026-07-22 10:50:00
categories: 计量经济学
tags:
    - 计量经济学
    - 标准误
    - 聚类标准误
    - 公司金融
    - DID
description: 从误差项协方差矩阵出发，理解经典、异方差稳健与聚类稳健标准误，并讨论公司金融研究究竟应该在企业还是行业层面聚类。
urlname: standard-errors-robust-and-clustered
mathjax: true
copyright_author: Finneas
---

# 一、引言

最近修改公司金融论文时，我发现了一个很稳定的模式：只要把面板回归结果交给 ChatGPT 或 Codex，它自动把代码实现为：

> 使用企业层面聚类标准误（standard errors clustered at the firm level）。

这确实符合一些公司金融论文的常见做法。我的数据是“企业—年份”面板，同一家企业被观察很多次，那么按企业聚类似乎就是最自然的默认配置。一开始，我也把它当成一种类似“双向固定效应”的标准动作。

但当我认真翻阅实证论文和计量教材后，事情开始变得不那么简单。有些论文按企业聚类，有些按行业、州或城市聚类，有些采用企业和年份双向聚类，还有一些顶刊论文根本没有报告企业聚类标准误。更重要的是，同一组回归换一个聚类层级，显著性可能立刻发生变化。

这不是一个“哪个命令更规范”的问题。它背后真正的问题是：我们认为回归误差会在什么范围内共同变动？

于是我想把几个看似基础、实际上很容易混在一起的问题重新理一遍：

- 标准误究竟在估计什么？
- Robust SE 和 Clustered SE 有什么关系？
- 企业聚类与行业聚类分别允许哪些观测相关？
- 为什么企业面板并不自动意味着必须按企业聚类？
- 为什么一些顶刊文章不使用企业聚类，并不代表它们“不够稳健”？
- 聚类层级最终应该由数据形状、残差检验、论文传统，还是识别设计决定？

全文最重要的答案其实只有一句话：

> **所有标准误都在估计同一个对象——$Var(\hat\beta)$。它们的区别，在于如何约束误差项协方差矩阵 $\Omega$。**

# 二、从标准误开始：我们到底在估计什么？

从最熟悉的线性模型开始：

$$
Y=X\beta+\varepsilon
$$

OLS 估计量为：

$$
\hat\beta=(X'X)^{-1}X'Y
$$

将 $Y=X\beta+\varepsilon$ 代入：

$$
\hat\beta
=\beta+(X'X)^{-1}X'\varepsilon
$$

在给定 $X$ 的条件下，如果记误差项协方差矩阵为：

$$
\Omega=Var(\varepsilon\mid X)
$$

那么：

$$
Var(\hat\beta\mid X)
=(X'X)^{-1}X'\Omega X(X'X)^{-1}
$$

这就是整篇文章的轴心。

我们在回归表里看到的标准误，是 $Var(\hat\beta)$ 对角线元素的平方根。第 $k$ 个系数的标准误为：

$$
SE(\hat\beta_k)=\sqrt{\widehat{Var}(\hat\beta)_{kk}}
$$

而后续几乎所有统计推断都由它产生。例如，检验 $H_0:\beta_k=\beta_{k,0}$ 时：

$$
t=\frac{\hat\beta_k-\beta_{k,0}}{SE(\hat\beta_k)}
$$

一个常见的近似置信区间为：

$$
\hat\beta_k\pm c_{1-\alpha/2}\,SE(\hat\beta_k)
$$

所以标准误会影响 $t$ 统计量、$p$ 值、置信区间和显著性判断。但经典 SE、Robust SE 和 Clustered SE 通常不会改变 OLS 的点估计 $\hat\beta$；改变的是我们对点估计不确定性的判断。

问题因此转化为：未知的 $\Omega$ 应该怎样估计？

# 三、异方差：经典 OLS 的第一个裂缝

经典 OLS 方差公式采用非常强的假设：

$$
\Omega=\sigma^2I
$$

它同时包含两层含义。

第一，每个观测拥有相同的误差方差：

$$
Var(\varepsilon_i\mid X)=\sigma^2
$$

第二，不同观测的误差互不相关：

$$
Cov(\varepsilon_i,\varepsilon_j\mid X)=0,\qquad i\neq j
$$

在这些假设下，方差公式简化为：

$$
Var(\hat\beta\mid X)=\sigma^2(X'X)^{-1}
$$

但公司金融数据很难满足第一层假设。大公司的经营结果可能比小公司稳定，科技企业和制造企业的利润波动也可能完全不同。换言之：

$$
Var(\varepsilon_i\mid X)\neq Var(\varepsilon_j\mid X)
$$

这就是异方差。

若条件均值模型正确，即 $E(\varepsilon\mid X)=0$，异方差本身通常不会让 OLS 系数失去一致性；它首先破坏的是经典方差公式。继续使用 $\hat\sigma^2(X'X)^{-1}$，就可能得到错误的标准误、置信区间和显著性判断。

这一节只出现了“每个观测的方差不同”，还没有允许两个观测的误差彼此相关。把这两件事分开，是理解 Robust 与 Cluster 的关键。

# 四、稳健标准误：把对角线放开

[White（1980）](https://doi.org/10.2307/1912934)提出的异方差一致协方差矩阵估计量，经常被称为 White SE、Eicker–White SE、HC SE 或简单的 Robust SE。它保留不同观测相互独立的假设，但允许每个观测拥有不同的误差方差：

$$
\Omega=
\begin{bmatrix}
\sigma_1^2 & 0 & \cdots & 0\\
0 & \sigma_2^2 & \cdots & 0\\
\vdots & \vdots & \ddots & \vdots\\
0 & 0 & \cdots & \sigma_N^2
\end{bmatrix}
$$

以最基础的 HC0 为例，用 OLS 残差平方估计每个观测的条件方差：

$$
\widehat\Omega_{HC0}
=\operatorname{diag}(\hat\varepsilon_1^2,\ldots,\hat\varepsilon_N^2)
$$

于是：

$$
\widehat{Var}_{HC0}(\hat\beta)
=(X'X)^{-1}
\left(\sum_{i=1}^{N}x_ix_i'\hat\varepsilon_i^2\right)
(X'X)^{-1}
$$

这就是常说的“三明治估计量”：两侧的 $(X'X)^{-1}$ 是面包，中间估计误差结构的部分是肉。实际软件还会使用 HC1、HC2 或 HC3 等有限样本修正，但它们共享同一个基本思想。

Robust SE 允许：

$$
Var(\varepsilon_i)\neq Var(\varepsilon_j)
$$

但仍然设定：

$$
Cov(\varepsilon_i,\varepsilon_j)=0,\qquad i\neq j
$$

因此，它解决的是未知形式的异方差，而不是观测之间的相关。

设一家企业连续出现十年。即使它第一年的意外冲击很可能延续到第二年，普通 Robust SE 仍会把这十个“企业—年份”观测视为十条独立信息。如果企业内部误差确实持续相关，那么有效信息量就小于表面上的样本量，Robust SE 仍可能明显偏小。

# 五、聚类标准误：从对角矩阵到块对角矩阵

聚类的第一步不是写 `cluster(firm)`，而是把样本划分成若干互不重叠的组。用映射表示：

$$
g(i)\in\{1,2,\ldots,G\}
$$

$g(i)$ 表示第 $i$ 个观测属于哪一个 cluster。重新按 cluster 排列观测后，聚类假设下的 $\Omega$ 可以写成块对角形式：

$$
\Omega=
\begin{bmatrix}
\Omega_1 & 0 & \cdots & 0\\
0 & \Omega_2 & \cdots & 0\\
\vdots & \vdots & \ddots & \vdots\\
0 & 0 & \cdots & \Omega_G
\end{bmatrix}
$$

也可以用更直观的方式理解：

```text
             Cluster 1   Cluster 2   Cluster 3
Cluster 1   [ × × × ]    [ 0 0 0 ]   [ 0 0 0 ]
Cluster 2   [ 0 0 0 ]    [ × × × ]   [ 0 0 0 ]
Cluster 3   [ 0 0 0 ]    [ 0 0 0 ]   [ × × × ]
```

每个方块内部的元素可以任意取值：既允许不同观测具有不同方差，也允许 cluster 内任意两个误差相关。不同方块之间则仍假定独立。

单向聚类稳健协方差矩阵的基本形式是：

$$
\widehat{Var}_{CL} (\hat\beta)
=(X'X)^{-1}
\left(
\sum_{g=1}^{G}X_g'\hat\varepsilon_g\hat\varepsilon_g'X_g
\right)
(X'X)^{-1}
$$

其中，$X_g$ 和 $\hat\varepsilon_g$ 分别收集 cluster $g$ 内的解释变量与残差。

对比 Robust 的“肉”：

$$
\sum_i x_ix_i'\hat\varepsilon_i^2
$$

Cluster 的“肉”把同一组中不同观测的交叉项也保留下来：

$$
X_g'\hat\varepsilon_g\hat\varepsilon_g'X_g
=\sum_{i\in g}\sum_{j\in g}x_ix_j'\hat\varepsilon_i\hat\varepsilon_j
$$

这正是二者最本质的差别：Robust 的 $\Omega$ 是对角矩阵，Cluster 的 $\Omega$ 是块对角矩阵。

严格地说，聚类稳健标准误不仅允许组内相关，也同时允许异方差。因此，“Robust 解决异方差，Cluster 解决相关性”是一种便于记忆但不完整的说法。更准确的表述是：普通 Robust 只放松方差相等假设；Cluster 在此基础上进一步放松 cluster 内协方差为零的假设。

# 六、企业聚类：为什么它会成为 AI 的默认答案？

如果令 cluster 等于企业，那么同一家企业在不同年份的误差可以任意相关：

$$
Cov(\varepsilon_{it},\varepsilon_{is})\neq0,qquad t\neq s
$$

这种设定在公司金融中非常有吸引力。CEO 能力、企业文化、治理质量、管理风格和披露习惯都可能持续多年。即使回归加入企业固定效应，企业内部仍可能存在动态冲击、调整迟滞或遗漏的时变因素，造成残差序列相关。

固定效应与聚类解决的不是同一个问题。企业固定效应改变条件均值模型，控制不随时间变化的企业特征；企业聚类改变方差估计，允许企业内部剩余误差相关。加入企业固定效应不会自动让残差跨期独立。

这也是 ChatGPT、Codex 等 AI 容易默认推荐企业聚类的原因。我认为至少有四个来源：

1. 公司金融实证中，“企业—年份面板 + 企业聚类”确实是高频组合，模型从大量论文和代码中学到了这种共现模式；
2. 面板的重复观察单位非常醒目，企业内部序列相关也是一个真实且常见的风险；
3. `cluster(firm_id)` 是清晰、标准、易执行的软件配置，适合作为通用模板输出；
4. 在缺少识别设计和制度背景时，按面板个体聚类常被当成比普通 Robust 更安全的经验规则。

但企业聚类暗含另一个同样强的假设：

$$
Cov(\varepsilon_{it},\varepsilon_{js})=0,qquad i\neq j
$$

也就是说，只要属于不同企业，无论它们是否处于同一行业、同一地区或面对同一项政策，误差都被视为独立。这正是企业聚类最大的局限。

# 七、行业聚类：当共同冲击发生在企业之间

如果把 cluster 定义为行业，同一行业内不同企业、不同年份的误差都可以相关。互联网企业可以共同受到平台监管、技术迭代和广告需求变化的影响；银行共同面对资本监管和利率环境；房地产企业共同面对融资政策和地区需求周期。

以 ChatGPT 的出现为例。假设生成式 AI 对互联网行业整体产生了一项未被模型完全控制的冲击，那么腾讯、百度和阿里的误差可能共同变化：

$$
Cov(\varepsilon_{Tencent,t},\varepsilon_{Baidu,t})\neq0
$$

企业聚类不允许这项协方差存在，行业聚类则允许。若残差相关的主要来源确实是行业共同冲击，行业聚类就比企业聚类更贴合数据生成过程。

这也解释了为什么一些高水平论文选择行业、州、城市或政策实施单元聚类，而不是机械地沿面板个体聚类。它们未必“放松了标准”，而可能是在依据冲击来源与识别设计重新定义独立信息的单位。

不过，这里有三个必须强调的限制。

第一，行业固定效应无法吸收时变的行业冲击，年份固定效应也只能吸收全市场共同冲击。必要时应考虑行业×年份固定效应，但这改变的是条件均值模型；行业聚类处理的是吸收之后仍然存在的组内相关。二者不能互相替代。

第二，改用行业聚类只能修正推断，不能修复遗漏变量、反向因果等内生性问题。标准误再“稳健”，也无法让有偏的 $\hat\beta$ 自动变得可信。

第三，行业通常远少于企业。常规 cluster-robust 推断依赖 cluster 数量足够大，而不是 cluster 内观测足够多。若样本只有十几个行业，即使有十万条企业—年份记录，常规行业聚类的 $t$ 检验仍可能严重失真。此时需要考虑小样本自由度修正、wild cluster bootstrap、随机化推断，或者重新思考识别层级。[Cameron 与 Miller（2015）](https://escholarship.org/uc/item/1jq5d0pq)对聚类层级、少量 clusters 和多维聚类给出了系统讨论。

# 八、企业还是行业：真正要问的是相关从哪里来

“Cluster where the errors are correlated”是一条很有用的经验法则。它提醒我们，不要因为数据长成面板，就自动沿面板编号聚类。

但如果再严谨一步，聚类还与抽样设计和处理变量的赋值机制有关。[Abadie、Athey、Imbens 与 Wooldridge（2023）](https://www.gsb.stanford.edu/faculty-research/publications/when-should-you-adjust-standard-errors-clustering)强调，聚类不只是看到残差相关之后的机械修补，也可能来自两阶段整群抽样，或者处理状态在 cluster 内相关的实验与准实验设计。

因此，我现在更愿意按下面的顺序思考。

## 1. 处理变量在哪个层级变化？

如果一项政策由州级实施，同一州内企业共享处理状态，那么按企业聚类通常过细。DID 中尤其要重视这一点：政策赋值层级往往比结果变量的观测层级更能决定独立信息来自哪里。

[Bertrand、Duflo 与 Mullainathan（2004）](https://economics.mit.edu/sites/default/files/2022-08/How%20Much%20Should%20We%20Trust%20Differences%20in%20Difference.pdf)说明，DID 数据中的长期序列相关会让忽略相关性的标准误严重低估，从而产生过度拒绝。这个结论不等于“所有 DID 都按企业聚类”，而是要求聚类和推断方法匹配政策变化及误差持续性的层级。

## 2. 最可能遗漏的共同冲击是什么？

- 企业自身的持续冲击占主导：考虑企业聚类；
- 行业监管、技术或需求冲击占主导：考虑行业聚类；
- 州级政策和宏观环境占主导：考虑州聚类；
- 城市营商环境、司法或污染冲击占主导：考虑城市聚类。

## 3. 是否存在不止一个相关维度？

公司金融数据经常同时存在企业内跨期相关和同一年企业间的市场共同冲击。此时单向企业聚类或单向年份聚类都可能不够，可以考虑企业×年份双向聚类。类似地，研究者也可能需要企业×行业年份、地区×年份等更贴合设计的方案。

但“双向”也不是自动升级版。它仍要求在相应维度之外具有足够独立性，而且年份数量较少时同样面临少量 clusters 问题。

## 4. cluster 数量是否足以支撑渐近推断？

聚类层级越粗，允许相关的范围越大，但 cluster 数量也越少。这带来一个真实的权衡：经济结构上更合理的聚类，不一定能让常规大样本近似表现良好。不能因为行业聚类得到更大的标准误，就认为它更可信；也不能因为企业聚类拥有几千个 clusters，就忽略行业共同冲击。

## 5. 论文应该怎样报告？

主规格应由识别设计和经济机制事先决定，而不是比较不同标准误后挑选最不显著或最显著的一种。若企业与行业相关都有合理依据，可以将最符合主识别逻辑的方案放在基准结果中，并报告替代聚类、双向聚类或小 cluster 稳健推断作为稳健性分析。

公司金融面板中企业聚类确实是重要传统。[Petersen（2009）](https://www.kellogg.northwestern.edu/faculty/petersen/htm/papers/standarderror.pdf)系统比较了金融面板数据中横截面相关和时间序列相关下的不同标准误方法。但“常见”不是统计识别，“顶刊采用”也不是可移植到所有研究的证明。真正可以迁移的是论文对误差结构与研究设计的论证，而不是回归命令本身。

# 九、最后总结：这些标准误到底有什么区别？

| 方法 | 对 $\Omega$ 的假设 | 能处理什么 | 不能处理什么 | 是否通常更保守 |
| --- | --- | --- | --- | --- |
| Classical SE | $\Omega=\sigma^2I$ | 同方差且观测独立时有效 | 异方差、任意观测间相关 | 最容易偏小，但并非数学上必然最小 |
| Robust SE | $\Omega$ 为未知对角矩阵 | 未知形式异方差 | 不同观测之间的误差相关 | 常比 Classical 大，但可能更小 |
| Firm Cluster | 以企业为 block；企业内任意异方差与相关，企业间独立 | 企业内部跨期相关、企业内异方差 | 跨企业的行业、地区或年份共同相关 | 常比 Robust 大，但没有单调保证 |
| Industry Cluster | 以行业为 block；行业内任意异方差与相关，行业间独立 | 同行业跨企业、跨期相关 | 跨行业共同相关；少行业下的常规渐近推断 | 有时比 Firm Cluster 大，也可能更小 |

这里最值得警惕的是“更稳健，所以标准误一定更大”这种说法。方差估计量中加入的协方差项既可能为正，也可能为负，有限样本修正和 cluster 数量也会改变结果。因此不存在如下固定排序：

$$
SE_{Classical}<SE_{Robust}<SE_{Firm}<SE_{Industry}
$$

在许多金融面板中，组内误差正相关会使聚类标准误大于普通 Robust SE；行业 cluster 包含更多观测，也可能给出更大的标准误。但这只是常见经验，不是定理。聚类名称本身没有“保守等级”，真正决定结果的是 $X$、残差协方差结构、cluster 大小与数量，以及有限样本修正。

回到文章开头，AI 为什么总建议企业聚类？因为它识别出了一个高频而且通常合理的风险：同一企业的误差跨期相关。但它往往不知道你的政策在哪个层级发生，不知道最重要的遗漏冲击来自企业、行业还是地区，也不知道你有多少个有效 clusters。它给出的是一个有用的起点，不是统计学结论。

我最终记住的不是某一条 Stata 命令，而是这句话：

> **所有标准误都在估计同一个对象——$Var(\hat\beta)$。它们唯一的区别，在于对误差项协方差矩阵 $\Omega$ 的假设不同。**

下一次再看到“建议按企业聚类”时，真正应该追问的不是“这是不是论文标配”，而是：**我的独立信息究竟来自哪里？**

# 参考文献

- White, H. (1980). [A Heteroskedasticity-Consistent Covariance Matrix Estimator and a Direct Test for Heteroskedasticity](https://doi.org/10.2307/1912934). *Econometrica*, 48(4), 817–838.
- Bertrand, M., Duflo, E., & Mullainathan, S. (2004). [How Much Should We Trust Differences-in-Differences Estimates?](https://economics.mit.edu/sites/default/files/2022-08/How%20Much%20Should%20We%20Trust%20Differences%20in%20Difference.pdf). *Quarterly Journal of Economics*, 119(1), 249–275.
- Petersen, M. A. (2009). [Estimating Standard Errors in Finance Panel Data Sets: Comparing Approaches](https://www.kellogg.northwestern.edu/faculty/petersen/htm/papers/standarderror.pdf). *Review of Financial Studies*, 22(1), 435–480.
- Cameron, A. C., & Miller, D. L. (2015). [A Practitioner’s Guide to Cluster-Robust Inference](https://escholarship.org/uc/item/1jq5d0pq). *Journal of Human Resources*, 50(2), 317–372.
- Abadie, A., Athey, S., Imbens, G. W., & Wooldridge, J. M. (2023). [When Should You Adjust Standard Errors for Clustering?](https://www.gsb.stanford.edu/faculty-research/publications/when-should-you-adjust-standard-errors-clustering). *Quarterly Journal of Economics*, 138(1), 1–35.

