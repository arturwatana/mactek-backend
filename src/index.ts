
import express, { Request, Response } from "express"
import { messagesRepository } from "./Modules/repositories/messages"
import cors from "cors"
import { prismaClient } from "./Modules/repositories/messages/implementations/prisma/prismaconfig"

const app = express()

app.use(express.json())

app.use(cors())


app.listen(3030, () => {
    console.log("Server up")
})
app.post("/messages", async (req: Request, res: Response) => {
    const data = req.body
    const messageCreated = await messagesRepository.add(req.body) 
    res.status(201).json(messageCreated)

})


app.get("/messages", async (req: Request, res : Response) => {
    const messages = await messagesRepository.getAll()
    res.status(200).json(messages)
})


app.post("/messages/:id", async (req: Request, res : Response) => {
    const {id} = req.params
    const data = req.body
    try {
        const messages = await messagesRepository.editMessage(id, data)
        res.status(200).json(messages)
        return
    } catch(err: any) {
        res.status(400).json({message: err.message})
    }
})


app.get("/messages/today", async (req: Request, res : Response) => {
    try {
        const messages = await messagesRepository.getTodayMessage()
        res.status(200).json(messages)
        return
    } catch(err: any) {
        res.status(400).json({message: err.message})
    }
})


app.post("/users", async (req: Request, res : Response) => {
    try {
        const data = req.body
        await prismaClient.user.create({data})
        return
    } catch(err: any) {
        res.status(400).json({message: err.message})
    }
})
