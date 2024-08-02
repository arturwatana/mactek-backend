
import express, { Request, Response } from "express"
import cors from "cors"
import { prismaClient } from "./Modules/repositories/messages/implementations/prisma/prismaconfig"
import { messageRouter } from "./Routes/messages.routes"
import { contactRouter } from "./Routes/contacts.routes"

const app = express()

app.use(express.json())

app.use(cors())


app.listen(3030, () => {
    console.log("Server up")
})

app.use(messageRouter)
app.use(contactRouter)


app.post("/users", async (req: Request, res : Response) => {
    try {
        const data = req.body
        await prismaClient.user.create({data})
        return
    } catch(err: any) {
        res.status(400).json({message: err.message})
    }
})
