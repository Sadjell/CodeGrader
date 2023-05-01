const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const Assignment = require("../models/assignment");
const Student = require("../models/student");
const fsPromise = require('node:fs/promises');
const fs = require('fs');
const Class = require("../models/class");

//create a course
router.post("/", (req, res) => {
    try {
        const course = Class.push({
            name: req.body.name,
            beginDate: req.body.beginDate,
            endDate: req.body.endDate,
            students: req.body.students,
            assignments: []
        });

        res.status(200).send(course);

    } catch (err) {
        res.status(500).json(err);
    }
});

//update a course
router.put("/:courseId", (req, res) => {
    const courseId = req.params.courseId;
    console.log(`Updating course: ${courseId}`);
    
    try {
        const beginDate = req.body.beginDate;
        const endDate = req.body.endDate;
        const students = req.body.students;
        
        Class.findByIdAndUpdate(courseId, 
            {beginningDate: beginDate, endingDate: endDate, students: students}, 
            {$new: true}).then((course) => {
                res.status(200).json(course);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//delete a course
router.delete("/:courseId", (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = Class.findByIdAndRemove(courseId);
        res.status(200).send(`Deleted course: ${courseId}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create a new assignment
router.post("/:courseId/assignments", (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = Class.findById(courseId);
        const assignment = Class.assignments.push({
            name: req.body.name,
            dueDate: req.body.dueDate,
            assignmentContent: req.body.assignmentContent,
            testCase: req.body.testCase,
            submissions: []
        });

        res.status(200).send(assignment);

    } catch (err) {
        res.status(500).json(err);
    }
});

//get an assignment
router.get("/:courseId/assignments/:assignmentId", (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = Class.findById(courseId);
        const assignment = Assignment.findById(course.assignmentId);

        res.status(200).send(assignment);

    } catch (err) {
        res.status(500).json(err);
    }
});

//update an assignment
router.put("/:courseId/assignments/:assignmentId", (req, res) => {
    const courseId = req.params.courseId;
    const assignmentId = req.params.assignmentId;
    console.log(`Updating assignment: ${assignmentId}`);
    
    try {
        const dueDate = req.body.dueDate;
        const assignmentContent = req.body.assignmentContent;
        const testCase = req.body.testCase;
        const course = Class.findById(courseId);
        Assignment.findByIdAndUpdate(course.assignmentId, 
            {dueDate: dueDate, assignmentContent: assignmentContent, testCase: testCase}, 
            {$new: true}).then((course) => {
                res.status(200).json(course);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//get all course grades
router.get("/:courseId/grades", (req, res) => {
      var studentAverages = [];
      var studentGrades = [];
      const courseId = req.params.courseId;
      try {
          const course = Class.findById(courseId);
          const assignments = course.assignments;
          const students = course.students;
          students.foreach((student,index) => {
            assignments.forEach((assignment, index) => {
                const submissions = assignment.submission;
                const specSubmission = submissions.filter(submission => submission.studentId == student._id);
                studentGrades.push(specSubmission.grade);
              });
              avgGrade = studentGrades.reduce((sum, next) => sum + next) / studentGrades.length;
              studentAverages.push(avgGrade);
          });

          res.status(200).send(studentAverages);
  
      } catch (err) {
          res.status(500).json(err);
      }
});

//get a students course grade
router.get("/:courseId/grades/:studentId", (req, res) => {
    var studentGrades = [];
    const courseId = req.params.courseId;
    const studentId = req.params.studentId;
    try {
        const course = Class.findById(courseId);
        const assignments = course.assignments;
        assignments.forEach((assignment, index) => {
          const submissions = assignment.submission;
          const specSubmission = submissions.filter(submission => submission.studentId == studentId);
          studentGrades.push(specSubmission.grade);
        });
        avgGrade = studentGrades.reduce((sum, next) => sum + next) / studentGrades.length;

        res.status(200).send(avgGrade);

    } catch (err) {
        res.status(500).json(err);
    }
});

/* //update a students course grade
router.put("/:courseId/grades/:studentId", (req, res) => {
    //for each assignment
     //get specsub, then grade
}); */