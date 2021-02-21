import nodemailer from 'nodemailer'

class EmailService {
    // @ts-ignore
    private transport
    // @ts-ignore
    private account: nodemailer.TestAccount

    async init() {
        this.account = await nodemailer.createTestAccount();

        this.transport = nodemailer.createTransport({
            host: this.account.smtp.host,
            port: this.account.smtp.port,
            secure: this.account.smtp.secure,
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