import server from "./server.js"
import colors from "colors"


const port = process.env.PORT || 5000 

server.listen(port, () => {
    console.log( colors.cyan.bold(`Server corriendo en el puerto ${port}`))
})