import type { Request, Response } from "express"
import Project from "../model/Proyect.js"



export class ProjectController {

    static createProject = async (req: Request, res: Response) => {

        
        
        try {
            await Project.create(req.body)
            res.send('proyecto creado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al crear el proyecto' })
        }

    }

    static getAllProjects = async (req: Request, res: Response) => {

        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener los proyectos' })
        }

    }
    static getProjectById = async (req: Request, res: Response) => {

        try {
            const project = await Project.findById(req.params.id).populate('tasks')
            if (!project) {
                return res.status(404).json({ error: 'Proyecto no encontrado' })
            }
            res.json(project)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al obtener el proyecto' })
        }   
    }   
    static updateProject = async (req: Request, res: Response) => {

        try {
            const {id} = req.params 
            const project = await Project.findByIdAndUpdate(id, req.body)
            if(!project){
                return res.status(404).json({ error: 'Proyecto no encontrado' })
            }
            await project.save()
            res.send('Proyecto actualizado Correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al actualizar el proyecto' })
        }

    }

    static deleteProject = async (req: Request, res: Response) => {

        try {
            const {id} = req.params
            const project = await Project.findByIdAndDelete(id)
            if(!project){
                return res.status(404).json({ error: 'Proyecto no encontrado' })
            }
            res.send('Proyecto eliminado Correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al eliminar el proyecto' })
        }

    }

}