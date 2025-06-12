// 加载Express模块
const express = require("express");
const path = require("path");

// 加载bodyParser模块
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const router = require("./routes");
// require('dotenv').config()

// 创建服务器对象
const server = express();
//用于解析表单数据 Context-Type 为application/x-www-form-urlencoded 时 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(bodyParser.json());
server.use(cookieParser("yicaihuiddddd"));

// 加载CORS模块
const cors = require("cors");

// 使用CORS中间件
server.use(cors({ credentials: true, origin: true }));

server.use(router);
server.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header('Access-Control-Allow-Credentials', 'true');
  res.header("X-Powered-By", " 3.2.1");
  next();
});

server.use(express.static(path.join(__dirname, "public")));
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 指定服务器对象监听的端口号
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
  console.log(`Serving static files from: ${path.join(__dirname, "public")}`);
});
