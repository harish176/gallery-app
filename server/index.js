import express from "express"
import connectToMongo from "./config/db.js"
import galleryRoutes from "./routes/gallery.js"
import cors from "cors"
const app=express()
const PORT=8000

app.use(cors())
app.use(express.json())


app.use("/api/v1",galleryRoutes)

app.use(express.static("public/upload"))
connectToMongo()

app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`)
})