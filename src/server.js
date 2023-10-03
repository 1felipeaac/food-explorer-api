require("express-async-errors")
const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");
const database = require("./database/sqlite")

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

const app = express();

app.use(express.json());
app.use(routes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

database();

app.use((error, request, response, next) =>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})


const PORT = 3333;
app.listen(PORT, ()=> console.log(`Server is run in port: ${PORT}`));