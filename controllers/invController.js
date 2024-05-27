// Needed resources
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

// const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
async function buildByClassificationId(req, res, next) {
  const classification_id = req.params.classificationId // passed from the inventory.js line 8
  const data = await invModel.getInventoryByClassificationId(classification_id) //which is in the inventory-model file The function "awaits" the data to be returned, and the data is stored in the data variable.
  const grid = await utilities.buildClassificationGrid(data) // 
  let nav = await utilities.getNav()
  const className = data[0].classification_name // xtracts the name of the classification, which matches the classification_id
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by single view
 * ************************** */
async function buildBySingleViewId (req, res, next) {
  const singleView_id = req.params.singleViewId // passed from the inventory.js line 11
  const data = await invModel.getInventoryBySingleViewId(singleView_id) //which is in the inventory-model file The function "awaits" the data to be returned, and the data is stored in the data variable.
  const grid = await utilities.buildSingleViewGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].inv_make
  const classModel = data[0].inv_model
  const classYear = data[0].inv_year
  res.render("./inventory/singleview", {
    title: classYear + ' ' + className + ' ' + classModel,
    nav,
    grid,
  })
}

/* ****************************************
*  Bulid Management view
* *************************************** */
async function buildManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Management",
    nav,
  })
}


/* ****************************************
*  Bulid Management view
* *************************************** */
async function buildClassification(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Add Classification view
* *************************************** */
async function addClassification(req, res) {
  let nav = await utilities.getNav()
  const classificationHTML  = req.body
  const classification_name = classificationHTML.classificationName
  const addClass = await invModel.addClassification(
    classification_name
  )

  if (addClass) {
    req.flash(
      "notice",
      `Congratulations, New Classification ${ classification_name } addClassification`
    )
    res.status(201).render("./inventory/management", {
      title: "Management",
      nav,
    errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the classification entry failed.")
    res.status(501).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  }
}

/* ****************************************
*  Deliver Add Inventory View
* *************************************** */
async function buildAddInventory(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add", {
    title: "Add Inventory",
    nav,
  })
}

/* ****************************************
*  Add Inventrory Controller
* *************************************** */
async function addInventory(req, res) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

  const addInv = await invModel.addInventoryData(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )

  if (addInv) {
    req.flash(
      "notice",
      `Congratulations, data added sucessfully.`
    )
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, dataentry failed.")
    res.status(501).render("inventory/add", {
      title: "Add Inventory",
      nav,
    })
  }
}

// module.exports = invCont
module.exports = {buildByClassificationId, buildBySingleViewId, buildManagement, addClassification, buildClassification, buildAddInventory, addInventory}

