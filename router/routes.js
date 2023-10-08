const express = require('express')
const router = express.Router();
const multer = require('multer')
const upload = require('../multerConfig/multerInfo')

const invalid = require("../controllers/invalid")
const signin = require("../controllers/signin");
const signup = require('../controllers/signup');
const getNotes = require('../controllers/getNotes');
const getDeletedNotes = require('../controllers/getDeletedNotes');
const newNote = require('../controllers/newNote');
const deleteNote = require('../controllers/deleteNote');
const trashNote = require('../controllers/trashNote');
const restoreNote = require('../controllers/restoreNote');
const updateNote = require('../controllers/updateNote');
const dashboardUpdate = require('../controllers/dashboardUpdate');

router.route("/notes").get(invalid).post(getNotes).put(invalid).delete(invalid)
router.route("/deletedNotes").get(invalid).post(getDeletedNotes).put(invalid).delete(invalid)
router.route("/deleteNote").get(invalid).post(invalid).put(invalid).delete(deleteNote)
router.route("/trashNote").get(invalid).post(invalid).put(invalid).delete(trashNote)
router.route("/restoreNote").get(invalid).post(restoreNote).put(invalid).delete(invalid)
router.route("/updateNote").get(invalid).post(invalid).put(updateNote).delete(invalid)
router.route("/newNote").get(invalid).post(newNote).put(invalid).delete(invalid)
router.route("/signin").get(invalid).post(signin).put(invalid).delete(invalid)
router.route("/signup").get(invalid).post(signup).put(invalid).delete(invalid)
router.route("/dashboard").get(invalid).post(upload.single('photo'),dashboardUpdate).put(invalid).delete(invalid)
router.route("*").get(invalid).post(invalid).put(invalid).delete(invalid)

module.exports = router;