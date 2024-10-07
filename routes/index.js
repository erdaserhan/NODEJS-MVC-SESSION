var express = require('express');
var router = express.Router();

//Controller root
var root = require('../controllers/root.controller.js')

/* GET home page. */
router.get('/', root.home);

//afficher le formulaire
router.get('/contact', root.form);

//Afficher les données entrées dans le formulaire
router.post('/traitement', root.traitement);

module.exports = router;
