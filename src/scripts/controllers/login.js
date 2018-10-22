import loginTpl from '../views/login.html'
import loginModel from "../models/login"
import cookieController from "../controllers/cookie"
import layer from "./layer"

const render = () => {
    $("nav .title").text("登录")
    checklogin();
    $('main').html(loginTpl);
    login();
}

const checklogin = () => {
    if (cookieController.getCookie("userInfo")) {
        let userInfo = JSON.parse(cookieController.getCookie("userInfo"));
        if (userInfo.status == 0) {
            location.hash = "#me";
        }
    } else {
        return
    }
}

const check = () => {
    let reg1 = /\w{6,}/
    let reg2 = /\w{6,}/
    if (reg1.test($(".username").val()) && reg1.test($(".password").val())) {
        return true;
    } else {
        return false;
    }
}

const login = () => {
    $("#login .login").on("tap", async function () {
        if (check()) {
            let res = (await loginModel.login($(".username").val(), $(".password").val()));
            res = JSON.parse(res);
            if (res.status == 0) {
                //存储用户信息
                cookieController.setCookie("userInfo", JSON.stringify(res), 3)
                location.hash = "#me"
            } else {
                layer.layer.alert(res.info)
            }
        } else {
            layer.layer.alert("请重新填写信息！")
        }
    })
}

export default {
    render
}