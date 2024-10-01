import Trader from '@models/traders'
import { dbConn } from '@utils/database'
import { NextResponse } from 'next/server'


export const POST = async (req) => {
    await dbConn()
    try {
        const { fullname, email, traderType, roi, location, rating, copiers, joined, desc, image } = await req.json()

        const newTrader = new Trader({ traderName: fullname, traderEmail: email, traderType, traderRoi: roi, traderLocation: location, traderRating: rating, traderCopier: copiers, joined: joined, traderDescription: desc, image })
        await newTrader.save()

        return NextResponse.json({ newTrader }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to create trader' }, { status: 500 })
    }
}

export const PATCH = async (req) => {
    await dbConn()
    try {
        const { userId, fullname, email, traderType, roi, location, rating, copiers, joined, desc, image } = await req.json()

        const updatedTrader = await Trader.findByIdAndUpdate(userId, { traderName: fullname, traderEmail: email, traderType, traderRoi: roi, traderLocation: location, traderRating: rating, traderCopier: copiers, joined: joined, traderDescription: desc, image }, { new: true })
        if (!updatedTrader) return NextResponse.json({ message: 'Trader not found' }, { status: 404 })


        return NextResponse.json({ updatedTrader }, { status: 200 })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Failed to update trader plan" }, { status: 500 })
    }
}

export const DELETE = async (req) => {
    await dbConn()
    try {
        const { id } = await req.json()
        const deletedTrader = await Trader.findByIdAndDelete(id)

        if (!deletedTrader) return NextResponse.json({ message: 'Trader not found' }, { status: 404 })

        return NextResponse.json({ message: 'Trader deleted successfully' }, { status: 204 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Failed to delete trader' }, { status: 500 })

    }
}
