import {Request, Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import User, { Iuser } from "../model/User.js";

declare global {
    namespace Express{
        interface Request {
            user?: Iuser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization

    if(!bearer){
        const error = new Error('No Autorizado')
        return res.status(401).json({error: error.message})
    }

    const token = bearer.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(typeof decoded === 'object' && decoded.id){
            const user = await User.findById(decoded.id).select('_id name email')

            if(user){
                req.user = user
                next()
            }else{
                return res.status(500).json({error: 'token no valido'})
            }
        }

    } catch (error) {
        return res.status(500).json({error: 'token no valido'})
    }

}