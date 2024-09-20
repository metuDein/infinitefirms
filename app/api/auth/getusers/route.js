import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { dbConn } from "@utils/database"
import User from "@models/users"


export const GET = async () => {
    // Logic to fetch data from the API
    // Return the fetched data
    const session = await getServerSession()

    await dbConn()

    try {
        const users = await User.find({})

        if (!users) {
            return new NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ users }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }


}
