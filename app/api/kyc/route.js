import { dbConn } from "@utils/database";
import Kyc from "@models/kyc";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    await dbConn()
    try {
        const kycs = await Kyc.find({}).populate('userId')
        return NextResponse.json({ kycs }, { status: 200 })


    } catch (error) {
        console.error(error.message)
        return NextResponse.json({ message: 'Failed to fetch KYC details' }, { status: 500 })
    }


}

export const POST = async (req) => {
    await dbConn()
    try {
        const { userId, idDoc, idSelfie, addressProof, status } = await req.json()
        const newKyc = await Kyc.create({ userId, idDoc, idSelfie, addressProof, status })
        return NextResponse.json({ newKyc }, { status: 201 })

    } catch (error) {
        console.error(error.message)
        return NextResponse.json({ message: 'Failed to create KYC' }, { status: 500 })
    }
}

export const PATCH = async (req) => {
    await dbConn()
    try {
        const { id, status, message } = await req.json()
        const kyc = await Kyc.findOne({ _id: id }).exec()

        if (!kyc) return NextResponse.json({ message: 'KYC not found' }, { status: 404 })


        if (status) kyc.status = status
        if (message) kyc.message = message

        await kyc.save()


        return NextResponse.json({ kyc }, { status: 200 })
    } catch (error) {
        console.error(error.message)
        return NextResponse.json({ message: 'Failed to update KYC' }, { status: 500 })
    }
}