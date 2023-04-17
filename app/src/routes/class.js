const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const Assignment = require("../models/assignment");
const Student = require("../models/student");
const fsPromise = require('node:fs/promises');
const fs = require('fs');

//create a course
router.post("/", (req, res) => {
    
});

//update a course
router.put("/:courseId", (req, res) => {
    
});

//delete a course
router.delete("/:courseId", (req, res) => {
    
});

//create a new assignment
router.post("/assignments", (req, res) => {
    
});

//get an assignment
router.get("/assignments/:assignmentId", (req, res) => {
    
});

//update an assignment
router.put("/assignments/:assignmentId", (req, res) => {
    
});

//view all course grades
router.get("/grades", (req, res) => {
    
});

//view a students course grade
router.get("/grades/:studentId", (req, res) => {
    
});

//update a students course grade
router.put("/grades/:studentId", (req, res) => {
    
});