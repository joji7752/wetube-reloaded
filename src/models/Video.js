import mongoose from "mongoose";

//๐ํด์ฌํ๊ทธ split๊ณผ #์ ๋ถ์ด๊ธฐ ์ํ ๋ฏธ๋ค์จ์ด ์ฝ๋ - ๋ฐฉ๋ฒ2
//ํจ์๋ฅผ ๋ง๋ค์ด์ export ํ๋ ๋ฐฉ๋ฒ
// export const formatHashtags = (hashtags) =>
//   hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
//videoController.js์์ hashtags: formatHashtags(hashtags)์ฝ๋ ์จ์ผํจ

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

//๐ํด์ฌํ๊ทธ split๊ณผ #์ ๋ถ์ด๊ธฐ ์ํ ๋ฏธ๋ค์จ์ด ์ฝ๋ - ๋ฐฉ๋ฒ3
//Static์ ์ด์ฉํ ๋ฐฉ๋ฒ
//videoController.js์์ hashtags: Video.formatHashtags(hashtags)์จ์ผํจ
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

//middleware๋ ๋ฐ๋์ ๋ชจ๋์ด ์์ฑ ๋๊ธฐ ์ ์ ๋ง๋ค์ด์ ธ์ผํ๋ค.
//ํด์ฌํ๊ทธ split๊ณผ #์ ๋ถ์ด๊ธฐ ์ํ ๋ฏธ๋ค์จ์ด ์ฝ๋ - ๋ฐฉ๋ฒ1
//model.create()์ save ํ์์ ์ด์ฉํ ๋ฐฉ๋ฒ, ํ์ง๋ง model.findByIdAndUpdate()๋ save ํ์์ด ์ผ์ด๋์ง ์๊ธฐ ๋๋ฌธ์ ํ๊ณ๊ฐ ์๋ค.
// videoSchema.pre("save", async function () {
//   this.hashtags = this.hashtags
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
// });

const Video = mongoose.model("Video", videoSchema);
export default Video;
