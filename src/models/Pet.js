import { Schema } from "mongoose";

export const PetSchema = new Schema(
  {
    name: { type: String, minlength: 1, maxLength: 100, required: true },
    imgUrl: { type: String, minlength: 1, maxLength: 1000, required: true },
    age: { type: Number, min: 0, max: 30, required: true },
    likes: [{ type: String, maxLength: 100, required: true }],
    isVaccinated: { type: Boolean, required: true, default: true },
    status: { type: String, enum: ['adopted', 'adoptable'], required: true },
    species: { type: String, enum: ['cat', 'dog', 'bird', 'capybara'], required: true, default: 'unknown' },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },

  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

PetSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})