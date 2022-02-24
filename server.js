//#region COMMENT HEADER
/*  Author: JASA team
    Date: Feb 24, 2022
    Title: Online-pharmacy
    Version:
        1.0.0 - Feb 24, 2022 - Anna - Initial Version
*/
//#endregion

//#region Server Setup
var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;

require('dotenv').config();

function OnHttpStart(){
    console.log("Express server started on port: " + HTTP_PORT);
}

app.use(express.static("views"));
app.use(express.static("public"));

const {engine} = require("express-handlebars");
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
//#endregion

//#region Routes

//#region GeneralPages
app.get("/", (req, res) => {res.render("home", {layout: false});});
app.get("/about", (req, res) => {res.render("about", {layout: false});});
app.get("/contacts", (req, res) => {res.render("contacts", {layout: false});});
app.get("/terms", (req, res) => {res.render("terms", {layout: false});});
app.get("/prpolicy", (req, res) => {res.render("prpolicy", {layout: false});});
app.get("/reviews", (req, res) => {res.render("reviews", {layout: false});});
app.get("/articles", (req, res) => {res.render("articles", {layout: false});});
//#endregion

//#region Authentication
app.get("/login", (req, res) => {res.render("login", {layout: false});});
app.get("/logout", (req, res) => {
    // todo logout stuff
    res.redirect("/");
});
//#endregion

//#region AuthorizedUsers
//#endregion

//#region AdminPages
//#endregion

//#endregion

//#region Custom Functions and Startup
app.listen(HTTP_PORT, OnHttpStart);
//#endregion