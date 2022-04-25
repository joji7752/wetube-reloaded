import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();

//아래랑 같은 것, videoRouter.get("/:id(\\d+)", watch); (\\d+)정규식을 통해 숫자만 받아오도록 함
//([0-9a-f]{24}) mongodb의 자동생성 objectID의 조건(24byte hexadecimal string = 24바이트 16진수)에 맞는 값만 받는 정규식 - objectID는 0부터9 + a부터f 까지인 16진수 24자 string로 이뤄져있음,
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);

export default videoRouter;
