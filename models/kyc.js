import { Schema, model, models } from 'mongoose'

const kycSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    idSelfie: {
        public_id: String,
        secure_url: String
    },
    idDoc: {
        front: {
            public_id: String,
            secure_url: String
        },
        back: {
            public_id: String,
            secure_url: String
        }
    },
    addressProof: {
        public_id: String,
        secure_url: String
    },
    status: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    }

})

const Kyc = models.Kyc || model('Kyc', kycSchema)

export default Kyc
