import { Schema, model } from "mongoose";

export interface User {
  userId: string;
  isBanned: boolean;
  language: string;
}

const schema = new Schema<User>({
  userId: { type: String, required: true, unique: true },
  isBanned: { type: Boolean, required: true, default: false },
  language: { type: String, required: true, default: "ja" },
});

export default model("User", schema);
