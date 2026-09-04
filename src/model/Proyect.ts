import mongoose, {Schema, Document} from 'mongoose';



export type ProjectType = Document & {

    projectName: string
    ClientName: string
    description: string

}


const ProjectSchema: Schema = new Schema({


    projectName: {
        type: String,
        required: true, 
        trim: true
    },
    ClientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }

})
const Project = mongoose.model<ProjectType>('Project', ProjectSchema)


export default Project