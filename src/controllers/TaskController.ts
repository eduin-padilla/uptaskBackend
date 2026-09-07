import { request, Request, Response } from "express"
import Project from "../model/Proyect.js"
import Task from "../model/Task.js"

export class TaskCotroller {


    static createTask = async (req: Request, res: Response) => {

        const {projectId} = req.params
        const project = await Project.findById(projectId)
        
        if(!project){
            return res.status(404).json({ error: 'Proyecto no encontrado' })
        }
      
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
            task.project = project._id
            project.tasks.push(task._id)
            await task.save()
            await project.save()
              
            res.send('Tarea creada correctamente')
            
        } catch (error) {
            console.log(error)
        }
 
    }

}