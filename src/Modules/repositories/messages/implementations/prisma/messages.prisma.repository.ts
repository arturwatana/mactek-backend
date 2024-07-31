import dayjs from "dayjs";
import { Message } from "../../../../entitites/Messages/message.entity";
import { IMessagesRepository } from "../../interfaces/messages.interface";
import { prismaClient } from "./prismaconfig";
import isBetween from "dayjs/plugin/isBetween"
dayjs.extend(isBetween);

export class MessagesPrismaRepository implements IMessagesRepository{
    async add(props: Message): Promise<Message> {
        const message = Message.create(props)
        const createdMessage = await prismaClient.messages.create({
            data: message
        })
        return createdMessage
    }
    async getAll(): Promise<Message[]> {
        return await prismaClient.messages.findMany()
    }
    async getIndexByMessageId(messageId: string): Promise<number> {
        const messages = await prismaClient.messages.findMany()
        return messages.findIndex(message => message.id == messageId)
    }
    async editMessage(messageId: string, message: Message): Promise<Message> {
        const messageInDB = await prismaClient.messages.update({
            where: {
                id: messageId
            },
            data: {
                title: message.title,
                startDate: new Date(message.startDate),
                endDate: new Date(message.endDate),
                message: message.message
            }
        })
        return messageInDB
    }
    async getTodayMessage(): Promise<Message | string> {
        const messages = await prismaClient.messages.findMany()
        const todayDate = new Date().toJSON().split("T")[0]
        const todaysMessage = messages.filter(message => dayjs(todayDate).isBetween(message.startDate, message.endDate))
        return todaysMessage[0]
    }
}