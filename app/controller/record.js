'use strict';

//add
exports.create = async ctx => {
    const bookid = ctx.query.book_id;
    const userid = ctx.session.userid;
    const content = ctx.query.content;
    const cost = ctx.query.cost;
    const modelRecord = ctx.model.Record;
    let isOwn = await ctx.service.verify.isOwnBook(bookid);
    if(!isOwn){
        return;
    }

    const oRecord = await modelRecord.create({
        user_id : userid,
        book_id : bookid,
        content : content,
        cost : cost
    })
    if(oRecord){
        ctx.body = {
            result : 1,
            record_id : oRecord.id
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
    const bookid = ctx.params.id;
    let isOwn = await ctx.service.verify.isOwnBook(bookid);
    if(!isOwn){
        return;
    }
    const modelRecord = ctx.model.Record;
    const aRecord = await modelRecord.findAll({
        where : {
            book_id : bookid
        }
    })
    ctx.body = {
        result : 1,
        data : aRecord
    }
};
