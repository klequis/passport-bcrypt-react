import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from './config/passport'
import apiRoutes from './routes/api-routes'
import htmlRoutes from './routes/html-routes'

const PORT = process.env.PORT || 8080;

const db = require("./models")

const app = express();
app.use(bodyParser.urlencoded({extended: false})); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', htmlRoutes)
app.use('/api', apiRoutes)

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
})
