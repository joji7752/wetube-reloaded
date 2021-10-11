//init.js는 database, models 등 필요한 것들을 import 시키는 역할 담당
import "dotenv/config"; //require("dotenv").config(); .env와 연결해주는 코드 ,as early as possible in your application
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
