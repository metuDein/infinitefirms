import Transactions from "@models/transactions";
import User from "@models/users";
import { NextResponse } from "next/server";
import { dbConn } from "@utils/database";


export const PATCH = async (req) => {
    await dbConn()
    try {
        const { amount, userId, id, status } = await req.json()
        const tx = await Transactions.findOne({ _id: id }).exec()
        if (!tx) return NextResponse.json({ message: 'Transaction not found' }, { status: 404 })

        tx.status = status
        const result = await tx.save()

        if (!result) return NextResponse.json({ message: 'approve failed' }, { status: 500 })
        const user = await User.findOne({ _id: userId }).exec()
        if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })
        user.balances.profit -= amount
        await user.save()

        return NextResponse.json({ message: 'transaction approved' })





    } catch (error) {

        console.error(`${error.name} : ${error.message}`)
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}