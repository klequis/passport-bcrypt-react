import db from '../models'
import express from 'express'
import passport from '../config/passport'

const router = express.Router()

router.get('/test', function(req, res) {
  console.log('**** api/test ****')
  res.json('/test')
})

router.post("/login", passport.authenticate("local"), function(req, res) {
  console.log('**** /api/login ****')
  res.json("/members");
});

router.post("/signup", function(req, res) {
  console.log('**** /api/signup ****')
  console.log(req.body);
  db.User.create({
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    res.redirect(307, "/api/login");
  }).catch(function(err) {
    console.log(err);
    res.json(err);
  });
});

router.get("/logout", function(req, res) {
  console.log('**** /api/logout ****')
  req.logout();
  res.redirect("/");
});

router.get("/user_data", function(req, res) {
  console.log('**** /api/user_data ****')
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  }
  else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;
