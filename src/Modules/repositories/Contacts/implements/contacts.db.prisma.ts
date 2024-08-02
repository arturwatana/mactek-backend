import { IContact, Contact } from "../../../entitites/Contact/contact.entity";
import { prismaClient } from "../../messages/implementations/prisma/prismaconfig";
import { IContactRepository } from "../interfaces/contacts.interface";


export class ContactsPrismaRepository implements IContactRepository{
    async add({email,enterprise,message,name}: IContact): Promise<void> {
      await prismaClient.contacts.create({
        data: {
            name,
            email,
            enterprise,
            message
        }
       })
    }
    async getAll(): Promise<Contact[]> {
        const contacts = await prismaClient.contacts.findMany()
        return contacts
    }

}