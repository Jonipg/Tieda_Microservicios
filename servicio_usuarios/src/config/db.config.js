require('dotenv').config();
const mysql = require("mysql");


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port:process.env.DB_PORT
}) 


connection.connect(
    (err)=>{
        if(err) console.log(err.message || "Ocurrio un error al conecar a la base de datos");
        else console.log("Conectado a la base de datos");
    }
);


module.exports = connection;