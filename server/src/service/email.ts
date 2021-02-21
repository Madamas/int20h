import nodemailer from 'nodemailer'

import logger from '@src/logger';

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

    async sendMail(to: string, body: string): Promise<void> {
        logger.info({ to, body }, 'Start sending email')

        const info = await this.transport.sendMail({
            from: 'lostpussy@noreply.com',
            to,
            subject: 'Possible pet sighting',
            text: body
        })

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}

export default new EmailService()