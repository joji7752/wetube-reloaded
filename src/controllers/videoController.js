import Video from "../models/Video";

// Video.find({}, (error, videos) => {});

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server-error", error);
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: `😅 Video not found` });
  }
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

//form render
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: `😅 Video not found` });
  }
  return res.render("edit", { pageTitle: `Editing : ${video.title}`, video });
};

//modify video
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.exists({ _id: id });
  const { title, description, hashtags } = req.body; // form에 있는 value의 javascript representation이다 app.use(express.urlencoded({ extended: true })); 미들웨어 코드가 있어야 사용가능
  if (!video) {
    return res.status(404).render("404", { pageTitle: `😅 Video not found` });
  }
  try {
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
  } catch (error) {
    return res.status(400).render("server-error-postEdit", error);
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
    return res.status(400).render("upload", {
      pageTitle: "📼 Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    //delete video
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (error) {
    console.log(`error====>`, error._message);
  }
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    //search
    videos = await Video.find({
      title: {
        $regex: new RegExp(`^${keyword}`, "i"),
        //$gt: 3 greater than3,3보다 많은
      },
    }).sort({ createdAt: "desc" });
  }
  return res.render("search", { pageTitle: "👁‍🗨 Search Video", videos });
};
