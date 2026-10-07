import mongoose, {Schema, Document, PopulatedDoc, Types} from 'mongoose';
import { InterfaceTask } from './Task.js';
import { Iuser } from './User.js';



export interface InterfaceProject extends Document {

    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<InterfaceTask & Document>[]
    manager: PopulatedDoc<Iuser & Document>

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
    tasks: [{
        type: Types.ObjectId,
        ref: 'Task'
    }],
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})
const Project = mongoose.model<InterfaceProject>('Project', ProjectSchema)


export default Project