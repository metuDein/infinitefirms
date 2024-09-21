import Copytrading from "@models/copyTrading";
import { dbConn } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    await dbConn()
    try {
        const copyTradings = await Copytrading.find({}).populate('traderId')
        return NextResponse.json({ copyTradings }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Failed to fetch copy tradings' }, { status: 500 })
    }

}

export const POST = async (req) => {
    await dbConn()
    try {
        const { userId, traderId, transId } = await req.json()
        const newCopyTrading = await Copytrading.create({ userId, traderId, transId })
        return NextResponse.json({ newCopyTrading }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Failed to create copy trading' }, { status: 500 })
    }
}

export const DELETE = async (req) => {
    await dbConn()
    try {
        const { id } = await req.json()
        const copyTrading = await Copytrading.findByIdAndDelete({ _id: id })
        if (!copyTrading) return NextResponse.json({ message: 'Copy trading not found' }, { status: 404 })

        return NextResponse.json({ message: 'Copy trading deleted successfully' }, { status: 200 })

    } catch (error) {
        console.error(`${error.name} : ${error.message}`)
        return NextResponse.json({ message: 'Failed to delete copy trading' }, { status: 500 })

    }
}