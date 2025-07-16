import mongoose from "mongoose"

const connectToMongo = async()=>{
    const res= await mongoose.connect("mongodb+srv://nharishreddyn6666:dwezD6wcDuHwo5AU@gallery.5t9vdhs.mongodb.net/?retryWrites=true&w=majority&appName=gallery")
    if(res) {
        console.log("connected to mongo")
    }
}

export default connectToMongo;