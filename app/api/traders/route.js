import { dbConn } from "@utils/database";
import Trader from "@models/traders";
import { NextResponse } from "next/server";



export const GET = async (req) => {
    await dbConn()
    try {
        const traders = await Trader.find({})
        return NextResponse.json({ traders }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to fetch traders" }, { status: 500 })
    }
}

export const POST = async (req) => {
    await dbConn()
    try {
        const { username, email, password } = req.json()
        console.log({ username, email, password })
        const trader = await Trader.create({ username, email, password })
        return NextResponse.json({ trader }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to create trader" }, { status: 500 })
    }
}

