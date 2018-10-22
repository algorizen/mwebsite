import meTpl from "../views/me.html";
import cookieController from "../controllers/cookie"
const render = () => {
    $("main").html(meTpl);
    let userInfo = JSON.parse(cookieController.getCookie("userInfo")).data;
    $("#me .title img").attr("src", userInfo.avatorUrl);
    $("#me .title .username").text(userInfo.name);
    $("#me .title .userid").text("ID:" + userInfo.id);
    quit();
}

const quit = () => {
    $("#me .quit").on("tap", function () {
        cookieController.removeCookie("userInfo","");
        location.hash ="#login";
    })
}

export default {
    render
}