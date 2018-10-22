const login = (username, password) => {
    return $.ajax({
        url: "/login",
        type: "get",
        data: {
            "username": username,
            "password": password
        },
        success: function (result) {
            console.log(result);
            return result
        }
    })
}

export default {
    login
}