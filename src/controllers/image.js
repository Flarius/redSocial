const path = require('path');
const {randomNumber} =  require('../helpers/libs');
const fs = require('fs-extra');
const ctrl = {};

ctrl.index = (req,res) => {

};
ctrl.create = async (req,res) => {
   //genero un nombre aleatoreo de 7 carateres para el nombre de la imagen
   const imgURL = randomNumber();
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
   }
   res.send('anda');
};
ctrl.like = (req,res) => {
   
};
ctrl.comment = (req,res) => {
   
};
ctrl.delete = (req,res) => {
   
};
module.exports = ctrl;