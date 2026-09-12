import  express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import projectRoutes from './routes/projectRouter.js'
import cors from 'cors'
import { corsConfig } from "./config/cors.js";

dotenv.config()

connectDB()

const app: express.Express = express()

app.use(cors(corsConfig))
app.use(express.json())


//rutas
app.use('/api/projects', projectRoutes)

export default app