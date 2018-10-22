const city =() => {
    return $.ajax({
        url: "/v4/api/city" ,
        success: function (result) {
            return result;
        }
    })
}

export default{
    city
}