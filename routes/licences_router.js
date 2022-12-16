const express = require("express");
const licencesController = require("../controllers/licences_controller");
const router = express.Router();

router.get("/licences", licencesController.getLicences); // GET /licences/

module.exports = router;