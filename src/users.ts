import  User from "./models/userModel";

export async function getUserByEmail(email: String) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
