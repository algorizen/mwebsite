const cinema = (cityid) => {
    return $.ajax({
        url: "/v4/api/cinema?cityId="+cityid,
        success: function (result) {
            return result
        }
    })
}

export default {
    cinema
}