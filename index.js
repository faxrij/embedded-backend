const express = require('express');
const { Info } = require('./models');

const app = express();
const port = 3000;

app.use(express.json());

const validateData = (req, res, next) => {
  const { isik, nem, sicaklik } = req.query;

  if (!isik || !nem || !sicaklik) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  if (isNaN(parseFloat(isik)) || isNaN(parseFloat(nem)) || isNaN(parseFloat(sicaklik))) {
    return res.status(400).json({ error: 'Invalid data format. All parameters must be of type FLOAT' });
  }

  next();
};

app.post('/', validateData, async (req, res) => {
  const { isik, nem, sicaklik } = req.query;

  try {
    const newEntry = await Info.create({ isik, nem, sicaklik });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Error saving data' });
  }
});

app.get('/closest', async (req, res) => {
  try {
      const closestEntry = await Info.findOne({
          order: [
              ['created_date', 'DESC']
          ],
          limit: 1
      });

      if (!closestEntry) {
          return res.status(404).json({ error: 'No entry found' });
      }

      res.status(200).json(closestEntry);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/', async (req, res) => {
  try {
    const infos = await Info.findAll();
    res.status(200).json(infos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
