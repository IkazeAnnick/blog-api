require('dotenv').config(); 

const app = require('./app');
const config = require('./config/default.json');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


