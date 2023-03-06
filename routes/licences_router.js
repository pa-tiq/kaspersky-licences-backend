const express = require("express");
const licencesController = require("../controllers/licences_controller");
const router = express.Router();

router.get("/183", licencesController.get183Licences); 
router.get("/184", licencesController.get184Licences); 

module.exports = router;