import {  Request, Response } from "express"

import Task from "../model/Task.js"

export class TaskCotroller {


    static createTask = async (req: Request, res: Response) => {
      
        try {
            // const task = new Task({
            //     ...req.body,
            //     project: project._id
            // })
            // await task.save()
            // await Project.updateOne(
            //     { _id: project._id },
            //     { $addToSet: { task: task._id } }
            // )
            const task = new Task(req.body)
            task.project = req.project._id
            req.project.tasks.push(task._id)
            
            await Promise.allSettled([
                task.save(),
                req.project.save()
            ])
              
            res.send('Tarea creada correctamente')
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al crear la tarea' })
        }
 
    }
    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project._id }).populate('project')
            res.json(tasks)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener las tareas' })
        }

    }
    static getTaskById = async (req: Request, res: Response) => {
        try {
            const { taskId} = req.params
            const task = await Task.findById(taskId)
            if (!task) {
                return res.status(404).json({ error: 'Tarea no encontrada' })
            }
            if (task.project.toString() !== req.project._id.toString()) {
                return res.status(404).json({ error: 'Accion no valida' })
            }
            res.json(task)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener la tarea' })
        }
    }
}