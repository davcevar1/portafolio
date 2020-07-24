const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();
///////////// Conexion DB///////////////////////
var serviceAccount = require("./davidcev-6cfcd-firebase-adminsdk-yi17b-650b092a70.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://davidcev-6cfcd.firebaseio.com"
});

const database = admin.firestore();
const proyectosRef = database.collection('proyectos');
var dataProyectos = [];
var datos = async function(){
try{
    const snapshot = await proyectosRef.get();
    var proyecto = snapshot.docs.map(x=>{
      var colec={
        id:x.id,
        data:x.data()
      }
      //console.log(x.data());
      dataProyectos.push(colec);
    })
  } catch(error){
     console.log(error);
 }
}

datos();
//console.log(dataProyectos);
/*proyectosRef.get().then((query)/*=>{
  console.log(query);
})*/
////////////Rutas ///////////////////////

router.get('/',(req,res) => {
  res.render('index.html',{tittle : 'David Cevallos Dev'});
});
///////////////////////
router.get('/proyecto/:id',async(req,res) => {

  try{
      const snapshot = await proyectosRef.doc(req.params.id).get();

      console.log(snapshot.data());
      var pro = snapshot.data();

    } catch(error){
       console.log(error);
   }
  res.render('proyecto.html',{tittle : 'David Cevallos Dev', proyecto:pro});

});

router.get('/contact',(req,res) => {
  res.render('contact.html',{tittle : 'Contacto'});
});


router.get('/about',(req,res) => {
  res.render('about.html',{tittle : 'Acerca'});
});

router.get('/portfolio',(req,res) => {
  res.render('portfolio.html',{tittle : 'Portafolio', proyectos:dataProyectos} );
});

router.get('/services',(req,res) => {
  res.render('services.html',{tittle : 'Servicios'});
});
router.get('/prueba',(req,res) => {
  res.render('prueba.html',{tittle : 'Pagina Pueba'});
});




module.exports = router;
