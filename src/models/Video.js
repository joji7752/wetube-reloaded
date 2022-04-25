import mongoose from "mongoose";

//😋해쉬태그 split과 #을 붙이기 위한 미들웨어 코드 - 방법2
//함수를 만들어서 export 하는 방법
// export const formatHashtags = (hashtags) =>
//   hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
//videoController.js에서 hashtags: formatHashtags(hashtags)코드 써야함

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

//😋해쉬태그 split과 #을 붙이기 위한 미들웨어 코드 - 방법3
//Static을 이용한 방법
//videoController.js에서 hashtags: Video.formatHashtags(hashtags)써야함
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

//middleware는 반드시 모듈이 생성 되기 전에 만들어져야한다.
//해쉬태그 split과 #을 붙이기 위한 미들웨어 코드 - 방법1
//model.create()의 save 훅업을 이용한 방법, 하지만 model.findByIdAndUpdate()는 save 훅업이 일어나지 않기 때문에 한계가 있다.
// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
// });

const Video = mongoose.model("Video", videoSchema);
export default Video;
