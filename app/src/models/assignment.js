const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    dueDate: {type: Date, required: true},
    assignmentContent: {type: String, required: true},
    testCase: {type: File, required: true},
    submission:[{
        studentId: {type: mongoose.Schema.Types.studentId},
        testCaseOutput: {type: String, required: true},
        grade: {type: Number, required: true},
        feedback: {type: String, required: false}
    }]
});

module.exports = mongoose.model("assignment", assignmentSchema);