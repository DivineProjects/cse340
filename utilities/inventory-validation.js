const utilities = require(".")
const {body, validationResult} = require("express-validator")
const validate = {}
const inventoryModel = require("../models/inventory-model")

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
validate.classificationRules = () => {
    return [
      // classification_name is required and must be string and numbers
      body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a Classification name.") // on error this message is sent.
        .custom(async (classification_name)=>{
          const classificationExist = await inventoryModel.checkExistingClassification(classification_name)
          if (classificationExist){
            throw new Error("Inventory Classification exists. Please use different classification")
          }
        }),

    ]
  }


  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const className = req.body
  const classification_name = className.classificationName
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}



module.exports = validate
