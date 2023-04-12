const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    dueDate: {type: Date, required: true},
    assignmentContent: {type: String, required: true},
    submission:[{
        studentId: {type: mongoose.Schema.Types.studentId},
        grade: {type: Number, required: true},
    }]
});

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.model("Assignment", userSchema);