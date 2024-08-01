import dayjs from "dayjs";
import { Message } from "../../../../entitites/Messages/message.entity";
import { IMessagesRepository } from "../../interfaces/messages.interface";
import { prismaClient } from "./prismaconfig";
import isBetween from "dayjs/plugin/isBetween"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

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
                message: message.message,
                isActive: message.isActive
            }
        })
        return messageInDB
    }
    async getTodayMessage(): Promise<Message | string> {
        const messages = await prismaClient.messages.findMany()
        const todayDate = new Date()
        const todaysMessage = messages.filter(message => {
            if(message.isActive){
               return this.compareDates(todayDate, message)
                return dayjs(todayDate.toISOString().split("T")[0]).isBetween(message.startDate, message.endDate)
            }
        })
        return todaysMessage[0]
    }


    compareDates(today: Date, message: Message ): boolean {
        const startToday = today.toISOString().split("T")[0] === message.startDate.toISOString().split("T")[0]
        const endToday = today.toISOString().split("T")[0] === message.endDate.toISOString().split("T")[0] 
        if(startToday || endToday){
            return true
        } 

        if(!startToday && !endToday){
            return dayjs(today.toISOString().split("T")[0]).isBetween(message.startDate, message.endDate)
        }
        return false
        
    }
}   