import type { Request, Response } from "express"
import Project from "../model/Proyect.js"



export class ProjectController {

    static getAllProjects = async (req: Request, res: Response) => {

        

    }

    static createProject = async (req: Request, res: Response) => {

        
        
        try {
            await Project.create(req.body)
            res.send('proyecto creado correctamente')
        } catch (error) {
            console.log(error)
        }

    }

}