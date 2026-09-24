import  express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import projectRoutes from './routes/projectRouter.js'
import cors from 'cors'
import { corsConfig } from "./config/cors.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";

dotenv.config()
connectDB()

const app: express.Express = express()
app.use(cors(corsConfig))

//loggin
app.use(morgan('dev'))

//leer datos del formulario
app.use(express.json())


//rutas
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

export default app