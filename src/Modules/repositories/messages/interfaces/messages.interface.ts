import { Message } from "../../../entitites/Messages/message.entity";




export interface IMessagesRepository {

    add(props: Message): Promise<Message>
    getAll(): Promise<Message[]>
}