import { Message } from "../../../entitites/Messages/message.entity";
import { IMessagesRepository } from "../interfaces/messages.interface";




export class MessagesMemoryRepository implements IMessagesRepository{
    messages: Message[] = []

    async add(props: Message): Promise<Message> {
        const message = Message.create(props)
        this.messages.push(message)
        return message
    }
    async getAll(): Promise<Message[]> {
       return this.messages
    }
}