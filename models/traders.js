import { Schema, models, model } from "mongoose"


const tradersSchema = new Schema({
    traderName: {
        type: String,
        required: true
    },
    image: {
        public_id: String,
        secure_url: String
    },
    traderEmail: {
        type: String,
        required: true
    },
    traderRoi: {
        thirtydays: Number,
    },
    traderType: {
        gold: {
            type: Boolean,
            default: false
        },
        silver: {
            type: Boolean,
            default: false
        },
        bronze: {
            type: Boolean,
            default: false
        }

    },
    traderRating: {
        type: Number,
        default: 4
    },
    traderLocation: {
        type: String,
        required: true
    },
    traderCopier: {
        type: Number,
        default: 0
    },
    traderDescription: {
        type: String,
        // required: true
    },
    joined: {
        type: Number,
        default: 2019
    }

}, {
    timestamps: true
})

const Trader = models.Trader || model('Trader', tradersSchema)

export default Trader