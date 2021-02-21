import nodemailer from 'nodemailer'

class EmailService {
    // @ts-ignore
    private transport
    // @ts-ignore
    private account: nodemailer.TestAccount

    async init() {
        this.account = await nodemailer.createTestAccount();

        this.transport = nodemailer.createTransport({
            host: 'smtp.ethereal.mail',
            port: 587,
            secure: false,
            auth: {
                user: this.account.user,
                pass: this.account.pass
            }
        })
    }

    sendMail(to: string, body: string): Promise<nodemailer.SentMessageInfo> {
        return this.transport.sendMail({
            from: "lostpussy@noreply.com",
            to,
            subject: "Possible pet sighting",
            text: body
        })
    }
}

export default new EmailService()