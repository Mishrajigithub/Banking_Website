import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  acc_no: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    default: "NA",
  },
  acc_balance: {
    type: Number,
    required: true,
  },
});




const UserModel = new mongoose.model('User',userSchema);
export default UserModel;

