import type { Request, Response, NextFunction } from "express";
import Task, { InterfaceTask } from "../model/Task.js";


declare global {

    namespace Express {
        interface Request {
            task: InterfaceTask
        }
    }
}

export async function taskExit(req: Request, res: Response, next: NextFunction) {


    try {
        const {taskId} = req.params
        const task = await Task.findById(taskId)
        
        if(!task){
            const error = new Error('tarea no encontrada')
            return res.status(404).json({ error: error.message })
        }
        req.task= task
        next()
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' })
    }
    
}


export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {

    if (req.task.project.toString() !== req.project._id.toString()) {
        return res.status(404).json({ error: 'Accion no valida' })
    }
    next()
}