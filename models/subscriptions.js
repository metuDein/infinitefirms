import { Schema, models, model } from "mongoose";

const subscritionSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    transId: {

        type: Schema.Types.ObjectId,
        ref: 'Transactions'
    },

    instruments: String,
    duration: {
        type: Number,
        default: 30
    },
    price: {
        type: Number,
    },
    earning: Number,
    status: {
        type: String,
        default: 'inactive'
    }
},
    {
        timestamps: true
    })


const Subscription = models.Subscription || model('Subscription', subscritionSchema)
export default Subscription

