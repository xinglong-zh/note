import random

def getPass():
    userInfo = {
        '156': 'hello',
        '130': 'world'
    }
    userInfos = [
        {'146': 'xxxx'},
        {'132': 'yyyy'}
    ]
    # print(list(userInfo.keys()))
    keys = list(userInfo.keys())
    # print(keys)
    choose = random.choice(list(userInfo.keys()))
    # print(choose)
    key, value = choose, userInfo[choose]
    return {key, value}


# print(getPass())


def getpass1():
    userInfos = [
        {'username': '15600000', 'passwd': 'xxxxx'},
        {'username': '1500000', 'passwd': '111'},
    ]
    return random.choice(userInfos)

def getrich(salary:int,years:float,percent=0.12)->float:
    sum = 0
    for i in range(int(years*12)):
        sum =  salary + round(sum*(1+percent/12),2)
    return sum

res = getrich(5000,15)  
print(res)
# user = getpass1()


# print(user['username'], user['passwd'])

