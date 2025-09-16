const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const authenticate = require('../middleware/authenticate');

// Get all contacts for logged user
router.get('/', authenticate, async (req, res) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Create contact
router.post('/', authenticate, async (req, res) => {
  const contact = new Contact({ ...req.body, owner: req.user._id });
  await contact.save();
  res.status(201).json(contact);
});

// Update contact
router.put('/:id', authenticate, async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    req.body,
    { new: true }
  );
  res.json(contact);
});

// Delete contact
router.delete('/:id', authenticate, async (req, res) => {
  await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  res.sendStatus(204);
});

module.exports = router;