//server.js는 express, server의 configuration에 관련된 코드만 처리
import express from "express";
import morgan from "morgan"; // 로그를 남겨주는 모듈
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import session from "express-session";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); //express app이 form의 value들을 이해할 수 있도록 하고, 자바스크립트 object 형식으로 통역해줌

//session 미들웨어 코드
app.use(
  session({
    secret: "hello",
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true }
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

app.get("/add-one", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id} ${req.session.potato}`);
});

app.use(localsMiddleware); //이 미들웨어는 session object을 사용하기 때문에 session 미들웨어 코드 보다 아래에 와야함
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
