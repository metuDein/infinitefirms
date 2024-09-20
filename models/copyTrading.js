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
})



const Copytrading = models.Copytrading || model("Copytrading", copytradingSchema)

export default Copytrading