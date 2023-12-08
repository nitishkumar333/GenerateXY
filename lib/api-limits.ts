import { auth } from "@clerk/nextjs";

import connectMongoDb from "./mongodb";
import User from "@/models/user";

const MAX_FREE_COUNTS = 5;

export const incrementApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }
  await connectMongoDb();
  const userApiLimit = await User.findOne({ userId: userId });

  if (userApiLimit) {
    await User.updateOne({ userId: userId }, { count: userApiLimit.count + 1 });
  } else {
    console.log(userApiLimit);
    await User.create({ userId: userId, count: 0 });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  await connectMongoDb();

  const userApiLimit = await User.findOne({
    userId: userId,
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  await connectMongoDb();

  const userApiLimit = await User.findOne({ userId: userId });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};
