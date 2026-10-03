import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation.js";


const router: Router = Router()

router.post('/create-account', 
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),

    body('password').notEmpty().withMessage('La contraseña es requerida')
    .matches(/^\S+$/).withMessage('La contraseña no debe contener espacios en blanco').isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres').matches(/[A-Z]/).withMessage('Debe contener al menos una letra mayúscula').matches(/[\W_]/).withMessage('Debe contener al menos un carácter especial'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){ 
            throw new Error('Los password no son iguales')
        }
        return true
    }),
    body('email').isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthController.createAccount)

router.post('/confirm-account',
    body('token').notEmpty().withMessage('Debes ingresar el token'),
    handleInputErrors,
    AuthController.confirmateAccount
)

router.post('/login',
    body('email').isEmail().withMessage('Email no valido'),
    body('password').notEmpty().withMessage('La contraseña no puede ir vacia'),
    handleInputErrors,
    AuthController.login
)

router.post('/request-code',
    body('email').isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthController.requestConfirmationCode
)

router.post('/forgot-password',
    body('email').isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthController.forgotPassword
)
router.post('/validate-token',
    body('token').notEmpty().withMessage('Debes ingresar el token'),
    handleInputErrors,
    AuthController.validateToken
)

router.post('/update-password/:token',    
    param('token').isNumeric().withMessage('Token No valido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
    .matches(/^\S+$/).withMessage('La contraseña no debe contener espacios en blanco').isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres').matches(/[A-Z]/).withMessage('Debe contener al menos una letra mayúscula').matches(/[\W_]/).withMessage('Debe contener al menos un carácter especial'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){ 
            throw new Error('Los password no son iguales')
        }
        return true
    }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)







export default router