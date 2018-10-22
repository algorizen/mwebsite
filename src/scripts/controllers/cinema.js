import cinemaTpl from '../views/cinema.html'
import cinemaModel from '../models/cinema'
import cookie from "./cookie"

const render = async () => {
    $("nav .title").text("全部影院")
    let city = JSON.parse(cookie.getCookie("city"));
    let cinema = (await cinemaModel.cinema(city.cityid)).data.cinemas;
    cinema = cinemadeal(cinema);
    let tpl = Handlebars.compile(cinemaTpl);
    let html = tpl({
        cinema
    });
    $('main').html(html);
    $("#cinema div ul").hide();
    $("#cinema div:first-child ul").show();
    districtToggle()
    todetail();
}

const cinemadeal = (arr) => {
    let a = {};
    for (let i = 0; i < arr.length; i++) {
        if (a[arr[i].district.name]) {
            continue;
        } else {
            a[arr[i].district.name] = 1;
        }
    };
    let district = Object.keys(a);
    let cinema = [];
    for (let i = 0; i < district.length; i++) {
        cinema[i] = {};
        cinema[i].district = district[i];
        cinema[i].data = [];
    };
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < cinema.length; j++) {
            if (arr[i].district.name == cinema[j].district) {
                cinema[j].data.push(arr[i]);
            }
        }
    };
    return cinema;
}

const districtToggle = () => {
    $("#cinema div h3").on("tap", function () {
        $(this).next().toggle()
    })
}

const todetail = () => {
    $("#cinema div li").on("tap", function () {
        let id = $(this).attr("data-cinema");
        location.hash = "#cinemadetail?" + id;
    })
}

export default {
    render
}