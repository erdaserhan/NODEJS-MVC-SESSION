const Message = require('../models/message.model.js');

const moment = require('moment');

console.log('On passe dans controller/message.controller.js ');

exports.create = (req, res) => {
    console.log('POST Crée un message');
    const titrePage = 'Formulaire reçu';
    const lenom = req.body.nom;
    const lemessage = req.body.msg;
    
    if ((!req.body)||(lenom=="")||(lemessage=="")) {
        console.log('Le contenu ne peut pas être vide');
        res.redirect('/contact_form');
    } else {
        console.log(req.body);

        const unMsg = new Message({
            nom: req.body.nom,
            msg: req.body.msg
        });

        Message.create(unMsg, function(err, data) {
            if(err) {
                res.status(500).send({
                    message: "Erreur pendant la création du message"
                });
            }else {
                console.log('Data: ', data);
                res.render('traiter_form', { title: titrePage, nom: unMsg.nom, msg: unMsg.msg});
            }
        });
    }
};

exports.readAll = (req, res) => {
    console.log('GET Tous les messages');
    Message.readAll(function(err, data){
        if(err) {
            res.status(500).send({
                message: "Erreur pendant la création du message"
            });
        } else {
            console.log('Data :', data);
            const titrePage = "Tableau des messages";
            moment.locale('fr');
            res.render('tableauMessages', {title: titrePage, donnees: data, moment: moment});
        }
    });
};

exports.newmsg = (req, res) => {
    console.log("Affichage du formulaire de création")
}; 

exports.list = (req, res) => {
    console.log('Affichage de la liste des messages');
    Message.readAll(function(err, data) {
        if(err) {
            res.status(500).send({
                message: "Erreur pendant le lecture de tous les messages - list"
            });
        }else {
            const titrePage = "Liste détaillée des messages";
            moment.locale('fr');
            res.render('listeMessages', {title: titrePage, donnees: data, moment: moment});
        }
    });
};

exports.readById = (req, res) => {
    console.log('Affichage des details du message ' + req.params.id);

    Message.readById(req.params.id, (err, data) => {
        if(err) {
            if(err.type === 'ERR_NOT_FOUND'){
                    res.status(404).send({
                    message: `Pas de message trouvé avec id ${req.params.id} - readById`            
            });
            }else {
                res.status(500).send({
                message: "Une erreur s'est produite en cherchent le message avec l'id" +req.params.id +"readById"
            });
        }
        }else {
            const titrePage = "Détails du message " + req.params.id;
            moment.locale('fr');
            res.render('detailsMessage', {title: titrePage, donnees: data, moment: moment});
        }
    });
};

exports.updateById = (req, res) => {
    console.log('Récupérer les données actuelles du message ' + req.params.id +"avant modification");

    Message.updateById(req.params.id, (err, data) => {
        if(err) {
            if(err.type === 'ERR_NOT_FOUND'){
                    res.status(404).send({
                    message: `Pas de message trouvé avec id ${req.params.id} - updateById`            
            });
            }else {
                res.status(500).send({
                message: "Une erreur s'est produite en cherchent le message avec l'id" +req.params.id + "updateById"
            });
        }
        }else {
            const titrePage = "Modification du message " + req.params.id;
            moment.locale('fr');
            res.render('editMessage', {title: titrePage, donnees: data, moment: moment});
        }
    });
};


exports.update = (req, res) => {
    console.log('Mettre à jour les données modifiées');
    const titrePage = "Liste des messages";
    const lid = req.body.id;
    const lenom = req.body.nom;
    const lemessage = req.body.msg;

    if ((!req.body)||(lenom=="")||(lemessage=="")) {
        console.log('Le contenu ne peut pas être vide');
        res.redirect('/messages/edit' + req.body.id);
    } else {
        console.log(req.body);

        const unMsg = new Message({
            nom: req.body.nom,
            msg: req.body.msg
        });

        Message.update(lid, unMsg, function(err, data) {
            if(err) {
                res.status(500).send({
                    message: "Erreur pendant la modification du message"
                });
            }else {
                res.redirect('/messages/list');
            }
        });
    }
};

exports.deleteById = (req, res) => {
    console.log('Récupérer les données actuelles du message ' + req.params.id +"avant suppression");

    Message.deleteById(req.params.id, (err, data) => {
        if(err) {
            if(err.type === 'ERR_NOT_FOUND'){
                    res.status(404).send({
                    message: `Pas de message trouvé avec id ${req.params.id} - deleteById`            
            });
            }else {
                res.status(500).send({
                message: "Une erreur s'est produite en cherchent le message avec l'id" +req.params.id + "deleteById"
            });
        }
        }else {
            const titrePage = "Suppression du message " + req.params.id;
            res.render('confirmMessage', {title: titrePage, donnees: data});
        }
    });
};


exports.delete = (req, res) => {
    console.log('Effacer le message après confirmation');

    const lid = req.body.id;

    if (!req.body) {
        console.log('Le contenu ne peut pas être vide');
        res.redirect('/messages/confirm' + req.body.id);
    } else {
        console.log(req.body);

        Message.delete(lid, function(err, data) {
            if(err) {
                res.status(500).send({
                    message: "Erreur pendant la suppression du message"
                });
            }else {
                res.redirect('/messages/list');
            }
        });
    }
};


