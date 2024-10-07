var express = require('express');
var router = express.Router();

// on importe le contrôleur des utilisateurs
var users = require("../controllers/user.controller.js");


// Aller sur la page d'accueil de l'utilisateur connecté
router.get('/', users.home);

// Affichage du formulaire d'enregistrement
router.get('/register', users.registerform);

// Sauvegarder les données d'enregistrement du nouvel utilisateur
router.post('/register', users.register);

//Affichage du formulaire de connexion (login)
router.get('/login', users.loginform);

// Connexion de l'utilisateur
router.post('/login', users.login);

// Déconnexion de l'utilisateur
router.post('/logout', users.logout);


module.exports = router;
