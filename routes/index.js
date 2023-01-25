var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', async (req, res, next) => {

  console.log(req.body) //¿Estoy capturando datos?

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var mensaje = req.body.mensaje;
  var telefono = req.body.telefono;

  var obj = {
    to: 'gabogaleano@gmail.com',
    subjet: 'Contacto',
    html: nombre + " " + apellido + " " + " // " + email + " // " + telefono + " // " + mensaje + ".-"
  }//Cierro var obj

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }) //Cierro Transporter

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente',
  })
})//Cierro Peticion del POST

module.exports = router;
