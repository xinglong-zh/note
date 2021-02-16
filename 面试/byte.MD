# 面试准备

---

## leecode

---

## highscalability.com

---

+ begin guide to scale

1. 1 user : single instance . instance run the entire web stack ,for example web app,database,management,etc.
2. vertical scaling: 同一个逻辑单元内 , 增加资源来提高处理能力 , cpu ,内存 , 硬盘 .
problem:no failover ,no redundancy . problem in instance ,website will die.  
eventually a single instance can only  get so big . you need to do something else.
3. users>10: separate out a single host into multiple hosts.  web site and database .   SQL database instead of NoSQl database .
4. users>100: use a separate for web tier.
5. users:1000: web host load balance , slave database .
6. users>10000 - 100000s: horizontal scaling.  
use load balance management instance .  
add more read replicas to database take load off the write master .
lightening the load off tier . use cache and CDN.
7. users>500000: microservice.
8. users>10000000: Federation - splitting into multiple DBs based on function(分库); sharding - splitting one dataset across multiple hosts(分表); moving some functionality to other types of DBS (think about NoSQl);
9. users>11 million : build custom solutions , deep analysis og you entire stack .

+ 222
+ 222
+ 444
+ 555
