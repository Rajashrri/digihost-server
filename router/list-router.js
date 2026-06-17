const express = require("express");

const router = express.Router();

const {

  getContacts
 
} = require("../controllers/list-controller");

router.get("/contacts", getContacts);

module.exports = router;
