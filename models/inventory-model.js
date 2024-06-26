const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}


// {
  /* ***************************
 *  Get one inventory item and classification_name by classification_id
 * ************************** */
async function getInventoryBySingleViewId(singleView_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.inv_id = $1`,
      [singleView_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryBySingleViewId error " + error)
  }
}
// }
  


/* *****************************
*   Add New Classification
* *************************** */
async function addClassification(classification_name){
  // console.log('inside add classifications' + classification_name.classificationName)
  try {
    const sql = "INSERT INTO classification(classification_name)  VALUES ($1)"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return error.message
  }
}


/* **********************
 *   Check if Classification Exists
 * ********************* */
async function checkExistingClassification(classification_name){
  try {
    // console.log("inside models,")
    // console.log(classification_name)
    const sql = "SELECT * FROM classification WHERE classification_name = $1"
    const class_name = await pool.query(sql, [classification_name])
    return class_name.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Add Inventory
* *************************** */
async function addInventoryData(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id){
  try {
    const sql = "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
  } catch (error) {
    return error.message
  }
}




module.exports = {getClassifications, getInventoryByClassificationId, getInventoryBySingleViewId, addClassification, checkExistingClassification, addInventoryData};