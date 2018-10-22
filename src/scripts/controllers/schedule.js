import scheduleTpl from "../views/schedule.html"
import scheduledetailTpl from "../views/scheduledetail.html"
import scheduleModel from "../models/schedule"

const render = async () => {
    // $("main").html(scheduleTpl);
    let id = location.hash.split("?")[1];
    let date = new Date();
    let film = (await scheduleModel.film(id, date.getTime())).data.filmList;
    let schedule = (await scheduleModel.schedule(date.getTime(), id)).data.schedules;

    schedule = scheduleDeal(schedule);


    let tpl = Handlebars.compile(scheduleTpl);
    let html = tpl({
        film
    });
    $("main").html(html);
    let tpl2 = Handlebars.compile(scheduledetailTpl);
    let html2 = tpl2({
        schedule
    })
    $("#schedule .content").html(html2);

    $("#schedule .head li").eq(0).addClass("active");
    $("#schedule .content .filmInfo").eq(0).addClass("active");
    $("#schedule .content .filmInfo").each(function (index, ) {
        $(this).find(".date").eq(0).addClass("active")
        $(this).find(".filmdata").eq(0).addClass("active")
    })
    scroll();
    tabSchedule();
    $("#schedule .content .filmdata").each(function (index) {
        if ($(this).children("li").length == 0) {
            $(this).html("<p>暂无排片信息</p>")
        }
    })

}

const scroll = () => {
    let posScroll = new BScroll('#schedule .main', {
        probeType: 2,
        startY: 0,
        scrollX: true,
        scrollY: false
    })
    $("#schedule .main li").on("tap", function () {
        posScroll.scrollToElement(this, 300, true);
        $(this).addClass("active").siblings().removeClass("active");
        let index = $(this).index()
        $("#schedule .content .filmInfo").eq(index).addClass("active").siblings().removeClass("active");
    })

    posScroll.on("scrollEnd", function () {
        //这个110是测试出来的 有个bug 取100的时候，最后几个影片信息会自动滚动
        //获取当前滚动距离，除以一个定值，获取应该显示选择的下标
        let index = Math.ceil(Math.abs(this.x / 110));
        posScroll.scrollToElement(document.querySelectorAll("#schedule .main li")[index], 300, true);
        $("#schedule .main li").eq(index).addClass("active").siblings().removeClass("active");
        $("#schedule .content .filmInfo").eq(index).addClass("active").siblings().removeClass("active");
    })
}

//设置间隔日期
const setRelativeDate = (obj) => {
    let nowtime = new Date().getTime();
    let differ = Math.round((obj.showAt - nowtime) / 1000 / 86400);
    let arr = {
        '0': '今天',
        '1': '明天',
        '2': '后天'
    }
    obj["differ"] = arr[differ];
    let month = new Date(nowtime + 86400000).getMonth() + 1;
    obj["month"] = month > 9 ? month : "0" + month;
    let day = new Date(nowtime + 86400000).getDate();
    obj["day"] = day > 9 ? day : "0" + day;
}

//设置电影开始时间
const setStart = (obj) => {
    let time = new Date(obj.showAt);
    obj.startH = time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
    obj.startM = time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
}

//设置电影结束时间
const setEnd = (obj) => {
    let time = new Date(obj.showAt + 1000 * 60 * obj.film.mins);
    obj.endH = time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
    obj.endM = time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
}

//数据拍片数据，方便数据插入
const scheduleDeal = (schedules) => {
    for (let i = 0; i < schedules.length; i++) {
        setRelativeDate(schedules[i]);
        setStart(schedules[i]);
        setEnd(schedules[i]);
    }

    let res = [];
    for (let i = 0; i < schedules.length; i++) {
        let flag = false;
        for (let j = 0; j < res.length; j++) {
            if (res[j].filmid == schedules[i].film.id) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            res.push({
                filmid: schedules[i].film.id,
                filmschedule: [{
                        text: "",
                        data: []
                    },
                    {
                        text: "",
                        data: []
                    },
                    {
                        text: "",
                        data: []
                    }
                ]
            })
        }
    }

    for (let i = 0; i < schedules.length; i++) {
        for (let j = 0; j < res.length; j++) {
            if (res[j].filmid == schedules[i].film.id) {
                if (schedules[i].differ == "今天") {
                    res[j].filmschedule[0].data.push(schedules[i])
                    break;
                } else if (schedules[i].differ == "明天") {
                    res[j].filmschedule[1].data.push(schedules[i])
                    break;
                } else if (schedules[i].differ == "后天") {
                    res[j].filmschedule[2].data.push(schedules[i])
                    break;
                } else {
                    continue;
                }
            }
        }
    }

    for (let i = 0; i < res.length; i++) {

        for (let j = 0; j < 3; j++) {
            let nowtime = new Date().getTime();
            let a = ["今天", "明天", "后天"]
            let month = new Date(nowtime + 86400000 * j).getMonth() + 1;
            month = month > 9 ? month : "0" + month;
            let day = new Date(nowtime + 86400000 * j).getDate();
            day = day > 9 ? day : "0" + day;

            res[i].filmschedule[j].text = a[j] + "(" + month + "/" + day + ")"
        }
    }

    //将日期表按照时间戳排序
    for (let i = 0; i < res.length; i++) {

        for (let j = 0; j < 3; j++) {
            res[i].filmschedule[j].data.sort(function (a, b) {
                return a.showAt - b.showAt
            })
        }

    }

    return res;
}

const tabSchedule = () => {
    $("#schedule .title .date").on("tap", function () {
        let infobox = $(this).parent().parent();
        let index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active")
        infobox.find(".filmdata").eq(index).addClass("active").siblings().removeClass("active")
    })
}

export default {
    render
}