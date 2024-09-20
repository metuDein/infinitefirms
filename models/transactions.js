import { Schema, model, models } from "mongoose";


const transactionsSchema = new Schema({
    image: {
        public_id: String,
        secure_url: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    transtype: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    addressUsed: {
        type: String,
        required: true
    },
    txhash: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    },
    hashrate: Number,
    reason: String

}, {
    timestamps: true
})


const Transactions = models.Transactions || model('Transactions', transactionsSchema)
export default Transactions