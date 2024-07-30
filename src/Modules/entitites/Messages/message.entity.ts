import { v4 as uuid } from "uuid";

type MessageProps = {
    title: string
    message: string
    startDate: Date
    endDate: Date
    userId: string
}

export class Message implements MessageProps{

    id: string
    title: string
    message: string
    startDate: Date
    endDate: Date
    userId: string

    private constructor(props: MessageProps){

        this.id = uuid()
        this.title= props.title
        this.message= props.message
        this.startDate = props.startDate
        this.endDate = props.endDate
        this.userId = props.userId
    }

    static create(props: MessageProps): Message{
        const message = new Message(props)
        return message
    }

}