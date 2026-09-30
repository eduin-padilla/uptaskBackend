import { transport } from "../config/nodeMailer.js"

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async  (user: IEmail) => {
        const info = await transport.sendMail({
                from: 'Uptask <admin@uptask.com>',
                to: user.email,
                subject: 'Uptask <Uptask - Cofirma tu cuenta>',
                text: 'Uptask <Uptask - Cofirma tu cuenta>',
                html: `<p>Hola. ${user.name}, has  creado tu cuenta en uptask. casi todo listo, Solo debes confirmar tu cuenta con el codigo de confirmacion</p>
                    <p>Visita el siguiente enlace:</p>
                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                    <p>E ingresa el codigo: <b>${user.token}</b></p>
                    <p>Este token expira en 10 minutos</p>
                
                
                `
                    
        })
        console.log('mensaje enviado', info.messageId)
    }

    static sendPasswordResetToken = async  (user: IEmail) => {
        const info = await transport.sendMail({
                from: 'Uptask <admin@uptask.com>',
                to: user.email,
                subject: 'Uptask <Uptask - Reestablece tu password>',
                text: 'Uptask <Uptask - Cofirma tu cuenta>',
                html: `<p>Hola. ${user.name}, Has solicitado reestablecer tu password</p>
                    <p>Visita el siguiente enlace:</p>
                    <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Passowrd</a>
                    <p>E ingresa el codigo: <b>${user.token}</b></p>
                    <p>Este token expira en 10 minutos</p>
                
                
                `
                    
        })
        console.log('mensaje enviado', info.messageId)
    }
}