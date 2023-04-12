const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Verify = require("./verify");
const passport = require("passport");

// Login
router.post("/login", passport.authenticate("local"), async (req, res) => {
    await User.findOne({email: req.body.email}).then((user) => {
        // Store userId in browser
        // localStorage.setItem(userId, user._id.toString());

        const token = Verify.getToken(user);
        return res.status(200).send(token);
    });
});

// Logout
router.post("/logout", async (req, res) => {
    req.logout();
    res.send({message: "Successfully logged out"});
});

// Get Accounts
router.get("/get-accounts", async (req, res) => {
    console.log("Get all users");
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create Account
router.post("/create-account", async (req, res) => {
    console.log("creating a new account");
    console.log(req.body);

    await User.register(new User({email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName}), req.body.password).then((user) => {
        passport.authenticate("local")(req, res, () => {
            const token = Verify.getToken(user);
            return res
            .status(200)
            .header("x-access-token", token)
            .header("access-control-expose-headers", "x-access-token")
            .send(user);
        })
    });
});