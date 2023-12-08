import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDb = async () => {
  try {
    mongoose
      .connect(`${MONGODB_URI}`)
      .then((result) => {
        console.log("connected in mongodb");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export default connectMongoDb;
