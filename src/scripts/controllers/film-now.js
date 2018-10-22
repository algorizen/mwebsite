import filmnowTpl from "../views/film-now.html"
import filmnowModel from "../models/fiml"

var datasource = []
var pageNo = 1

const render = async () => {
    let now = datasource = (await filmnowModel.now()).data.films;
    renderlist(now);
    todetail()
    scroll();
}

const todetail = () => {
    $("#film .list ").on("tap", "li", function () {
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
        foot = $('.foot img');
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
            foot = $('.foot img');
            foot.attr('src', '/images/ajax-loader.gif');
            let res = (await filmnowModel.nowmore(++pageNo)).data.films;
            if (res.length > 0) {
                let now = datasource = [
                    ...datasource,
                    ...res
                ]
                renderlist(now)
                foot = $('.foot img');
                this.refresh()
                foot = $('.foot img');
                foot.attr('src', '/images/arrow.png')
                    .removeClass('down')
                this.scrollTo(0, this.maxScrollY + h)
            } else {
                foot = $('.foot img');
                foot.attr('src', '/images/arrow.png')
                    .removeClass('down')
                $("#film .list .foot b").text("没有更多电影了！")
            }
        }
    })
}

const renderlist = (now) => {
    let tpl = Handlebars.compile(filmnowTpl);
    let html = tpl({
        now
    })
    $("#film .list>div").html(html);
}

export default {
    render
}