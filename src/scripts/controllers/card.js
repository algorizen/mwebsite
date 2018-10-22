import cardTpl from '../views/card.html';
import cardLeftTpl from "../views/card-left.html"
import cardRightTpl from "../views/card-right.html"

const render = () => {
    $("nav .title").text("查询/绑定/激活卖座卡")
    $('main').html(cardTpl);
    let flag = location.hash.split("?")[1];
    if (flag == "right") {
        $("#card .tab .right").addClass("active").siblings().removeClass("active");
        cardRighttRender();
    } else {
        $("#card .tab .left").addClass("active").siblings().removeClass("active");
        cardLeftRender();
    }
    tab();
}

const tab = () => {
    $("#card .tab .left").on("tap", function () {
        $(this).addClass("active").siblings().removeClass("active");
        cardLeftRender();
    })
    $("#card .tab .right").on("tap", function () {
        $(this).addClass("active").siblings().removeClass("active");
        cardRighttRender();
    })
}

const cardLeftRender = () => {
    $("#card .list").html(cardLeftTpl);
}

const cardRighttRender = () => {
    $("#card .list").html(cardRightTpl);
}

export default {
    render
}