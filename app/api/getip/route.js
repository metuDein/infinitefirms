import { NextResponse } from "next/server";
import UserIp from "@/models/UserIps";

export async function GET(res) {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        return NextResponse.json({ success: true, ip: data.ip }, { status: 200 });
    } catch (error) {
        console.error('Error fetching IP:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}


export async function POST(req) {
    try {
        const { userId, ip } = await req.json();

        const existingIp = await UserIp.findOne({ userId });
        if (existingIp.ip !== ip) {


            const newIp = {
                userId: userId,
                ip: ip

            }
            await UserIp.create(newIp);
            return NextResponse.json({ success: true }, { status: 201 });
        } else {
            return NextResponse.json({ message: "ip already exists" }, { status: 204 });
            // return NextResponse.json({ success: true }, { status: 201 });
        }

    } catch (error) {
        console.error('Error updating IP:', error);
    }
}