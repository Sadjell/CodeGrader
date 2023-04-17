const express = require('express');
const professorRouter = express.Router();
const professor = require("../models/professor");
const Verify = require("./verify");
const passport = require("passport");

//Create professor account
professorRouter.route('/')
.post( async (req,res) => {
    console.log("Creating a new account...");
    console.log(req.body);

    await professor.register(new professor({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName}), 
        req.body.password)
        .then((professor) => {
            passport.authenticate("local")(req, res, () => {
                const token = Verify.getToken(professor);
                return res
                .status(200)
                .header("x-access-token", token)
                .header("access-control-expose-headers", "x-access-token")
                .send(professor);
            })
        });
});

//Login
professorRouter.route('/login')
.post(passport.authenticate("local"), async (req, res) => {
    try {    
        console.log("Logging in...")
        await professor.findOne({email: req.body.email})
        .then((professor) => {
            const token = Verify.getToken(professor);
            return res.status(200).send(token);
        });
    } catch(err) {
        console.log("Login failed.");
        return res.status(500).json(err);
    }
});

//Delete/Update a professor account
professorRouter.route("/:professorID")
.delete( async (req, res) => {
    console.log("Deleting professor account " + req.params.professorID);
    try {
        await professor.deleteOne({professorID: req.params.professorID})
        console.log("professor " + req.params.professorID + " deleted.")
        return res.status(200);
    } catch(err) {
        console.log("Deletion failed.");
        return res.status(500).json(err);
    }
})
.put( async (req, res) => {
    console.log("Updating professor account " + req.params.professorID);
    try {
        await professor.findOne({email: req.body.email})
        .then((professor) => {
            if(req.body.email != null) { professor.email = req.body.email }
            if(req.body.firstName != null) { professor.firstName = req.body.firstName }
            if(req.body.lastName != null) { professor.lastName = req.body.lastName }
            if(req.body.password != null) { professor.password = req.body.password }
        })
    } catch(err) {
        console.log("Update failed.");
        return res.status(500).json(err);
    }
});

//Get all professor's courses/Add professor to course
professorRouter.route("/courses")
.get( async (req, res) => {
    console.log("Getting all courses...");
    const courses = professor.course;
    
    try {    

        res.status(200).json(courses);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Get specific course
professorRouter.route("/courses/:courseID")
.get( async (req, res) => {
    console.log("Getting course with ID: " + req.params.courseID)
    const courses = professor.course;
    const courseId = req.params.courseID;
    
    try {    

        const course = courses.findbyId(courseId);
        res.status(200).json(course);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})