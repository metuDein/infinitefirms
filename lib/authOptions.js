import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { dbConn } from "@utils/database"
import User from "@models/users"


export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    // Configure one or more authentication providers
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            // The name of the strategy used to authenticate
            name: "Credentials",
            // The credentials to be sent to the server
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                await dbConn()

                try {
                    const { email, password } = credentials

                    const user = await User.findOne({ email }).exec()

                    const bcrypt = require('bcrypt')

                    const pwdMatch = await bcrypt.compare(password, user.password)

                    if (pwdMatch) {
                        return {
                            id: user._id,
                            name: user.name
                        }
                    } else {
                        throw new Error("Invalid credentials")
                    }
                } catch (error) {
                    console.log(error?.message)
                }

            }
        })


    ],

}