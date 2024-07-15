
import mongoose from "mongoose";
import { Schema } from "mongoose";

const transactionSchema = new Schema({
    Date: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    From: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    To: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

 const TransactionModel = new mongoose.model("Transaction", transactionSchema);
 export default TransactionModel;
