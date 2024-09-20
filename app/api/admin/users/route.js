import User from "@models/users"
import { dbConn } from "@utils/database"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    await dbConn()
    try {
        const { username, password } = await req.json()
        const user = new User({ username, password })
        await user.save()
        return NextResponse.json({ message: 'user created successfully' }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'error creating user' }, { status: 500 })
    }
}

export const PATCH = async (req) => {
    await dbConn()
    try {
        const { userId, username, password, firstname, lastname, accountType, balances } = await req.json()
        const user = await User.findByIdAndUpdate(userId, { username, password, accountType, balances }, { new: true })
        if (!user) return NextResponse.json({ message: 'user not found' }, { status: 404 })

        return NextResponse.json({ user })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'error updating user' }, { status: 500 })
    }
}