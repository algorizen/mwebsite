import detailTpl from "../views/detail.html"
import detailModel from "../models/detail"

const render = async () => {
    let detail = (await detailModel.detail()).data.film;
    actorlist(detail)
    datedeal(detail)
    renderdetail(detail);
    buyTicket()
}

//处理演员链
const actorlist = (detail) => {
    let actorlist = "";
    for (let i = 0; i < detail.actors.length; i++) {
        actorlist += "|" + detail.actors[i].name;
    }
    detail.actorlist = actorlist.slice(1);
}

//处理时间
const datedeal = (detail) => {
    let date = new Date(detail.premiereAt);
    detail.month = date.getMonth() + 1;
    detail.day = date.getDate();
}

//渲染详情页
const renderdetail = (detail) => {
    let template = Handlebars.compile(detailTpl);
    let html = template({
        detail
    })
    $('main').html(html)
}

const buyTicket = () => {
    $("#detail .buy").on("tap", function () {
        location.hash = "#cinema"
    })
}

export default {
    render
}