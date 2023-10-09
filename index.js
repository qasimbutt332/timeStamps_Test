const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  // If dateParam is empty, use the current time
  if (!dateParam) {
    dateParam = new Date();
  } else {
    // Try to parse the dateParam
    const date = new Date(dateParam);

    // Check if the parsed date is valid
    if (!isNaN(date.getTime())) {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
      return;
    } else {
      // If the date is invalid, return an error
      res.json({ error: 'Invalid Date' });
      return;
    }
  }

  // If everything else fails, return the current time
  res.json({
    unix: Date.now(),
    utc: new Date().toUTCString(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
