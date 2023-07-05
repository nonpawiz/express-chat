require('dotenv').config();
var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const figlet = require("figlet");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const bodyParser = require('body-parser')
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log("join_room  : " + data);
    socket.join(data);
  });

  socket.on("join_user", (data) => {
    console.log("join_user  : " + data);
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log("send_message : " + data);
    socket.to(data.room).emit("receive_message", data);
  });
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  figlet("nonpawiz", (err, nonpawiz) => {
    console.log(nonpawiz);
    console.log(
      `Server is Successfully Running, and App is listening on http://localhost:${port}/`
    );
  });
});
