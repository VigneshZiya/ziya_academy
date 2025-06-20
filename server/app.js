require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const enquiryRoutes = require('./routes/enquiry.routes');

const app = express();

const allowedOrigins = [
  'https://vigneshziya.github.io',  
  'http://localhost:3000',         
  'http://127.0.0.1:5500',         
  'http://localhost:5500'          
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowedOrigin => 
      origin.startsWith(allowedOrigin) || 
      origin.includes(allowedOrigin)
    )) {
      return callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/enquiry', enquiryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});