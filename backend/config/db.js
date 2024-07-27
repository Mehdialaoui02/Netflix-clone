import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("MongoDB connected" + connection.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
