const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const Assignment = require('../models/assignment');
const Professor = require("../models/professor");
const Student = require("../models/student");
const fsPromise = require('node:fs/promises');
const fs = require('fs');


//submit assignment
router.post("/:assignmentId/submissions", (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        const submissions = Assignment.findById(assignmentId).submission;
        const submission = submissions.push({
            studentId: req.body.studentId,
            testCaseOutput: req.body.testCaseOutput,
            grade: req.body.grade,
            feedback: ""
        });

        res.status(200).send(submission);

    } catch (err) {
        res.status(500).json(err);
    }
});

//get all submissions for an assignment
router.get("/:assignmentId/submissions", (req, res) => {
    const assignmentId = req.params.assignmentId;
    try {
        const assignment = Assignment.findById(assignmentId);
        assignment.submission.forEach((submission, index) => {
            res.status(200).send(submission);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

//get specific submission
router.get("/:assignmentId/submissions/:studentId", (req, res) => {
    const assignmentId = req.params.assignmentId;
    const studentId = req.params.studentId;
    try {
        const assignment = Assignment.findById(assignmentId);
        //const student = Student.findById(studentId);
        const submissions = assignment.submission;
        const specSubmission = submissions.filter(submission => submission.studentId == studentId);

        res.status(200).send(specSubmission);

    } catch (err) {
        res.status(500).json(err);
    }
});

//update specific submission
router.put("/:assignmentId/submissions/:studentId", (req, res) => {
    const assignmentId = req.params.assignmentId;
    const studentId = req.params.studentId;
    try {
        const assignment = Assignment.findById(assignmentId);

        submission.findByIdAndUpdate(studentId, 
            {grade: grade}).then((course) => {
                res.status(200).json(course);
            });

    } catch (err) {
        res.status(500).json(err);
    }
});

//update feedback on submission
router.put("/:assignmentId/submissions/:studentId/feedback", (req, res) => {
    const assignmentId = req.params.assignmentId;
    const studentId = req.params.studentId;
    try {
        const assignment = Assignment.findById(assignmentId);

        submission.findByIdAndUpdate(studentId, 
            {feedback: feedback}).then((course) => {
                res.status(200).json(course);
            });

    } catch (err) {
        res.status(500).json(err);
    }
});

//get test case output for assignment
router.get("/:assignmentId/submissions/:studentId/testCaseOutput", (req, res) => {
    const assignmentId = req.params.assignmentId;
    const studentId = req.params.studentId;
    try {
        const assignment = Assignment.findById(assignmentId);
        //const student = Student.findById(studentId);
        const submissions = assignment.submission;
        const specSubmission = submissions.filter(submission => submission.studentId == studentId);

        res.status(200).send(specSubmission.testCaseOutput);

    } catch (err) {
        res.status(500).json(err);
    }
});

//get due date
router.get("/:assignmentId/dueDate", (req, res) => {
    const assignmentId = req.params.assignmentId;

    try {
        const assignment = Assignment.findById(assignmentId);

        res.status(200).send(assignment.dueDate);

    } catch (err) {
        res.status(500).json(err);
    }
});

/* //update due date
router.put("/:assignmentId/dueDate", (req, res) => {
    const assignmentId = req.params.assignmentId;

    try {
        const assignment = Assignment.findById(assignmentId);

        res.status(200).send(assignment);

    } catch (err) {
        res.status(500).json(err);
    }
}); */