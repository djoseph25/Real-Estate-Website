const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
email:{
    type:String,
    required: true,
    unique: true
}
});

UserSchema.plugin(passportLocalMongoose);
// THis is already adding a username and passport so I don't need to define in my schema

module.exports = mongoose.model('User', UserSchema);