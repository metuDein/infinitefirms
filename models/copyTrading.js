import { Schema, model, models } from "mongoose";



const copytradingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    traderId: {
        type: Schema.Types.ObjectId,
        ref: 'Trader'
    },
    transId: {
        type: Schema.Types.ObjectId,
        ref: 'Transactions'
    }
})



const Copytrading = models.Copytrading || model("Copytrading", copytradingSchema)

export default Copytrading