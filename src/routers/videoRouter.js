import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

//아래랑 같은 것, videoRouter.get("/:id(\\d+)", watch); (\\d+)정규식을 통해 숫자만 받아오도록 함
videoRouter.route("/:id(\\d+)").get(watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
