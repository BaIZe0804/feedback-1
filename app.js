const express = require("express");

var bodyParser = require("body-parser");

//获取日期
var sd = require("silly-datetime");

var app = express();

app.use("/public/", express.static("./public/"));

app.engine("html", require("express-art-template"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var comments = [
  // {
  //   name: "A",
  //   message: "AA",
  //   dataTime: "11-11-11",
  // },
  // {
  //   name: "B",
  //   message: "BB",
  //   dataTime: "22-22-22",
  // },
  // {
  //   name: "C",
  //   message: "CC",
  //   dataTime: "33-33-33",
  // },
];

app.get("/", function (req, res) {
  res.render("index.html", {
    comments: comments,
  });
});

app.get("/post.html", function (req, res) {
  res.render("post.html");
});

//当以post请求/post的时候，执行指定的处理函数
//这样就可以利用不同的请求方法让一个请求路径使用多次
app.post("/post", function (req, res) {
  // console.log("收到POST请求！！");
  /**
   * 1.获取表单POST请求数据
     2.处理
     3.发送响应
   */
  // console.log(req.body);
  var comment = req.body;
  comment.dataTime = sd.format(new Date(), "YYYY-MM-DD HH:mm:ss");
  comments.unshift(comment);

  console.log(req.socket.remoteAddress, req.socket.remotePort);

  //res.send()
  //res.redirect()
  //这些方法Express 都会自动响应
  res.redirect("/");
});

// app.get("/pinglun", function (req, res) {
//   res.query:只能拿 get 请求参数
//   //   console.log(req.query);
//   var comment = req.query;
//   comment.dataTime = sd.format(new Date(), "YYYY-MM-DD HH:mm:ss");
//   comments.unshift(comment);

//   res.redirect("/");

//   // 重定向
//   //   res.status = 302;
//   //   res.setHeader("Location", "/");
// });

app.listen(3000, function () {
  console.log("Running ...");
});
