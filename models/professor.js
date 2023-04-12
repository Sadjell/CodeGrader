const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    professorId: {type: Number,required: true},
    class: {type: [mongoose.Collection.class], required:true},
    isProfessor: {type: Boolean, required: true}
});

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.model("Professor", userSchema);