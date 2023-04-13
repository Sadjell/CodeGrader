const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    beginningDate: {type: Date, required: true},
    endingDate: {type: Date, required: true},
    assignedProfessor: {type: mongoose.Schema.Types.professorId, required: true},
    students: {type:[mongoose.Collection.student], required: true},
    assignments: {type:[mongoose.Collection.assignment], required: true}
});

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.model("Class", userSchema);