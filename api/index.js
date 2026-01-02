require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const pageRoutes = require('./routes/pages.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../templates')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.use('/', pageRoutes);
app.use('/', authRoutes);

// For Vercel
module.exports = app;

// For local testing
// app.listen(port, () => console.log(`Server running on ${port}`));
