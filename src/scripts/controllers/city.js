import cityTpl from '../views/city.html'
import cityModel from "../models/city"
import cookieController from "../controllers/cookie"

const render = async () => {
    $("nav .title").text("选择城市")
    let city = (await cityModel.city()).data.cities;
    city = citydeal(city);
    let tpl = Handlebars.compile(cityTpl);
    let html = tpl({
        city
    })
    $('main').html(html)
    tocity();
    changecity();
}

const citydeal = (arr) => {
    let a = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
        "W", "X", "Y", "Z"
    ]
    let city = [];
    for (let i = 0; i < a.length; i++) {
        city[i] = {};
        city[i].word = a[i];
        city[i].data = [];
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < a.length; j++) {
            if (city[j].word == arr[i]["pinyin"][0]) {
                city[j].data.push(arr[i]);
                break;
            }
        }
    }
    return city;
}

const tocity = () => {
    $("#city .word li").on("tap", function () {
        document.getElementById($(this).attr("data-go")).scrollIntoView(true)
    })
}

const changecity = () => {
    $("#city .city li").on("tap", function () {
        let cityid = $(this).attr("data-city");
        let cityname = $(this).text();
        let obj = {
            "cityid": cityid,
            "cityname": cityname
        }
        $("nav .cityname").text(cityname)
        cookieController.setCookie("city", JSON.stringify(obj), 3);
        window.history.back();
    })
}

export default {
    render
}