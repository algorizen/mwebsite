const setCookie = (key, val, expires) => {
    var d = new Date();
    d.setDate(d.getDate() + expires);
    document.cookie = key + "=" + val + ";path=/;expires=" + d;
}

const removeCookie = (key, val) => {
    setCookie(key, val, -1)
}

const getCookie = (key) => {
    var cookie = document.cookie;
    var arr = cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var newArr = arr[i].split("=");
        if (key == newArr[0]) {
            return newArr[1];
        }
    }
}

export default {
    setCookie,
    getCookie,
    removeCookie
}