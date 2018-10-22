const layer = (function () {
    var iW = document.documentElement.clientWidth;
    var iH = document.documentElement.clientHeight;
    var div;
    (function () {
        if (!div) {
            div = document.createElement("div");
        }
    })()

    return {
        alert: function (info) {
            div.innerText = info;
            document.getElementById("login").appendChild(div);
            div.className = "layer";
            div.style.left = (iW - div.offsetWidth) / 2 + "px";
            div.style.top = (iH - div.offsetHeight) / 2 + "px";
            $(div).show();
            setTimeout(() => {
                $(div).hide();
            }, 2000);
        }
    }
})()

export default {
    layer
}