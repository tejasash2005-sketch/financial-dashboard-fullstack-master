/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  isAdmin: boolean
  image: string[]
  investments: string[]
  income: string[]
  expense: string[]
  budget: string[]
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Enter a username'],
      minlength: [4, 'Min 4 characters required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Enter a Email address'],
      match: [/.+\@.+\..+/, 'Not a valid Email address'],
    },
    password: { type: String, required: true, minlength: 8 },
    firstName: { type: String, minlength: [2, 'Min 2 characters required'] },
    lastName: { type: String, minlength: [2, 'Min 2 characters required'] },
    isAdmin: { type: Boolean },
    image: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    investments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investment' }],
    income: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }],
    expense: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
    budget: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Budget' }],
  },
  { timestamps: true }
)

export default mongoose.model<UserDocument>('User', userSchema)
