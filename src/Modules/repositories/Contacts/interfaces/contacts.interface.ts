import { Contact, IContact } from "../../../entitites/Contact/contact.entity";



export interface IContactRepository {

    add(props: IContact): Promise<void>
    getAll(): Promise<Contact[]>
}