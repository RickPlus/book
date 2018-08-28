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
    openid = "3test";
    if(!openid){
        ctx.body = "error code";
        return;
    }

        const token = await getToken(app, openid);
    ctx.body = {
        id : token,
        token : token
    };
};

    //检查该用户是否已在服务器注册
    //已注册则返回token
    //未注册则先增加条目，再返回token
async function getToken(app, openid){
    const modelUser = app.model.User;
    var user = await modelUser.findAll({
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