import { Message } from "../../../entitites/Messages/message.entity";




export interface IMessagesRepository {

    add(props: Message): Promise<Message>
    getAll(): Promise<Message[]>
    getIndexByMessageId(messageId: string) : Promise<number>
    editMessage(messageId: string, message: Message): Promise<Message>
    getTodayMessage():Promise<Message | string>
}