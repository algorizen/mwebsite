import homeTpl from "../views/home.html"
import homeMain from "./home-main"
import cookieController from "./cookie"

const render = async () => {
    $("#root").html(homeTpl);
    showAside();
    hideAside();
    tab();
    homeMain.render();
    initCookie();

}

const showAside = () => {
    $(".nav").on("tap", function () {
        if ($("aside").attr("data-show") == "hide") {
            $("aside").show();
            $("aside ul").animate({
                left: 0
            }, 300)
            $("aside").attr("data-show", "show")
        } else {
            $("aside ul").animate({
                left: "-2.65rem"
            }, 300)
            setTimeout(function () {
                $("aside").hide();
            }, 300)

            $("aside").attr("data-show", "hide")
        }
    })
}

const hideAside = () => {
    $("aside div").on("tap", function (e) {
        $("aside ul").animate({
            left: "-2.65rem"
        }, 300)
        setTimeout(function () {
            $("aside").hide();
        }, 300)

        $("aside").attr("data-show", "hide")
    })
}

//点击nav 下面的选项 页面跳转
const tab = () => {
    $('aside li').on('tap', function () {
        let hashs = ['#home', '#film', '#cinema', "#mall", "#login", "#card"]
        location.hash = hashs[$(this).index()]
        $("aside ul").animate({
            left: "-2.65rem"
        }, 300)
        setTimeout(function () {
            $("aside").hide();
        }, 300)
        $("aside").attr("data-show", "hide")
    });
    $("nav .city").on("tap", function () {
        location.hash = "#city"
    });
    $("nav .me").on("tap", function () {
        location.hash = "#login"
    });
}

const initCookie = () => {
    if (!cookieController.getCookie("city")) {
        let city = {
            "cityid": 12,
            "cityname": "北京"
        }
        $("nav .cityname").text("北京");
        cookieController.setCookie("city", JSON.stringify(city), 3);
    } else {
        let city = JSON.parse(cookieController.getCookie("city"))
        $("nav .cityname").text(city.cityname);
    }
}

export default {
    render
}