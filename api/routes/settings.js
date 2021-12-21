const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth.middleware");
const Settings = require("../models/settings");
/* const User = require("../models/users"); */
/* const { body, validationResult } = require("express-validator"); */

module.exports = router;
