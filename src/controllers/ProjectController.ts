import type { Request, Response } from "express"
import Project from "../model/Project.js"



export class ProjectController {

    static createProject = async (req: Request, res: Response) => {

        const project = new Project(req.body)

        project.manager = req.user._id
        
        try {
            await project.save()
            res.send('proyecto creado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al crear el proyecto' })
        }

    }
    static getAllProjects = async (req: Request, res: Response) => {

        try {
            const projects = await Project.find({
                $or: [
                    {manager: { 
                        $in: req.user._id
                    }}
                ]
            })
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
            if(project.manager.toString() !== req.user._id.toString()){
                return res.status(403).json({ error: 'No tienes permiso para ver este proyecto' })
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
            const project = await Project.findById(id)
            if(!project){
                return res.status(404).json({ error: 'Proyecto no encontrado' })
            }
            if(project.manager.toString() !== req.user._id.toString()){
                return res.status(403).json({ error: 'Solo el manager puede actualizar este proyecto' })
            }
            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description
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
            const project = await Project.findById(id)
            if(!project){
                return res.status(404).json({ error: 'Proyecto no encontrado' })
            }
            if(project.manager.toString() !== req.user._id.toString()){
                return res.status(403).json({ error: 'Solo el manager puede eliminar este proyecto' })
            }
            await project.deleteOne()
            res.send('Proyecto eliminado Correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al eliminar el proyecto' })
        }

    }

}