
import express, { Request, Response } from "express"
import { messagesRepository } from "./Modules/repositories/messages"

const app = express()

app.use(express.json())


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


