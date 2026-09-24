import { Request, Response } from "express"
import User from "../model/User.js"
import { haspassword } from "../utils/auth.js"
import Token from "../model/Token.js"
import { generateToken } from "../utils/token.js"
import { transport } from "../config/nodeMailer.js"
import { AuthEmail } from "../emails/AuthEmail.js"

export class AuthController {
     

    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body

            //prevenir ducplicador 
            const userExist = await User.findOne({email})

            if(userExist){
                const error = new Error('El usuario ya esta registrado')         

                return res.status(409).json({error: error.message})
            }

            //crear usuario
            const user = new User(req.body)
            //hash de pasword
            user.password = await haspassword(password)

            //genenerar el token
            const token = new Token()
            token.token = generateToken()
            token.user = user._id

            //enviar token al email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.email,
                token: token.token
            })
            await Promise.allSettled([user.save(), token.save()])
            res.send('Cuenta creada, Revisa tu email para confirmacion')
        } catch (error) {
            res.status(500).json({error: 'hubo un error'})
        }
    }

    static confirmateAccount = async(req: Request, res: Response) => {

        try {
            const { token } = req.body
            const tokenExist = await Token.findOne({token})

            if(!tokenExist){
                const error = new Error("Token no valido")
                return res.status(401).json({error: error.message})
            }

            const user = await User.findById(tokenExist.user)
            user.confirmed = true
            await Promise.allSettled([user.save(), tokenExist.deleteOne()])
            res.send('Cuenta creada correctamente')

        } catch (error) {
            res.status(500).json({error: 'hubo un error'})
        }

    }

}