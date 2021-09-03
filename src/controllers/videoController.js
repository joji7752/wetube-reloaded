const fakeUser = {
  username: "Nicolas",
  loggedIn: true,
};

const videos = [
  {
    title: "🌻First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "🌼Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 0,
    id: 2,
  },
  {
    title: "🌷Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

//form render
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

//modify video
export const postEdit = (req, res) => {
  const { id } = req.params;

  const { title } = req.body;
  // form에 있는 value의 javascript representation이다 app.use(express.urlencoded({ extended: true })); 미들웨어 코드가 있어야 사용가능

  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "📼 Upload Video" });
};

export const postUpload = (req, res) => {
  //here we will add a video to the videos array.
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
