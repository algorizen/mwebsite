const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((request, response) => {

    const {
        query,
        pathname
    } = url.parse(request.url, true);
    if (pathname == "/login") {
        fs.readFile("./user.json", (err, data) => {
            data = JSON.parse(data);

            let flag = false;
            let obj = {
                info: "", //返回的信息
                status: "", //返回的状态码
                data: "" //返回数据
            };
            for (let i = 0; i < data.length; i++) {
                if (data[i].username == query.username) {
                    if (data[i].password == query.password) {
                        flag = true;
                        obj.info = "登录成功";
                        obj.status = "0";
                        obj.data = {
                            id: data[i].id,
                            mobile: data[i].mobile,
                            name: data[i].name,
                            avatorUrl: data[i].avatorUrl
                        }
                        break;
                    } else {
                        flag = true;
                        obj.info = "密码错误";
                        obj.status = "1";
                        obj.data = "";
                        break;
                    }
                } else {
                    continue;
                }
            }
            response.writeHead(200, {
                "content-type": "text/plain;charset=utf8"
            })
            if (flag) {
                response.end(JSON.stringify(obj))
            } else {
                obj.info = "用户名错误";
                obj.status = "1";
                obj.data = "";
                response.end(JSON.stringify(obj))
            }
        })
    }




}).listen(3000, "localhost", () => {
    console.log("服务器在localhost:3000上运行！")
})