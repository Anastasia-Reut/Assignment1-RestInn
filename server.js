//#region COMMENT HEADER
/*  Author: JASA team
    Date: Feb 24, 2022
    Title: Online-pharmacy
    Version:
        1.0.0 - Feb 24, 2022 - Anna - Initial Version
        1.0.1 - Mar 9, 2022 - Anastasia, Jay, Anna - more pages added
        1.0.2 - Mar 22, 2022 - Anna - Login staff added (without DB)
        1.0.3 - Mar 23, 2022 - Anna - Login staff added (with mongoDB)
*/
//#endregion

//#region Server Setup
var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;

require('dotenv').config();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

function OnHttpStart(){
    console.log("Express server started on port: " + HTTP_PORT);
}

app.use(express.static("views"));
app.use(express.static("public"));

const {engine} = require("express-handlebars");
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

const clientSessions = require("client-sessions");
app.use(clientSessions({
    cookieName: "session",
    secret: "cap805_project",
    duration: 2*60*1000,
    activeDuration: 1000*60*60
}));

//const uri = process.env.MONGODB_URI;

//database connections
const mongoose = require("mongoose");
const UserModel = require("./models/UserModel.js");
mongoose.connect(process.env.DBCONN, {useUnifiedTopology: true});

//#endregion

//#region Routes

//#region GeneralPages
app.get("/", (req, res) => {res.render("home", {user: req.session.user, layout: false});});
app.get("/about", (req, res) => {res.render("about", {user: req.session.user, layout: false});});
app.get("/contacts", (req, res) => {res.render("contacts", {user: req.session.user, layout: false});});
app.get("/terms", (req, res) => {res.render("terms", {user: req.session.user, layout: false});});
app.get("/prpolicy", (req, res) => {res.render("prpolicy", {user: req.session.user, layout: false});});
app.get("/reviews", (req, res) => {res.render("reviews", {user: req.session.user, layout: false});});
app.get("/articles", (req, res) => {res.render("articles", {user: req.session.user, layout: false});});
app.get("/product", (req, res) => {res.render("product", {user: req.session.user, layout: false});});
app.get("/productListing", (req, res) => {res.render("productListing", {user: req.session.user, layout: false});});
//#endregion

//#region Authentication
app.get("/login", (req, res) => {res.render("login", {user: req.session.user, layout: false});});
app.post("/login", (req, res) => {
    const login_id = req.body.login_id;
    const password = req.body.password;
    UserModel.findOne({login_id: login_id})
        .exec()
        .then((usr) => {
            if (!usr){
                //user not found
                res.render("login", {errorMsg: "Both fields are required!", user: req.session.user, layout: false});
            }
            else {
                //user found
                if (password == usr.password){
                    //password matches
                    req.session.user = {
                        login_id: usr.login_id,
                        email: usr.email,
                        isAdmin: usr.isAdmin,
                        isDoctor: usr.isDoctor,
                        user_first_name: usr.user_first_name,
                        user_last_name: usr.user_last_name,
                        dob: usr.dob,
                        phone: usr.phone,
                        user_address: usr.user_address,
                        doctor_license_no: usr.doctor_license_no,
                        ohip_no: usr.ohip_no,
                        user_prescription: usr.user_prescription
                    };
                    res.redirect("/dashboard");
                }
                else {
                    //password does not match
                    res.render("login", {errorMsg: "Password does not match", user: req.session.user, layout: false});
                }
            }
        })

});

app.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect("/");
});

app.get("/register", (req, res) => {res.render("register", {user: req.session.user, layout: false});});
app.get("/doctor_register", (req, res) => {res.render("doctor_register", {user: req.session.user, layout: false});});
app.get("/admin_register", (req, res) => {res.render("admin_register", {user: req.session.user, layout: false});});
app.get("/doctor_login", (req, res) => {res.render("doctor_login", {user: req.session.user, layout: false});});
app.get("/admin_login", (req, res) => {res.render("admin_login", {user: req.session.user, layout: false});});

//#endregion

//#region AuthorizedUsers
app.get("/dashboard", ensureLogin, (req, res) => {
    res.render("dashboard", {user: req.session.user, layout: false});});
app.get("/profile", ensureLogin, (req, res) => {
    res.render("profile", {user: req.session.user, layout: false});});    
app.get("/profile/edit", ensureLogin, (req, res) => {
    res.render("profileEdit", {user: req.session.user, layout: false});});   
app.post("/profile/edit", ensureLogin, (req, res) => {
    const login_id = req.body.login_id;
    const user_first_name = req.body.user_first_name;
    const user_last_name = req.body.user_last_name;
    const email = req.body.email;
    const isAdmin = req.body.isAdmin;
    const isDoctor = req.body.isDoctor;
    const dob = req.body.dob;
    const phone = req.body.phone;
    const user_address = req.body.user_address;
    const doctor_license_no = req.body.doctor_license_no;
    const ohip_no = req.body.ohip_no;
    const user_prescription = req.body.user_prescription;

    var isAd = false;
    if (isAdmin == "on") {isAd = true;}
    var isDoc = false;
    if (isDoctor == "on") {isDoc = true;}
    req.session.user = {
        login_id: usr.login_id,
        email: usr.email,
        isAdmin: isAd,
        isDoctor: isDoc,
        user_first_name: usr.user_first_name,
        user_last_name: usr.user_last_name,
        dob: usr.dob,
        phone: usr.phone,
        user_address: usr.user_address,
        doctor_license_no: usr.doctor_license_no,
        ohip_no: usr.ohip_no,
        user_prescription: usr.user_prescription        
    };
    res.redirect("/profile");
});        

app.get("/cart", (req, res) => {res.render("cart", {user: req.session.user, layout: false});});
app.get("/checkout", (req, res) => {res.render("checkout", {user: req.session.user, layout: false});});
//#endregion

//#region AdminPages
app.get("/admin/dashboard", ensureAdmin, (req, res) => {
    res.render("adminDashboard", {user: req.session.user, layout: false});});
//#endregion

//#region DoctorPages
app.get("/doctor/dashboard", ensureDoctor, (req, res) => {
    res.render("doctorDashboard", {user: req.session.user, layout: false});});

app.get("/doctor/prescription", ensureDoctor, (req, res) => {
    res.render("prescription", {user: req.session.user, layout: false});});

app.get("/doctor/prescriptions", ensureDoctor, (req, res) => {
    res.render("allPrescriptions", {user: req.session.user, layout: false});});
//#endregion

//#endregion

//#region Custom Functions and Startup
app.listen(HTTP_PORT, OnHttpStart);

function ensureLogin(req, res, next){
    if (!req.session.user){
        res.redirect("/login");
    }
    else{
        next();
    }
}

function ensureAdmin(req, res, next){
    if (!req.session.user.isAdmin){
        res.redirect("/login");
    }
    else{
        next();
    }
}

function ensureDoctor(req, res, next){
    if (!req.session.user.isDoctor){
        res.redirect("/login");
    }
    else{
        next();
    }
}

//#endregion

//heroku config:set MONGODB_URI="mongodb+srv://jasa_admin:senecaCAPproject@cluster0.j5nek.mongodb.net/fierce-eyrie-60970?retryWrites=true&w=majority"