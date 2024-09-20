import mongoose from "mongoose";

let isConnected = false


export const dbConn = async () => {

    mongoose.set('strictQuery', true)

    if (!isConnected) {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: 'share_prompt',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })

            isConnected = true
            console.log('Connected to MongoDB')

        } catch (error) {
            console.error('Failed to connect to MongoDB', error)
            process.exit(1)

        }
    } else {
        console.log('Already connected to MongoDB')
    }

}