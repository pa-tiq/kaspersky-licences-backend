const express = require("express");
const licencesController = require("../controllers/licences_controller");
const router = express.Router();

router.get("/183", licencesController.getLicences183); 
router.get("/184", licencesController.getLicences184); 

module.exports = router;