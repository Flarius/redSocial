const mongoose = require('mongoose');
const {Schema} = mongoose;
const path = require('path');

const ImageSchema = new Schema ({
   title: { type: String},
   description: {type: String},
   fileName: {type: String },
   views: { type:Number, default: 0 },
   likes: { type:Number, default: 0 },
   timeStamp: { type: Date, default: Date.now}
});

ImageSchema.virtual('uniqueId')
   .get(function(){
      return this.fileName.replace(path.extname(this.fileName), '');
   })

module.exports = mongoose.model('Image', ImageSchema);

