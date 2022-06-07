import { IColor } from "../types/color";
import { model, Schema } from "mongoose";
require('dotenv').config();

const colorSchema: Schema = new Schema(
  {
    colorCode: {
      type: String,
      required: true,
    },
    colorName: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      required: true,
    },
  },
  { collection: process.env.COLLECTION_NAME}
);
export default model<IColor>("Model", colorSchema, process.env.COLLECTION_NAME);
