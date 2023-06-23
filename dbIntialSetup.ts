import mongoose from "mongoose";

const dbInitialSetup = async (uri: string) => {
  mongoose.connect(uri);
  mongoose.connection
    .once("open", () =>
      console.log("¡Database connection established!")
    )
    .on("error", (error) => console.log(error));
};

export default dbInitialSetup; 