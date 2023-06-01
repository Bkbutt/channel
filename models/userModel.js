const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,Unique:true},
    password:{type:String,required:true},
    phoneNumber: { type: Number, required: true },
    urlNo:{type:String,required:true},

});

module.exports= mongoose.model('User',userSchema);