// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const classficationValidate = require('../utilities/inventory-validation')


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory by single view
router.get("/detail/:singleViewId", invController.buildBySingleViewId);

// router to build management view
router.get("/management", utilities.handleErrors(invController.buildManagement));

// router to build add-classification
router.get("/add-classification", utilities.handleErrors(invController.buildClassification));
router.post(
    "/add-classification", 
    classficationValidate.classificationRules(),
    classficationValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification));

// router to build add inventory
router.get("/add", utilities.handleErrors(invController.buildAddInventory));


module.exports = router;
