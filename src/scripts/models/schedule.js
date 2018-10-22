const schedule = (time, cinema) => {
    return $.ajax({
        url: "/v4/api/schedule?__t=" + time + "&film=0&cinema=" + cinema,
        type: "get",
        success: function (result) {
            return result
        }
    })
}

const film = (cinema, data) => {
    return $.ajax({
        url: "/v4/api/cinema/" + cinema + "/film?__t=" + data,
        type: "get",
        success: function (result) {
            return result
        }
    })
}

export default {
    schedule,
    film
}