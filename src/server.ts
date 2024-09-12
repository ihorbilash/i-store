

import express from 'express';
import { port } from './common/config/mongo-config';
import { connectDB } from './common/infrastructure/mongo.client';
import { generateCustomers } from './services/customer';
import { startPollingService } from './services/anonimization';

const app = express();



app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await connectDB();
  generateCustomers();
  startPollingService();
});