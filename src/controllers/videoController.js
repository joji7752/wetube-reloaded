import Video from "../models/Video";

// Video.find({}, (error, videos) => {});

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server-error", error);
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: `😅 Video not found` });
  }
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

//form render
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: `😅 Video not found` });
  }
  return res.render("edit", { pageTitle: `Editing : ${video.title}`, video });
};

//modify video
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.exists({ _id: id });
  const { title, description, hashtags } = req.body; // form에 있는 value의 javascript representation이다 app.use(express.urlencoded({ extended: true })); 미들웨어 코드가 있어야 사용가능
  if (!video) {
    return res.render("404", { pageTitle: `😅 Video not found` });
  }
  try {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
  } catch (error) {
    return res.render("server-error-postEdit", error);
  }
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "📼 Upload Video" });
};

export const postUpload = async (req, res) => {
  //here we will add a video to the videos array.
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(`error======>`, error);
    return res.render("upload", {
      pageTitle: "📼 Upload Video",
      errorMessage: error._message,
    });
  }
};
