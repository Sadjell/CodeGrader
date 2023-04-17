const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const Professor = require("../models/professor");
const Student = require("../models/student");
const fsPromise = require('node:fs/promises');
const fs = require('fs');


//submit assignment
router.post("/submissions", (req, res) => {
    
});

//get all submissions for an assignment
router.get("/submissions", (req, res) => {
    
});

//get specific submission
router.get("/submissions/:studentId", (req, res) => {
    
});

//update specific submission
router.put("/submissions/:studentId", (req, res) => {
    
});

//update feedback on submission
router.put("/submissions/:studentId/feedback", (req, res) => {
    
});

//get test case output for assignment
router.put("/testcase/:submissionId/:output", (req, res) => {
    
});

//get due date
router.get("/dueDate", (req, res) => {
    
});

//update due date
router.put("/dueDate", (req, res) => {
    
});