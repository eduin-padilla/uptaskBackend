import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Task, { ITask } from "../model/Task.js";


declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExit(req: Request, res: Response, next: NextFunction) {

    try {
        const { taskId } = req.params as {taskId: string}

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({ error: error.message })
        }

        const task = await Task.findById(taskId)
        
        if (!task) {
            const error = new Error('tarea no encontrada')
            return res.status(404).json({ error: error.message })
        }
        req.task = task
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

export function hasAuthorization(req: Request, res: Response, next: NextFunction) {

    if (req.user._id.toString() !== req.project.manager.toString()) {
        return res.status(404).json({ error: 'Accion no valida' })
    }
    next()
}