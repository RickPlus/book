'use strict';

//get
/*
 登录接口
 1.在小程序调用wx.login 获取code
 2.调用wx.request({url:"http://***.com/api/login/code",data:{code:"code"}}) 获取用户的token
*/
exports.show = async ctx => {
    const code_id = ctx.params.id;
    const app  = ctx.app;
    const appConfig = app.config.appConfig;
    // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    const result = await ctx.curl(appConfig.appCode2Session,{
        dataType : 'json',
        data :{
            appid : appConfig.appid,
            secret : appConfig.appsecrect,
            js_code : code_id,
            grant_type : "authorization_code"
        }
    });
    var oData = result.data;
    var openid = oData.openid;
    const session_key = oData.session_key;
    const unionid = oData.unionid;
    openid = code_id;  //todo 测试
    if(!openid){
        ctx.body = "error code";
        return;
    }

    const userid = await getUserId(app, openid);
    ctx.session.userid = userid;
    ctx.body = {
        id : userid
    };
};

    //检查该用户是否已在服务器注册
    //已注册则返回token
    //未注册则先增加条目，再返回token
async function getUserId(app, openid){
    const modelUser = app.model.User;
    var user = await modelUser.findOne({
        where : {
            "weixin_openid" : openid
        }
    });
    if(!user || user.length == 0){
        user = await modelUser.create({
            "weixin_openid" : openid,
            "username" : openid
        });
    }
    return user.id;
}