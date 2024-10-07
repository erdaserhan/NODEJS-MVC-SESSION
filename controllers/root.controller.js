console.log('On passe dans controller/root.controller.js');

exports.home = (req, res, next) => {
    res.render('index', {title: 'Express' });
};

exports.form = (req, res, next) => {
    res.render('contact_form', {title: 'Contact' });
};

exports.traitement = (req, res, next) => {
    let lenom = req.body.nom;
    let lemessage = req.body.msg;

    res.render('traiter_form', {title: "Formulaire reçu", nom: lenom, message: lemessage});
};