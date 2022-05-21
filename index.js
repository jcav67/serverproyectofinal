const express= require('express');
const cors=require('cors');
require('dotenv').config();

const path = require('path');

// Crear el servidor/aplicación de express
const app=express();

//Middlewares
//Directorio público
app.use(express.static('public'));


//settings
app.set('port',process.env.PORT || 3000);

//CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/querys',require('./routes/broker'));


//Manejar demás rutas 
app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(app.get('port'), ()=>{
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
})


module.exports = app;
