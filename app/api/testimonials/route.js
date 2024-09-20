import Testimonial from "@models/testimonial"
import { NextResponse } from "next/server"
import { dbConn } from "@utils/database"


export const GET = async () => {
    await dbConn()
    try {
        const testimonials = await Testimonial.find({})
        return NextResponse.json({ testimonials }, { status: 200 })

    } catch (error) {

        console.error(error.message)
        return NextResponse.json({ message: "Failed to fetch testimonials" }, { status: 500 })
    }

}


export const POST = async (req) => {
    await dbConn()
    try {
        const { rating, comment, name } = await req.json()
        const newTestimonial = await Testimonial.create({ rating, comment, name })

        return NextResponse.json({ newTestimonial }, { status: 201 })

    } catch (error) {
        console.error(error.message)
        return NextResponse.json({ message: "Failed to create testimonial" }, { status: 500 })
    }
}

export const DELETE = async (req) => {
    await dbConn()
    try {
        const { id } = await req.json()
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id)
        if (!deletedTestimonial) return NextResponse.json({ message: "Testimonial not found" }, { status: 404 })

        return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 204 })

    } catch (error) {
        console.error(error.message)
        return NextResponse.json({ message: "Failed to delete testimonial" }, { status: 500 })

    }
}