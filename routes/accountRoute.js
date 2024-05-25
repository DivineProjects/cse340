// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidation = require("../utilities/account-validation")


// Route to build Login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));
// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));
router.post("/register", 
    regValidation.registationRules(),
    regValidation.checkRegData, 
    utilities.handleErrors(accountController.registerAccount));


module.exports = router;