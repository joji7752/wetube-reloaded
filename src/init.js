//init.js는 database, models 등 필요한 것들을 import 시키는 역할 담당
import "./db";
import Video from "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
