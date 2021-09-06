import Video from "../models/Video";

Video.find({}, (error, videos) => {});

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server-error", error);
  }
};

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching` });
};

//form render
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};

//modify video
export const postEdit = (req, res) => {
  const { id } = req.params;

  const { title } = req.body; // form에 있는 value의 javascript representation이다 app.use(express.urlencoded({ extended: true })); 미들웨어 코드가 있어야 사용가능
  return res.redirect(`/videos/${id}`);
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
      // createdAt: Date.now(),
      hashtags: hashtags.split(",").map((word) => `#${word}`),
      meta: {
        views: 0,
        rating: 0,
      },
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "📼 Upload Video",
      errorMessage: error._message,
    });
  }
};
