import express from 'express'
import path from 'path'

const router = express.Router()
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function(req, res) {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/members", isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, "../public/members.html"));
});

module.exports = router
