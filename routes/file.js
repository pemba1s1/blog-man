const upload = require("../middleware/upload");
const auth = require('./../middleware/authentication')
const express = require("express");
const router = express.Router();
const {getFile,deleteFile,uploadFile} = require('./../controllers/file')


router.post("/upload", auth,upload.single("file"),uploadFile );
router.get("/:id",  getFile);
router.delete("/:id",  auth,deleteFile);

module.exports = router;
