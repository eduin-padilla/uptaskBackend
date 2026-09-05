import  express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import projectRoutes from './routes/projectRouter.js'

dotenv.config()

connectDB()

const app: express.Express = express()

app.use(express.json())


//rutas
app.use('/api/projects', projectRoutes)

export default app