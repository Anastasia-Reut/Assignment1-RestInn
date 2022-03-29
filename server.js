//#region COMMENT HEADER
/*  Author: JASA team
    Date: Feb 24, 2022
    Title: Online-pharmacy
    Version:
        1.0.0 - Feb 24, 2022 - Anna - Initial Version
        1.0.1 - Mar 9, 2022 - Anastasia, Jay, Anna - more pages added
        1.0.2 - Mar 22, 2022 - Anna - Login staff added (without DB)
        1.0.3 - Mar 23, 2022 - Anna - Login staff added (with mongoDB)
        1.0.4 - Mar 24, 2022 - Anna - Product listing, delete/add/edit product, Profile edit
        1.0.5 - Mar 24, 2022 - Anastasia - CSS updated (without log in)
        1.0.5 - Mar 29, 2022 - Anastasia - CSS updated (log in, profile, cart, product listing)
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
const ProductModel = require("./models/ProductModel.js");
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
app.get("/productListing", (req, res) => {
    ProductModel.find()
        .lean()
        .exec()
        .then((products) => {
            res.render("productListing", {products: products, hasProducts: !!products.length, user: req.session.user, layout: false});
        })
    
});
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
    
    UserModel.updateOne({login_id: login_id}, {
        $set: {
            login_id: login_id,
            email: email,
            isAdmin: isAd,
            isDoctor: isDoc,
            user_first_name: user_first_name,
            user_last_name: user_last_name,
            dob: dob,
            phone: phone,
            user_address: user_address,
            doctor_license_no: doctor_license_no,
            ohip_no: ohip_no,
            user_prescription: user_prescription
        }
    })
    .exec()
    .then(() => {
        req.session.user = {
            login_id: login_id,
            email: email,
            isAdmin: isAd,
            isDoctor: isDoc,
            user_first_name: user_first_name,
            user_last_name: user_last_name,
            dob: dob,
            phone: phone,
            user_address: user_address,
            doctor_license_no: doctor_license_no,
            ohip_no: ohip_no,
            user_prescription: user_prescription        
        };
        res.redirect("/profile");
    })   
});        



app.get("/cart", (req, res) => {res.render("cart", {user: req.session.user, layout: false});});
app.get("/checkout", (req, res) => {res.render("checkout", {user: req.session.user, layout: false});});
//#endregion

//#region AdminPages
app.get("/admin/dashboard", ensureAdmin, (req, res) => {
    res.render("adminDashboard", {user: req.session.user, layout: false});});

//add new product
app.get("product/edit", ensureAdmin, (req, res) => {
    res.render("productEdit", {user: req.session.user, layout: false});
})

//edit existing product
app.get("product/edit/:productID", ensureAdmin, (req, res) => {
    const productID = req.params.productID;
    ProductModel.findOne({product_id: productID})
        .lean()
        .exec()
        .then((product) => {
            res.render("productEdit", {user: req.session.user, product: product, layout: false})
        .catch(() => {});
        });    
});

app.post("product/edit", ensureAdmin, (req, res) => {
    const product = new ProductModel({
        product_id: req.body.product_id,
        product_description: req.body.product_description,
        available_stock: req.body.available_stock,
        price: req.body.price,
        is_prescribed: req.body.is_prescribed,
        product_category_id: req.body.product_category_id,
        product_category_description: req.body.product_category_description,
        product_detail: req.body.product_detail,
        product_images_construct: req.body.product_images_construct
    });
    if (req.body.edit === "1"){
        //edit product
        ProductModel.updateOne({product_id: product.product_id},{
            $set: {
                product_id: product.product_id,
                product_description: product.product_description,
                available_stock: product.available_stock,
                price: product.price,
                is_prescribed: product.is_prescribed,
                product_category_id: product.product_category_id,
                product_category_description: product.product_category_description,
                product_detail: product.product_detail,
                product_images_construct: product.product_images_construct
            }
        })
        .exec()
        .then((err) => {
            res.redirect("/productListing");
        });
    }
    else {
        //add
        product.save((err) => {
            res.redirect("/productListing");
        });
    }
});

app.get("product/delete/:productID", ensureAdmin, (req, res) => {
    const productID = req.params.productID;
    ProductModel.deleteOne({product_id: productID})
        .then((err) => {
            res.render("productListing");
        });    
});
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