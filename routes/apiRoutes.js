const router = require('express').Router();
const store = require('../db/store');

router.get('/notes', (req, res) => {
    store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    const note = req.body;
    store.addNote(note); //calls addNote method from the store.js file.
    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
    store
      .removeNote(req.params.id) //calls the removeNote method from the store.js file.
      .then(() => res.json({ ok: true }))
      .catch((err) => res.status(500).json(err));
  });

module.exports = router;