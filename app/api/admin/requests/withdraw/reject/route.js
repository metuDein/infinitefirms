import Transactions from "@models/transactions";
import { NextResponse } from "next/server";
import { dbConn } from "@utils/database";


export const PATCH = async (req) => {
    await dbConn()
    try {
        const { id, status } = await req.json()
        const tx = await Transactions.findOne({ _id: id }).exec()
        if (!tx) return NextResponse.json({ message: 'Transaction not found' }, { status: 404 })

        tx.status = status
        await tx.save()

        return NextResponse.json({ message: 'transaction rejected' }, { status: 200 })

    } catch (error) {

        console.error(`${error.name} : ${error.message}`)
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}