import { Request, Response } from "express";
import { IContactRepository } from "../repositories/Contacts/interfaces/contacts.interface";







export class AddContactController {

    constructor(private contactsRepository: IContactRepository){}

    async handle(req: Request, res: Response){
        try{
            const data = req.body
            await this.contactsRepository.add(data) 
            res.status(201).json({message: "contact send"})
        } catch(err: any){
            res.status(400).json({message: err.message})
        }
    }
}