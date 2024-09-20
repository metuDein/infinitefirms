import Transactions from "@models/transactions";
import { dbConn } from "@utils/database";
import { NextResponse } from "next/server";
import User from "@models/users";



export const GET = async (req) => {
    await dbConn()
    try {
        const tx = await Transactions.find().populate('userId')

        if (!tx) return NextResponse.json({ message: 'no transactions yet' }, { status: 204 })

        return NextResponse.json({ tx }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export const POST = async (req) => {
    await dbConn()
    try {
        const { userId, txType, amount, address, txhash, hashRate, image } = await req.json()
        console.log({ txType, amount, address, txhash })
        const newTx = await Transactions({ userId, transtype: txType, amount: amount, addressUsed: address, txhash: txhash, hashrate: hashRate, image })

        await newTx.save()
        if (!newTx) return NextResponse.json({ message: 'add tx failed' }, { status: 500 })
        console.log(newTx)

        return NextResponse.json({ newTx }, { status: 201 })

    } catch (error) {

        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
export const PATCH = async (req) => {
    await dbConn()
    try {
        const { userId, planName } = await req.json()
        console.log({ userId, planName, })
        const newPlan = {

        }
        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json({ message: 'user not found' }, { status: 404 })
        }

        switch (planName) {
            case "bronze":
                user.accountType.starter = false
                user.accountType.bronze = true
                user.accountType.silver = false
                user.accountType.gold = false
                break;
            case "silver":
                user.accountType.starter = false
                user.accountType.bronze = false
                user.accountType.silver = true
                user.accountType.gold = false
                break;
            case "gold":
                user.accountType.starter = false
                user.accountType.bronze = false
                user.accountType.silver = false
                user.accountType.gold = true
                break;

            case "starter":
            default:
                break;
        }

        await user.save()
        return NextResponse.json({ message: 'update successful', user }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


