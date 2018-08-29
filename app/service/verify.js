// app/service/verify.js
const Service = require('egg').Service;

class VerifyService extends Service {
  async isOwnBook(bookid){
    let ctx = this.ctx;
    let oResult = await ctx.model.Bookuser.findOne({
        where : {
            book_id : bookid,
            user_id : ctx.session.userid
        }
    })
    if(!oResult){
        ctx.body = {
            result : 0,
            msg : "你没有该权限"
        }
    }
    return oResult ? true : false;
  }
}
module.exports = VerifyService;
