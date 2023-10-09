const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  if (!dateParam) {
    dateParam = new Date();
  } else {
    const date = new Date(dateParam);

    if (!isNaN(date.getTime())) {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
      return;
    } else {
      res.json({ error: 'Invalid Date' });
      return;
    }
  }

  res.json({
    unix: Date.now(),
    utc: new Date().toUTCString(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});