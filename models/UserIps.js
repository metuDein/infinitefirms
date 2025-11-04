import mongoose from "mongoose";


const UserIpSchema = mongoose.Schema({
    userId: {
        type: String,
        default: ''
    }
    ,
    ip: {
        type: String,
        default: ''
    }
}
)


const UserIp = mongoose.models.UserIp || mongoose.model('UserIp', UserIpSchema)

export default UserIp