const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/timestamp/:unix', (req, res) => {
  const { unix } = req.params;
  const date = new Date(parseInt(unix));
  if (!isNaN(date.getTime())) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    res.json({ error: 'Invalid date' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
