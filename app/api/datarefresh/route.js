import Transactions from "@models/transactions";
import User from "@models/users";
import Subscription from "@models/subscriptions";
import Trader from "@models/traders";
import Copytrading from "@models/copyTrading";
import Testimonial from "@models/testimonial";
import Kyc from "@models/kyc";
import { getServerSession } from "next-auth"



import { NextResponse } from "next/server";


import { dbConn } from "@utils/database";

export const GET = async () => {
    const session = await getServerSession()

    await dbConn()
    try {
        const copyTradings = await Copytrading.find({}).populate('traderId')
        if (!copyTradings) NextResponse.json({ message: 'no copytrading yet' }, { status: 204 })
        const tx = await Transactions.find().populate('userId')
        if (!tx) NextResponse.json({ message: 'no data' }, { status: 204 })

        const subscriptions = await Subscription.find().populate(['transId', 'userId'])
        if (!subscriptions) NextResponse.json({ message: 'no data' }, { status: 204 })
        const kycs = await Kyc.find({}).populate('userId')
        if (!kycs) NextResponse.json({ message: 'no data' }, { status: 204 })
        const testimonials = await Testimonial.find({})
        if (!testimonials) NextResponse.json({ message: 'no data' }, { status: 204 })
        const traders = await Trader.find({})
        if (!traders) NextResponse.json({ message: 'no data' }, { status: 204 })
        const users = await User.find({})
        if (!users) NextResponse.json({ message: 'no data' }, { status: 204 })
        const user = await User.findOne({ email: session?.user?.email }).exec()
        if (!user) NextResponse.json({ message: 'no data' }, { status: 204 })


        return NextResponse.json({
            copyTradings,
            tx,
            subscriptions,
            kycs,
            testimonials,
            traders,
            users,
            user
        }, { status: 200 })

    } catch (error) {
        console.error(`${error.name} : ${error.message}`)
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}