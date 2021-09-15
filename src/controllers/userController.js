import User from "../models/User";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "🥰 Join" });

export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({
    $or: [{ username }, { email }],
  });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "😊 Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.exists({ username });
  //계정이 존재하는지?
  if (!exists) {
    return res.status(400).render("login", {
      pageTitle: "😊 Login",
      errorMessage: "An account with this username does not exists",
    });
  }
  //패스워드가 일치하는지?
  res.end();
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("del user");
export const logout = (req, res) => res.send("logout user");
export const see = (req, res) => res.send("see user");
