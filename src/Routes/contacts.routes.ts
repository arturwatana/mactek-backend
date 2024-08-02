
import express, { Request, Response, Router } from "express"
import { messagesRepository } from "../Modules/repositories/messages"
import cors from "cors"
import { contactsRepository } from "../Modules/repositories/Contacts"

const app = express()

app.use(express.json())

app.use(cors())

const contactRouter = Router()


contactRouter.post("/contacts", async (req: Request, res: Response) => {
    const data = req.body
    await contactsRepository.add(data) 
    res.status(201).json({message: "contact send"})

})

contactRouter.get("/contacts", async (req: Request, res : Response) => {
    const messages = await contactsRepository.getAll()
    res.status(200).json(messages)
})


export { contactRouter }