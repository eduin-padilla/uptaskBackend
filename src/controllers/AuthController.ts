import { Request, Response } from "express"
import User from "../model/User.js"
import { checkPassword, haspassword } from "../utils/auth.js"
import Token from "../model/Token.js"
import { generateToken } from "../utils/token.js"
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
                name: user.name,
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
                return res.status(404).json({error: error.message})
            }

            const user = await User.findById(tokenExist.user)
            user.confirmed = true
            await Promise.allSettled([user.save(), tokenExist.deleteOne()])
            res.send('Cuenta confirmada correctamente')

        } catch (error) {
            res.status(500).json({error: 'hubo un error'})
        }

    }

    static login = async(req: Request, res: Response) => {

        try {
            
            const {email, password} = req.body
            const user = await User.findOne({email})

            if(!user){
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({error: error.message})
            }
            if(!user.confirmed){

                const token = new Token()

                token.user = user._id
                token.token = generateToken()
                await token.save()

                //enviar token al email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })

                const error = new Error('La cueta no ha sido confirmada, Hemos enviado un Email de confirmacion')
                return res.status(404).json({error: error.message})
            }

            //revisar password
            const isPasswordCorrect = await checkPassword(password, user.password) 

            if(!isPasswordCorrect){
                const error = new Error('Password incorrecto')
                return res.status(401).json({error: error.message})
            }
            res.send('autenticado...')

        } catch (error) {
            res.status(500).json({error: 'hubo un error'})
        }

    }
    static requestConfirmationCode = async(req: Request, res: Response) => {

        try {
            
            const {email} = req.body
            const user = await User.findOne({email})

            if(!user){
                const error = new Error('Usuario no esta registrado')
                return res.status(404).json({error: error.message})
            }
            if(user.confirmed){
                const error = new Error('Usuario ya esta confirmado')
                return res.status(403).json({error: error.message})
            }

                const token = new Token()

                token.user = user._id
                token.token = generateToken()
                await token.save()

                //enviar token al email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })

                await Promise.allSettled([user.save(), token.save()])
                res.send('Se envio un nuevo correo')
            

        } catch (error) {
            res.status(500).json({error: 'hubo un error'})
        }

    }

}