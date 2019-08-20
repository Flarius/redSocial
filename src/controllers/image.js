const path = require('path');
const {randomNumber} =  require('../helpers/libs');
const fs = require('fs-extra');
const ctrl = {};
const { Image, Comment } =  require('../models')

ctrl.index = async (req,res) => {
   const viewModel = {image: {}, comments: {}};

   const image = await Image.findOne({fileName: {$regex: req.params.image_id}});
   if (image){
      image.views = image.views + 1;
      viewModel.image = image;
      await image.save();
      const comments = await Comment.find({image_id: image._id});
      viewModel.comments = comments;
      res.render('image', viewModel);
   }else{
      res.redirect('/');
   }
};
ctrl.create = async (req,res) => {
   const saveImage = async () => {
      //genero un nombre aleatoreo de 7 carateres para el nombre de la imagen
      const imgURL = randomNumber();
      const images = await Image.find({ fileName: imgURL });
      //me aseguro que el nombre de la imagen no este ocupado
      if (images.length > 0 ){
         saveImage();
      }else{
         //me guardo la extension de la imagen
         const ext = path.extname(req.file.originalname).toLowerCase();
         //me guardo la ubicacion temporal del archivo
         const imageTempPath = req.file.path;
         //ubicacion final de la imagen
         const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);
         //controlo que la extension sea la correcta
         if (ext === '.png' || ext === '.jpg'){
            //muevo el archivo a la ubicacion final, se usa await para que espere hasta que se efecute el if
            await fs.rename(imageTempPath, targetPath);
            //guardo la imagen en el modelo
            const newImage = new Image({
               title: req.body.titulo,
               fileName: imgURL + ext,
               description: req.body.descripcion
            });
            const imgSaved = await newImage.save();
            //console.log(imgSaved);
            res.redirect('/images/' + imgURL)
         }else{
            //si la imagen no cumple con la extension la elimino
            await fs.unlink(imageTempPath);
            //respondo por res con un 500 y un mensaje de error
            res.status(500).json({error: 'solo se aceptan imagenes'});
         }
         res.send('anda');
      }
   };
   saveImage();
};
ctrl.like = (req,res) => {
   
};
ctrl.comment = async (req,res) => {
   const image = await Image.findOne({fileName: {$regex: req.params.image_id}});
   if (image){
      const newComment = new Comment (req.body);
      newComment.image_id = image._id;
      await newComment.save();
      console.log(newComment)
      res.redirect('/images/' + image.uniqueId )
   }else{
      res.redirect('/');
   }
};
ctrl.delete = (req,res) => {
   
};
module.exports = ctrl;