import { MessagesMemoryRepository } from "./implementations/messages.memory.repository";
import { MessagesPrismaRepository } from "./implementations/prisma/messages.prisma.repository";


export const messagesRepository = new MessagesPrismaRepository()