import User from "@models/users";
import { NextResponse } from "next/server";
import crypto from 'crypto'
import { dbConn } from "@/utils/database";

export async function POST(request) {
    if (request.method !== "POST") {
        throw new Error(JSON.stringify({ code: 401, message: "unauthorized request" }));
    }
    try {
        await dbConn()
        const { email } = await request.json()

        const user = await User.findOne({ email: email }).exec()
        if (!user) {
            throw new Error(JSON.stringify({ code: 404, message: "email is not registered (user not found)" }));
            return
        }

        const token = crypto.randomBytes(20).toString('hex')

        user.resetPasswordToken = token
        user.resetPasswordTokenExpiration = new Date(Date.now() + 3600000) //1 hour

        await user.save()

        const resetUrl = `${process.env.NEXTAUTH_URL}/resetpassword?token=${token}`

        return NextResponse.json({ success: 'email sent', resetUrl }, { status: 200 })
    } catch (error) {
        console.log(error.name, ":", error.message)
        return NextResponse.json({ success: 'email sent', resetUrl }, { status: 200 })

    }


}