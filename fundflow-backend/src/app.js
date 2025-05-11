// import express from 'express';
// import bodyParser from 'body-parser'; // Fix CommonJS import
// import cors from 'cors';
// import 'dotenv/config'; // Replaces require('dotenv').config()
// import connectMongo from './config/mongo.js';
// import swaggerDocument from '../swagger.json' assert { type: 'json' };
// import { serve, setup } from 'swagger-ui-express';

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Connect MongoDB
// connectMongo();

// // Dynamically import routes
// import authRoutes from './routes/auth.js';
// import customerRoutes from './routes/customer.js';
// import loanRoutes from './routes/loan.js';

// app.use('/api/auth', authRoutes);
// app.use('/api/customers', customerRoutes);
// app.use('/api/loans', loanRoutes);

// // Swagger Docs
// app.use('/api-docs', serve, setup(swaggerDocument));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Backend started on port ${PORT}`));

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import customerRoutes from './routes/customer.js'
import loanRoutes from './routes/loan.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/customers', customerRoutes); 
app.use('/loans', loanRoutes);  

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Backend started on port ${process.env.PORT}`);
});
