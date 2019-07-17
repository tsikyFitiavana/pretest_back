const Produit = require('../../schema/dashbordSchema/dashSchema');
const fs = require('fs');

exports.create = (req, res) => {
    Produit.find()
    .then(prod => {
        //autoincrement
        let idautom;
        if(prod.length == 0){
            idautom = 0
        }else {
            idautom = parseInt(prod[prod.length - 1]._id) + 1
        }
        
        // //images
        let imageFile = req.files.image;
        //console.log('inona ny ato o!'+imageFile)
        let nomImage = idautom
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
          
          
          //res.send({file:`public/${nomImage }.jpg`});
          
          
        });
        
        
        
        //console.log('image file '+req.body.filename)
    const produit = new Produit({   
             
        _id: idautom,
        nom: req.body.nom , 
        prix: req.body.prix,
        description: req.body.description,
        image:'' + nomImage +'.jpg'
    });


    // Save p in the database
    produit.save()
    .then(() => {
        Profile.find()
        .then(data=>{
            res.send(data);
        })
    }).catch(err => {
        res.status(200).send({
            message: err.message || "Something wrong while creating the produit."
            
        });
    });
})
};

exports.findAll = (req, res) => {   
    Produit.find()
    .then(prods => {    
        res.send(prods);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving profils."
        });
    });
};

exports.lireImage =(req, res) =>{
    try {
        let picture = fs.readFileSync('./controllers/dashbord/public/'+req.params.image)
        res.write(picture)
        res.end()
    } catch (e) {
        console.log("erreur be miitsy", e.stack);
    }
}

exports.findOne = (req, res) => {
    Produit.findById(req.params.produitId)
    .then(produitchoix => {
        //console.log(unprofil) 
        if(!produitchoix) {
            return res.status(404).send({
                message: "profil not found with id" + req.params.produitId
            });            
        }
        else{  
            res.send(profilchoix);             
        }    
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "profil not found with id " + req.params.produitId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving profil with id " + req.params.produitId
        });
    });
};


exports.delete = (req, res) => {
    produit.findByIdAndRemove(req.params.produitId)
    .then(produits => {
        if(!produits) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.produitId
            });
        }
        res.send({message: "eleve deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.nom === 'NotFound') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.produitId
            });                
        }
        return res.status(500).send({
            message: "Could not delete eleve with id " + req.params.produitId
        });
    });
};
