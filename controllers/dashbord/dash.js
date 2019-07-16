const Produit = require('../../schema/dashbordSchema/dashSchema');
console.log(Produit)
const fs = require('fs');

exports.create = (req, res) => {
    console.log("resultat req.body "+req.body)
    console.log("resultat req.body.image "+req.body.image)
    if(!req.body.nom || !req.body.description) {
        console.log('console.log 1 '+req.file);
        
        console.log('console.log 2 '+req.body.nom);
        
        
        return res.status(400).send({
            message: "profil content can not be empty"
            
        });
    }
    
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

        imageFile.mv(`${__dirname}/public/images/${nomImage }.jpg`, function(err) {
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
        Produit.find()
        .then(data=>{
            res.send(data);
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the Produit."
            
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
        let picture = fs.readFileSync('././public/images/'+req.params.image)
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