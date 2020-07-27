## 随便记录 
----------

微信读书：
### 财富自由之路
7. 如何增加自己的收入

+ 固定比例的存款

+ 存款做到12% 的年利率

```python
计算书年化收益
def getrich(salary:int,years:float,percent=0.12)->float:
    sum = 0
    for i in range(int(years*12)):
        sum =  salary + round(sum*(1+percent/12),2)
    return sum
    
```