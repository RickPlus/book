'use strict';

//add
exports.create = async ctx => {
    const userid = ctx.session.userid;
    const oBook = ctx.model.Book;
    let name = ctx.query.name;
    if(!name){
        ctx.body = {
            result : 0,
            msg : "请输入账本名称"
        }
        return;
    }
    let cBook = await oBook.findOrCreate({
        where : {
            name : name,
            create_userid : userid
        },
        default :{
            name : name,
            create_userid : userid
        }
    });
    if(cBook && cBook.length >0){
        let bookid = cBook[0].id;
        //创建账本和用户关联
        let relation = await ctx.model.Bookuser.findOrCreate({
            where :{
                book_id : bookid,
                user_id : userid
            }
        });
        if(!relation || relation.length !=2){
            ctx.body = {
                result : 0,
                msg : "创建失败"
            }
            return;
            //TODO 需要打log 查明关联失败的原因  这里可能要捕获异常，relation必返回数组
        }
        ctx.body = {
            result : 1,
            bookid : bookid
        }
    }else{
        ctx.body = {
            result : 0
        }
    }
    
};
//delete
exports.destroy = async () => {
  console.log('destroy.ctx', ctx);
  console.log('destroy.ctx.params', ctx.params);  
};
//update
exports.update = async () => {
    console.log('update.ctx', ctx);
    console.log('update.ctx.params', ctx.params);  
};
//get
exports.show = async ctx => {
    console.log("index.ctx",ctx);
};
exports.index = async ctx => {
    const userid = ctx.session.userid;
    const oBook = ctx.model.Book;
    const aBook = await oBook.findAll({
        where : {
            create_userid : userid
        }
    });
    ctx.body = aBook;
};
