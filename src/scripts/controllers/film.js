import filmTpl from '../views/film.html';
import fimlnowController from "./film-now";
import fimlcomingController from "./film-coming";

const render = () => {
    $("nav .title").text("卖座电影")
    $('main').html(filmTpl);
    let flag = location.hash.split("?")[1];
    if (flag == "coming") {
        $("#film .tab .coming").addClass("active").siblings().removeClass("active");
        fimlcomingController.render();
    } else {
        $("#film .tab .now").addClass("active").siblings().removeClass("active");
        fimlnowController.render();
    }
    tab();
}

const tab = () => {
    $("#film .tab .now").on("tap", function () {
        $(this).addClass("active").siblings().removeClass("active");
        fimlnowController.render();
    })
    $("#film .tab .coming").on("tap", function () {
        $(this).addClass("active").siblings().removeClass("active");
        fimlcomingController.render();
    })
}

export default {
    render
}