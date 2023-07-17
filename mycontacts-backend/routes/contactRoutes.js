// routes file
const express = require("express");
const router = express.Router();
const {getContacts, getContact, createContact, updateContact, deleteContacts} = require("../controllers/contactController");
const { validate } = require("../models/userModel");
const validation = require("../middleware/validateTokenHandler");

router.use(validation)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContacts);

module.exports = router;
