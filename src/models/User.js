import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  avatarUrl: { type: String },
  socialOnly: { type: Boolean, default: false },
  username: { type: String, require: true, unique: true },
  password: { type: String },
  name: { type: String, require: true },
  location: String,
});
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User;
