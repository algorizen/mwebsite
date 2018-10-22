const now = () => {
    return $.ajax({
        url: "/v4/api/film/now-playing?page=1&count=7",
        type: "get",
        success: function (result) {
            return result;
        }
    })
}

const coming = () => {
    return $.ajax({
        url: "/v4/api/film/coming-soon?page=1&count=7",
        type: "get",
        success: function (result) {
            return result;
        }
    })
}

const nowmore = (pageNo) => {
    return $.ajax({
        url: "/v4/api/film/now-playing?page=" + pageNo + "&count=7",
        type: "get",
        success: function (result) {
            return result;
        }
    })
}

const comingmore = (pageNo) => {
    return $.ajax({
        url: "/v4/api/film/coming-soon?page=" + pageNo + "&count=7",
        type: "get",
        success: function (result) {
            return result;
        }
    })
}

export default {
    now,
    coming,
    nowmore,
    comingmore
}