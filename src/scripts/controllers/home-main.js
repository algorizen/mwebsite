import homeMaintpl from "../views/home-main.html"
import homeMainmodel from "../models/home-main"
import nowTpl from "../views/home-now.html"
import comingTpl from "../views/home-coming.html"

const render = async () => {
    $("nav .title").text("卖座电影")
    $('main').html(homeMaintpl);
    await renderBg();
    await renderNow();
    await renderComing();
    todetail();
    tofilmnow();
    tofilmcoming();
}

const renderBg = async () => {
    let bg = (await homeMainmodel.bg()).data.billboards[0].imageUrl;
    $("#bg img").attr("src", bg);
}

const renderNow = async () => {
    let now = (await homeMainmodel.now()).data.films;
    let template = Handlebars.compile(nowTpl);
    let html = template({
        now
    })
    $('#now>ul').html(html)
}

const renderComing = async () => {
    let coming = (await homeMainmodel.coming()).data.films;
    for (let i = 0; i < coming.length; i++) {
        let date = new Date(coming[i].premiereAt);
        coming[i].month = date.getMonth() + 1;
        coming[i].day = date.getDate();
    }
    let template = Handlebars.compile(comingTpl);
    let html = template({
        coming
    })
    $('#coming>ul').html(html)
}

const todetail = () => {
    $('#now li').on("tap", function () {
        let id = $(this).attr("data-id");
        location.hash = "#detail?" + id;
    })
    $('#coming li').on("tap", function () {
        let id = $(this).attr("data-id");
        location.hash = "#detail?" + id;
    })
}

//跳转到film列表
const tofilmnow = () => {
    $("#now p").on("tap", function () {
        location.hash = "#film?now"
    })
}

const tofilmcoming = () => {
    $("#coming p").on("tap", function () {
        location.hash = "#film?coming"
    })
}

export default {
    render
}