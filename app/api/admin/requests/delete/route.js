import Transactions from '@models/transactions'
import { NextResponse } from 'next/server'
import { dbConn } from '@utils/database'


export const DELETE = async (req) => {

    await dbConn()
    try {
        const { id } = await req.json()
        const tx = await Transactions.findOneAndDelete({ _id: id }).exec()
        if (!tx) return NextResponse.json({ message: 'Transaction not found' }, { status: 404 })


        return NextResponse.json({ message: 'transaction deleted' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Error deleting transaction', error }, { status: 500 })
    }


}