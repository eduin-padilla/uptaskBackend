import mongoose from 'mongoose';
import colors from 'colors';



export const connectDB = async () => {

    try {

        const conection = await mongoose.connect(process.env.DATABASE_URL);
        const url = `${conection.connection.host}:${conection.connection.port}`
        console.log(colors.green.bold(`Conectado a MongoDb en el puerto: ${url}`))
        
    } catch (error) {
        console.log(colors.red.bold('Error al conectar a MongoDb'))
        process.exit(1)
    }

}
