const express = require('express');
const Superhero = require('../models/db');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    const imageUrls = req.files ? req.files.map(file => `http://localhost:3000/uploads/${file.filename}`) : [];

    const newSuperhero = {
      ...req.body,
      superpowers: JSON.parse(req.body.superpowers),
      catchPhrases: JSON.parse(req.body.catchphrases),
      images: imageUrls,
    };
    

    const superhero = await Superhero.create(newSuperhero);
    console.log(superhero);
    res.status(201).json(superhero); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const superheroes = await Superhero.findAll(
      {
        order: [['createdAt', 'ASC']],
      }
    );
    res.json(superheroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const superhero = await Superhero.findOne({ where: { id } });

    if (!superhero) {
      return res.status(404).json({ message: 'Superhero not found' });
    }

    const newImages = req.files ? req.files.map(file => `http://localhost:3000/uploads/${file.filename}`) : [];

    const updatedData = {
      nickname: req.body.nickname || superhero.nickname,
      realName: req.body.realName || superhero.realName,
      originDescription: req.body.originDescription || superhero.originDescription,
      superpowers: req.body.superpowers ? req.body.superpowers.split(',') : superhero.superpowers,
      catchPhrases: req.body.catchPhrases ? req.body.catchPhrases.split(',') : superhero.catchPhrases,
      images: [...superhero.images, ...newImages], 
    };

    await Superhero.update(updatedData, { where: { id } });
    const updatedSuperhero = await Superhero.findOne({ where: { id } });

    res.json(updatedSuperhero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Superhero.destroy({ where: { id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Superhero not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
