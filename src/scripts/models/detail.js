const detail = () => {
    var id = location.hash.split("?")[1];
    return $.ajax({
        url: "/v4/api/film/" + id,
        success: function (result) {
            return result;
        }
    })
}

const cinemadetail =() => {
    var id = location.hash.split("?")[1];
    return $.ajax({
        url: "/v4/api/cinema/" + id,
        success: function (result) {
            return result;
        }
    })
}

export default {
    detail,
    cinemadetail
}