const express = require('express');
const studentRouter = express.Router();
const student = require("../models/student");
const course = require("../models/class");
const Verify = require("./verify");
const passport = require("passport");

//Create student account
studentRouter.route('/')
.post( async (req,res) => {
    console.log("Creating a new account...");
    console.log(req.body);

    await student.register(new student({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName}), 
        req.body.password)
        .then((student) => {
            passport.authenticate("local")(req, res, () => {
                const token = Verify.getToken(student);
                return res
                .status(200)
                .header("x-access-token", token)
                .header("access-control-expose-headers", "x-access-token")
                .send(student);
            })
        });
});

//Login
studentRouter.route('/login')
.post(passport.authenticate("local"), async (req, res) => {
    try {    
        console.log("Logging in...")
        await student.findOne({email: req.body.email})
        .then((student) => {
            const token = Verify.getToken(student);
            return res.status(200).send(token);
        });
    } catch(err) {
        console.log("Login failed.");
        return res.status(500).json(err);
    }
});

//Delete/Update a student account
studentRouter.route("/:studentID")
.delete( async (req, res) => {
    console.log("Deleting student account " + req.params.studentID);
    try {
        await student.deleteOne({studentID: req.params.studentID})
        console.log("Student " + req.params.studentID + " deleted.")
        return res.status(200);
    } catch(err) {
        console.log("Deletion failed.");
        return res.status(500).json(err);
    }
})
.put( async (req, res) => {
    console.log("Updating student account " + req.params.studentID);
    try {
        await student.findOne({email: req.body.email})
        .then((student) => {
            if(req.body.email != null) { student.email = req.body.email }
            if(req.body.firstName != null) { student.firstName = req.body.firstName }
            if(req.body.lastName != null) { student.lastName = req.body.lastName }
            if(req.body.password != null) { student.password = req.body.password }
        })
    } catch(err) {
        console.log("Update failed.");
        return res.status(500).json(err);
    }
});

//Get all student's courses/Add student to course
studentRouter.route("/courses")
.get( async (req, res) => {
    console.log("Getting all courses...");
})

//Get specific course
studentRouter.route("/courses/:courseID")
.get( async (req, res) => {
    console.log("Getting course with ID: " + req.params.courseID)
})