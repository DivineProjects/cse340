const utilities = require("../utilities/")
const errorController = {}

errorController.builError = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Error 505", nav})
}

module.exports = errorController