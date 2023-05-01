const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: {type: String, required: true},
    beginningDate: {type: Date, required: true},
    endingDate: {type: Date, required: true},
    assignedProfessor: {type: mongoose.Schema.Types.professorId, required: true},
    students: {type:[mongoose.Collection.student], required: true},
    assignments: {type:[mongoose.Collection.assignment], required: true}
});

module.exports = mongoose.model("Class", classSchema);