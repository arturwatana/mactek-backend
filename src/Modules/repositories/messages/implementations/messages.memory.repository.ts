import { Message } from "../../../entitites/Messages/message.entity";
import { IMessagesRepository } from "../interfaces/messages.interface";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween);

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

    async getIndexByMessageId(messageId: string): Promise<number > {
       const message = this.messages.findIndex(message => message.id === messageId)
       if(message == -1){
        throw new Error("message not found")
       }
        return message
    }

    async editMessage(messageId: string, message: Message): Promise<Message> {
        try {
            const findedMessageIndex = await this.getIndexByMessageId(messageId)
            this.messages[findedMessageIndex] = message
            return this.messages[findedMessageIndex]

        } catch(err: any){
            throw new Error(err.message)
        }
    }

    async getTodayMessage(): Promise<Message | string> {
        const todayDate = new Date().toJSON().split("T")[0]
        const todaysMessage = this.messages.filter(message => dayjs(todayDate).isBetween(message.startDate, message.endDate))
        return todaysMessage[0]
    }


}