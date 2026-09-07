import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController.js"
import {body, param} from 'express-validator'
import { handleInputErrors } from "../middleware/validation.js"



const router: Router = Router()


router.post('/', [
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    handleInputErrors
], ProjectController.createProject)



router.get('/', ProjectController.getAllProjects)
router.get('/:id', [
    param('id').isMongoId().withMessage('ID inválido'),
    handleInputErrors
], ProjectController.getProjectById)

router.put('/:id', [
    param('id').isMongoId().withMessage('ID inválido'),
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción del proyecto es obligatoria'),
    handleInputErrors
], ProjectController.updateProject)
router.delete('/:id', [
    param('id').isMongoId().withMessage('ID inválido'),
    handleInputErrors
], ProjectController.deleteProject)
export default router