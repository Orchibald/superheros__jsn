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

// router.post('/', async (req, res) => {
//   try {
//     const imageUrls = req.files 
//       ? req.files.map(file => `http://localhost:3000/uploads/${file.filename}`) 
//       : [];

//     const superpowers = JSON.parse(req.body.superpowers || '[]');
//     const catchphrases = JSON.parse(req.body.catchphrases || '[]');

//     console.log(superpowers)
//     console.log(catchphrases)
//     console.log(imageUrls)

//     const newSuperhero = {
//       ...req.body,
//       superpowers, 
//       catchphrases, 
//       images: imageUrls, 
//     };

//     console.log(newSuperhero);

//     // const superhero = await Superhero.create(newSuperhero);
//     const superhero = await Superhero.create(JSON.parse(newSuperhero));

//     res.status(201).json(superhero); 
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });


router.get('/', async (req, res) => {
  try {
    const superheroes = await Superhero.findAll();
    res.json(superheroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Superhero.update(req.body, { where: { id } });

    if (updated) {
      const updatedSuperhero = await Superhero.findOne({ where: { id } });
      res.json(updatedSuperhero);
    } else {
      res.status(404).json({ message: 'Superhero not found' });
    }
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
