1.用户
a.登录
http://127.0.0.1:7001/api/login/`code`   (GET)
//没有用户的话先创建用户
//返回用户id并写入session

2.账本
a.获取我的账本  /api/book/  (get)
b.创建账本 /api/book?name=`book name` (post)


4.添加记录
a.获取账本记录  /api/record/`book_id` (get)
b.添加记录到账本 /api/record/ (POST)
content : `content`,
bood_id : `book_id`,
cost : `cost`


3.账本用户
