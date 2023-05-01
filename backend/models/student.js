const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const studentSchema = new mongoose.Schema({
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    class: {type: [mongoose.Collection.class]},
});

studentSchema.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.model("student", studentSchema);