router = require('express').Router();
const store = require('../db/store');

router.get('/notes', (req, res) => {
    res.json(store.getNotes());
});

router.post('/notes', (req, res) => {
    const note = req.body;
    store.addNote(note);
    res.json(note);
});

module.exports = router;