import { Schema, model, models } from "mongoose";


const testimonialSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    name: String
});


const Testimonial = models.Testimonial || model("Testimonial", testimonialSchema)

export default Testimonial