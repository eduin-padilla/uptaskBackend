import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController.js"
import {body, param} from 'express-validator'
import { handleInputErrors } from "../middleware/validation.js"
import { TaskCotroller } from "../controllers/TaskController.js"
import { validateProyectExist } from "../middleware/project.js"



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

/** Rutas para el task*/

router.post('/:projectId/task', 
    validateProyectExist,
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    TaskCotroller.createTask)

router.get('/:projectId/task', validateProyectExist, TaskCotroller.getProjectTasks)


























export default router