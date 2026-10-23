import  Jwt  from "jsonwebtoken"
import { Types } from "mongoose"

type UserPayload = {
    id: Types.ObjectId
}

export const generateJWT = (payload: UserPayload) => {

    const token = Jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
    return token
}