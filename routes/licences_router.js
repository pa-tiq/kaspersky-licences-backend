const express = require("express");
const licencesController = require("../controllers/licences_controller");
const router = express.Router();

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

router.get("/183", nocache, licencesController.get183Licences); 
router.get("/184", nocache, licencesController.get184Licences); 

module.exports = router;