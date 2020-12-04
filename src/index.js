//Constantes
const express = require ('express');
const app = express();
const path = require ('path');
const morgan = require('morgan');
const multer = require('multer');
const nodemailer = require('nodemailer');


//Seting from server serial
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');

//Midelwares
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false }));
app.use(multer({dest:path.join(__dirname, 'public/images')}).single('image'));

//Rutas
app.use(require('./routes/index'));
//Static Files
app.use(express.static(path.join(__dirname,'public')));
// listen port from setting Start Server
app.listen(app.get('port'),() => {
       console.log('Server on port',app.get('port'));
       
})
