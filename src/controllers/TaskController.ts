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
                req.task.save(),
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
            res.json(req.task)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener la tarea' })
        }
    }
    static updateTask = async (req: Request, res: Response) => {
        try {   
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send('Tarea actualizada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al actualizar la tarea' })
        }
    }
    static deleteTask = async (req: Request, res: Response) => {
        try {

            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.params.taskId)
            
            await Promise.allSettled([req.task.deleteOne(), req.project.save()]) 
            
            res.send('Tarea eliminada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al eliminar la tarea' })
        }
    }
    static updateTaskStatus = async (req: Request, res: Response) => {

        try {

            const {status} = req.body
            req.task.status = status
            await req.task.save()
            res.json({message: 'Estado de la tarea actualizado correctamente'})
        } catch (error) {
            
        }
        
    }
}
            
