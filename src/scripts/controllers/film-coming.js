import filmcomingTpl from "../views/film-coming.html"
import filmcomingModel from "../models/fiml"

var datasource = []
var pageNo = 1

const render = async () => {
    let coming = datasource = (await filmcomingModel.coming()).data.films;
    coming = datasource = datedeal(coming);
    renderlist(coming)
    todetail();
    scroll();
}

const todetail = () => {
    $("#film .list").on("tap", "li", function () {
        let id = $(this).attr("data-id");
        location.hash = "#detail?" + id;
    })
}

const scroll = () => {
    let posScroll = new BScroll('#film .list', {
        probeType: 2,
        startY: 0
    })
    let foot = $('.foot img');
    const h = $(".foot").height();

    posScroll.on('scroll', function () {
        let y = this.y;
        let maxY = this.maxScrollY - y
        let foot = $('.foot img');
        if (maxY >= 0) {
            foot.addClass('down')
        }
    })

    posScroll.on('scrollEnd', async function () {
        let y = this.y;
        let maxY = this.maxScrollY - y
        if (maxY >= -h && maxY < 0) {
            this.scrollTo(0, this.maxScrollY + h)
        } else if (maxY >= 0) {
            let foot = $('.foot img');
            foot.attr('src', '/images/ajax-loader.gif');
            let res = (await filmcomingModel.comingmore(++pageNo)).data.films;
            if (res.length > 0) {
                let coming = datasource = [
                    ...datasource,
                    ...res
                ]
                coming = datedeal(coming)
                renderlist(coming)
                this.refresh()
                foot.attr('src', '/images/arrow.png')
                    .removeClass('down')
                this.scrollTo(0, this.maxScrollY + h)
            } else {
                foot.attr('src', '/images/arrow.png')
                    .removeClass('down')
                $("#film .list .foot b").text("没有更多电影了！")
            }
        }
    })
}

const renderlist = (coming) => {
    let tpl = Handlebars.compile(filmcomingTpl);
    let html = tpl({
        coming
    })
    $("#film .list>div").html(html);
}

const datedeal = (coming) => {
    let weeks = new Array("日", "一", "二", "三", "四", "五", "六");
    for (let i = 0; i < coming.length; i++) {
        let date = new Date(coming[i].premiereAt);
        coming[i].month = date.getMonth() + 1;
        coming[i].day = date.getDate();
        coming[i].week = weeks[date.getDay()];
    }
    return coming
}

export default {
    render
}