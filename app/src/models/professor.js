const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const professorSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    class: {type: [mongoose.Collection.class], required:true}
});

professorSchema.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.model("Professor", professorSchema);