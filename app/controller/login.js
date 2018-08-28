'use strict';

//get
/*
 登录接口
 1.在小程序调用wx.login 获取code
 2.调用wx.request({url:"http://***.com/api/login/code",data:{code:"code"}})
*/
exports.show = async ctx => {
    const code_id = ctx.params.id;
    const app  = ctx.app;
    // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    const result = await ctx.curl('',{
        dataType : 'json',
        data :{
            appid : "",
            secret : "",
            js_code : "",
            grant_type : "authorization_code"
        }
    });

    console.log('show.ctx', ctx);
    console.log('show.ctx.params', ctx.params);
};
