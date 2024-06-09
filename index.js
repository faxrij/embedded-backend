const express = require('express');
const cors = require('cors');
const { Info } = require('./models');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const validateData = (req, res, next) => {
  const { tempereture, humidity, light, su_nemi, motor_run } = req.query;

  if (!tempereture || !humidity || !light || !su_nemi || !motor_run) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  if (isNaN(parseFloat(tempereture)) || isNaN(parseFloat(humidity)) || isNaN(parseFloat(light)) || isNaN(parseFloat(su_nemi)) 
    || isNaN(parseFloat(motor_run))) {
    return res.status(400).json({ error: 'Invalid data format. All parameters must be of type FLOAT' });
  }

  next();
};

app.get('/api/sensordata', validateData, async (req, res) => {
  const { tempereture, humidity, light, su_nemi, motor_run } = req.query;

  try {
    const newEntry = await Info.create({ tempereture, humidity, light, su_nemi, motor_run });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: 'Error saving data' });
  }
});

app.get('/api/sensordata/closest', async (req, res) => {
  try {
      const closestEntry = await Info.findOne({
          order: [
              ['createdAt', 'DESC']
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
