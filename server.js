// Requiring necessary npm middleware packages
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from './config/passport'
import apiRoutes from './routes/api-routes'
import htmlRoutes from './routes/html-routes'
//
// Setting up port
const PORT = process.env.PORT || 8080;
// Import the models folder and require syncing
const db = require("./models")
//
// Creating express app and configuring middleware
//needed to read through our public folder
const app = express();
app.use(bodyParser.urlencoded({extended: false})); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep rack of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//
// Requiring our routes
// require("./routes/html-routes")(app);
app.use('/', htmlRoutes)
// require("./routes/api-routes.js")(app);
app.use('/api', apiRoutes)
//
//this will listen to and show all activities on our terminal to
//let us know what is happening in our app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
})
