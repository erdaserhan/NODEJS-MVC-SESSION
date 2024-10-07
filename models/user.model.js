const db = require('./db.js');

console.log('On passe par  : user.model.js');

//Constructeur
const User = function(lutilisateur) {
    this.nom = lutilisateur.nom,
    this.email = lutilisateur.email,
    this.motdepasse = lutilisateur.motdepasse; 
}

//Créer l'utilisateur
User.insertUser = (newUser, resultat) => {
    db.query("INSERT INTO users(nom,email,motdepasse) VALUES (?,?,?)", [nom,email,motdepasse], (err, res) => {
        if(err) {
            console.log("Erreur d'insertion - User insertUser : " + err);
            resultat(err, null);
            return;
        }
        // Si OK => res
        console.log('OK User.insertUser : ' +res);
        resultat(null, res);
    });
};

//Récupérer un irilisateur sur base de son ID
User.getUserById = (id, resultat) => {
    sql.query("SELECT * FROM users WHERE id = ?", id, (err,res) => {
        // Si erreur pendant la lecture => err
        if (err) {
            console.log("Erreur User.getUserById : ", err);
            resultat(err, null);
            return;
        }

        if (res.length) {
            console.log("User.getUserById - message trouvé : " + res[0]);
            resultat(null, res[0]);
            return;
        }

        // Si OK => res
        console.log("Pas d'utilisateur avec cet ID");
        resultat({ type: "ERR_NOT_FOUND"}, null);
    });
};


//Récupérer un irilisateur sur base de son email
User.getUserByEmail = (email, resultat) => {
    sql.query("SELECT * FROM users WHERE id = ?", email, (err,res) => {
        
        if (err) {
            console.log("Erreur User.getUserByEmail : ", err);
            resultat(err, null);
            return;
        }

        if (res.length) {
            console.log("User.getUserByEmail - message trouvé : " + res[0]);
            resultat(null, res[0]);
            return;
        }

        // Si OK => res
        console.log("Pas d'utilisateur avec cet email");
        resultat({ type: "ERR_NOT_FOUND"}, null);
    });
};

