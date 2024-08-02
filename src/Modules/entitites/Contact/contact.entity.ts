

export type IContact = {
    name: string
    enterprise: string
    message: string
    email: string
}

export class Contact implements IContact {

    name: string
    enterprise: string
    message: string
    email: string


    private constructor(props : IContact){
        this.email = props.email
        this.enterprise = props.enterprise
        this.message = props.message
        this.name = props.name
    }

    static create(props: IContact): Contact{
        const contact = new Contact(props)
        return contact
    }

}