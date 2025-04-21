import app from './app.js';
import mongoose from 'mongoose';
import config from 'config';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
