
import express, { Request, Response, Router } from "express"
import { messagesRepository } from "../Modules/repositories/messages"
import cors from "cors"

const app = express()

app.use(express.json())

app.use(cors())

const messageRouter = Router()


messageRouter.post("/messages", async (req: Request, res: Response) => {
    const data = req.body
    const messageCreated = await messagesRepository.add(req.body) 
    res.status(201).json(messageCreated)

})


messageRouter.get("/messages", async (req: Request, res : Response) => {
    const messages = await messagesRepository.getAll()
    res.status(200).json(messages)
})


messageRouter.post("/messages/:id", async (req: Request, res : Response) => {
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


messageRouter.get("/messages/today", async (req: Request, res : Response) => {
    try {
        const messages = await messagesRepository.getTodayMessage()
        res.status(200).json(messages)
        return
    } catch(err: any) {
        res.status(400).json({message: err.message})
    }
})


export { messageRouter }