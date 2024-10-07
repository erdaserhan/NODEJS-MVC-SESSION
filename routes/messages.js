var express = require('express');
var router = express.Router();

//Conroller des messages
var messages = require('../controllers/message.controller.js')


/* ==== Lire les messages =====*/
//Afficher tous les mesages sous forme d'un tableau(admin)
router.get('/', messages.readAll);

//Afficher tous les mesages sous forme d'une liste (utilisateur)
router.get('/list', messages.list);

/* ==== Lire un seul message selon son ID  ====== */
router.get('/read/:id', messages.readById);

/* ==== Ajouter un message  ====== */
//Afficher le formulaire d'ajout (vide) pour définir le message
router.get('/newmsg', messages.newmsg);

/* ==== Sauvegarder dans la DB ce nouveau message  ====== */
router.post('/create', messages.create);

/* ==== Mettre à jour un message ====== */
//Afficher le formulaire avec les données existantes
router.get('/edit/:id', messages.updateById);

// Mise à jour dans la DB
router.post('/update/:id', messages.update);

/*==== Supprimer un message */
//Afficher les données existantes et attendre la confirmation avant de supprimer
router.get('/confirm/:id', messages.deleteById);

// Supprimer dans la DB après confirmation
router.post('/delete/:id', messages.delete);

module.exports = router;