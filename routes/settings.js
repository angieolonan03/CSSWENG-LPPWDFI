const express = require("express");
const path = require("path");
const router = express.Router();

//GET login page.
router.get("/", function (req, res) {
    res.sendFile(path.resolve('./views/settings.html'));
});

module.exports = router;