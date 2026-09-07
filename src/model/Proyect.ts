import mongoose, {Schema, Document, PopulatedDoc, Types} from 'mongoose';
import { InterfaceTask } from './Task.js';



export interface InterfaceProject extends Document {

    projectName: string
    clientName: string
    description: string
    task: PopulatedDoc<InterfaceTask & Document>[]


}


const ProjectSchema: Schema = new Schema({


    projectName: {
        type: String,
        required: true, 
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    task: [{
        type: Types.ObjectId,
        ref: 'Task'
    }]

}, {timestamps: true})
const Project = mongoose.model<InterfaceProject>('Project', ProjectSchema)


export default Project