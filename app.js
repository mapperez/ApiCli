
var express = require('express');
var mongoose = require('mongoose');


// Conect DB
mongoose.connection.openUri('mongodb://localhost:27017/gesclinica', (err, resp) =>{
    if(err) throw err;
    console.log('Base de Datos  \x1b[32m%s\x1b[0m ', 'online');
})


var app = express();



// Rutas

app.get("/", (req,res,next) => {
    res.status(200).json({
        success: true,
        errors: [],
        data: []
    })
})

app.listen(3000, () =>{
    console.log('Corriendo en puerto: 3000 \x1b[32m%s\x1b[0m ', 'online');
});



