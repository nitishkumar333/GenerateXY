import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userId: String,
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.models.User || mongoose.model("User", userSchema);

export default user;
