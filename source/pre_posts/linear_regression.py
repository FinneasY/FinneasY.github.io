import numpy as np  
import matplotlib.pyplot as plt   
from sklearn.linear_model import LinearRegression

## 定义真实函数
def true_fun(X):  # 这是我们设定的真实函数，即 ground truth 的模型
    return -0.085331 * X -0.0647997

np.random.seed(0)  # 设置随机种子
n_samples = 500     # 设置采样数据点的个数

X_train = np.sort(np.random.rand(n_samples))
y_train = (true_fun(X_train) + np.random.randn(n_samples) * 0.05).reshape(n_samples, 1)

model = LinearRegression()  # 定义模型
model.fit(X_train[:, np.newaxis], y_train)  # 训练模型
print("输出参数w：", model.coef_)  # 输出模型参数w
print("输出参数b：", model.intercept_)  # 输出参数b

X_test = np.linspace(0, 1, 100)
plt.plot(X_test, model.predict(X_test[:, np.newaxis]), label="Model")
plt.plot(X_test, true_fun(X_test), label="True function")
plt.scatter(X_train, y_train)  # 画出训练集的点
plt.legend(loc="best")
plt.show()