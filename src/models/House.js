import { Schema } from "mongoose";

export const HouseSchema = new Schema(
  {


  },
  { timestamps: true, toJSON: { virtuals: true } }
);