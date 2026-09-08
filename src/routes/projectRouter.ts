import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController.js"
import {body, param} from 'express-validator'
import { handleInputErrors } from "../middleware/validation.js"
import { TaskCotroller } from "../controllers/TaskController.js"
import { projectExist } from "../middleware/project.js"
import { taskBelongsToProject, taskExit } from "../middleware/task.js"



const router: Router = Router()

router.param('projectId', projectExist)

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

router.param('projectId', projectExist)

router.post('/:projectId/task', 
    projectExist,
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
TaskCotroller.createTask)



router.get('/:projectId/task', 
TaskCotroller.getProjectTasks)

router.param('taskId', taskExit)
router.param('taskId', taskBelongsToProject)
router.get('/:projectId/task/:taskId', 
[param('taskId').isMongoId().withMessage('ID inválido'),
handleInputErrors],
TaskCotroller.getTaskById)

router.put('/:projectId/task/:taskId', [
    param('taskId').isMongoId().withMessage('ID inválido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors
], TaskCotroller.updateTask)

router.delete('/:projectId/task/:taskId', [
    param('taskId').isMongoId().withMessage('ID inválido'),
    handleInputErrors
], TaskCotroller.deleteTask)

router.post('/:projectId/task/:taskId/status', [
    param('taskId').isMongoId().withMessage('ID inválido'),
    body('status').notEmpty().withMessage('El estado de la tarea es obligatorio'),
    handleInputErrors
], TaskCotroller.updateTaskStatus)



















export default router