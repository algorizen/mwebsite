const bg = () => {
    return $.ajax({
        url: "/v4/api/billboard/home?__t=1539181344605",
        type: "get",
        success: function (result) {
            return result;
        }
    })
}

const now = () => {
    return $.ajax({
        url: "/v4/api/film/now-playing?__t=1539181344610&page=1&count=5",
        type: "get",
        success: function (result) {
           // console.log(result);
            return result;
        }
    })
}

const coming = () => {
    return $.ajax({
        url: "/v4/api/film/coming-soon?__t=1539181344617&page=1&count=3",
        type: "get",
        success: function (result) {
            return result;
        }
    })
}

export default {
    bg,
    now,
    coming
}