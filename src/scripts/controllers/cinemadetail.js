import cinemadetailTpl from "../views/cinemedetail.html";
import detailModel from "../models/detail";

const render = async () => {
    let id = location.hash.split("?")[1];
    let cinema = (await detailModel.cinemadetail(id)).data.cinema;
    let tpl = Handlebars.compile(cinemadetailTpl)
    let html = tpl({
        cinema
    })
    $("main").html(html);
    $("nav .title").text(cinema.name);
    tab();
    toSchedule(id);
}

const tab = () => {
    $(".tablist .box1 li").on("tap", function () {
        let index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".tablist .box2 li").eq(index).addClass("active").siblings().removeClass("active");
    })
}

const toSchedule = (id) => {
    $("#cinemadetial .schedule").on("tap", function () {
        console.log(id)
        location.hash = "#schedule?" + id;
    })
}

export default {
    render
}