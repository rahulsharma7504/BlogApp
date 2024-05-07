const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_URL}Blogs`).then(() => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));

// Import the userRoute
const userRoute = require('./Routes/UserRoutes');

// Mount the userRoute
app.use('/api/users', userRoute);

// For Blog Posts
const Posts = require('./Routes/PostRoutes');
app.use('/api/post', Posts);
//Statics Files and Images

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});