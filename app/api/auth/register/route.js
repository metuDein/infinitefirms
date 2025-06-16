import User from '@models/users';
import { dbConn } from '@utils/database';
import { NextResponse } from 'next/server';


export async function POST(request) {
    await dbConn()
    try {
        const { email, password, firstname, lastname, username, phoneNumber, country } = await request.json()
        console.log({ email, password, firstname, lastname, username })
        // const bcrypt = require('bcrypt')
        // const hashPwd = await bcrypt.hash(password, 10)

        // Check if the user already exists
        const existingUserEmail = await User.findOne({ email: email }).exec();
        if (existingUserEmail) {
            return NextResponse.json({ error: 'Email is already taken' }, { status: 409 })
        }

        //check if the username already exists
        const existingUserUsername = await User.findOne({ username: username }).exec();
        if (existingUserUsername) {
            return NextResponse.json({ error: 'Username already exists' }, { status: 409 })
        }

        const user = await User.create({ email: email, password: password, username: username, firstname, lastname, phoneNumber, location: country })
        return NextResponse.json({ success: 'account created', user }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}