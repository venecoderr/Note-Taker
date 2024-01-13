//creates router
const router = require('express').Router()

//Imports and implements notes router
const notesRouter = require('./notes');
router.use('/notes', notesRouter);

module.exports = router;