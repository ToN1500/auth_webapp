require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("✅ Backend Server is Running!");
});

app.use('/api/auth', require('./routes/api/auth'));

app.listen(port, () => {
  console.log(`✅ Server running: http://localhost:${port}`);
});
