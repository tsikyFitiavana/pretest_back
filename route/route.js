const account = require('../controllers/account/lib');
const produit = require('../controllers/dashbord/dash');

module.exports = function (app) {
    app.post('/login', account.login);
    app.post('/signup', account.signup);
    app.post('/produit', produit.create);
    app.get('/produit', produit.findAll);
    app.get('/produit/:produitId', produit.findOne);
    app.get('/produitImage/:image', produit.lireImage);
}