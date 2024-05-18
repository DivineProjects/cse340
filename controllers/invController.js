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
  const classModel = data[0].inv_year
  res.render("./inventory/singleview", {
    title: classModel + ' ' + className,
    nav,
    grid,
  })
}

// module.exports = invCont
module.exports = {buildByClassificationId, buildBySingleViewId}

