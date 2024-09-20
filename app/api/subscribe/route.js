import Subscription from "@models/subscriptions";
import { dbConn } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    await dbConn()
    try {
        const subscriptions = await Subscription.find().populate(['transId', 'userId'])
        if (!subscriptions) return NextResponse.json({ message: 'no subscriptions yet' }, { status: 204 })

        return NextResponse.json({ subscriptions }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Failed to fetch subscriptions' }, { status: 500 })
    }
}


export const POST = async (req) => {
    await dbConn()
    try {
        const { userId, instruments, price, duration, transId, earning, status } = await req.json()
        const subscription = new Subscription({ userId, instruments, price, duration, transId, earning, status })
        await subscription.save()
        return NextResponse.json({ message: 'subscription created successfully', subscription }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Failed to create subscription' }, { status: 500 })
    }
}

export const PATCH = async (req) => {
    await dbConn()
    try {
        const { transId, status, earning } = await req.json()

        const subscription = await Subscription.findOne({ transId }).exec()
        if (status) subscription.status = status
        if (earning) subscription.earning = earning
        await subscription.save()
        return NextResponse.json({ message: 'subscription updated successfully' }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Failed to update subscription' }, { status: 500 })
    }
}


