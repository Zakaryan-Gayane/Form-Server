import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const cors = require('cors');
const ejs = require('ejs');
import dotenv from 'dotenv';
import { UserRoute } from './routes/userRoute';

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', UserRoute);
app.set('view engine', 'ejs')

mongoose.connect(process.env.MONGODB_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
