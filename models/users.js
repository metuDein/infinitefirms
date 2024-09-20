import { model, models, Schema } from "mongoose";


const userSchema = new Schema({
    image: {
        public_id: String,
        secure_url: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    traders: {
        type: Schema.Types.ObjectId,
        ref: 'Trader'
    },
    firstname: {
        type: String,
        required: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number,
    },
    balances: {
        profit: {
            type: Number,
            default: 0
        },
        expectedTrading: {
            type: Number,
            default: 0
        },
        expectedMining: {

            type: Number,
            default: 0
        },
        trading: {
            type: Number,
            default: 0
        },
        mining: {
            type: Number,
            default: 0
        },
        deposit: {

            type: Number,
            default: 0
        },
        bonus: {
            type: Number,
            default: 0
        },
        bitcoin: {
            type: Number,
            default: 0
        },
        ethereum: {
            type: Number,
            default: 0
        },
        litecoin: {
            type: Number,
            default: 0
        },
        monero: {
            type: Number,
            default: 0
        },
        ripple: {
            type: Number,
            default: 0
        },
        zcash: {
            type: Number,
            default: 0
        }

    },
    accountType: {
        starter: {
            type: Boolean,
            default: true
        },
        bronze: {
            type: Boolean,
            default: false
        },
        silver: {
            type: Boolean,
            default: false
        },
        gold: {
            type: Boolean,
            default: false
        }
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    wallet: {
        bitcoin: String,
        ethereum: String,
        paypal: String,
        bankdetails: {
            accountname: String,
            accountnumber: String,
            bankname: String,
            routingnumber: String
        }
    }


}, {
    timestamps: true,

})


const User = models.User || model("User", userSchema)

export default User