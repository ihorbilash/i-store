

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

















// import express from 'express';
// import { MongoClient } from 'mongodb';
// import { faker } from '@faker-js/faker';
// import dotenv from 'dotenv';
// import { startPollingService } from './anonymizeService';

// dotenv.config();

// const app = express();
// const port = 3000;
// const dbUri = process.env.DB_URI!;
// const client = new MongoClient(dbUri);
// const dbName = 'storeDB';
// const customerCollectionName = 'customers';

// async function connectDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//   }
// }

// async function generateCustomers() {
//   const db = client.db(dbName);
//   const collection = db.collection(customerCollectionName);

//   setInterval(async () => {
//     const customers = Array.from({
//       length: faker.number.int({ min: 1, max: 10 }),
//     }).map(() => ({
//       firstName: faker.person.firstName(),
//       lastName: faker.person.lastName(),
//       email: faker.internet.email(),
//       address: {
//         line1: faker.location.streetAddress(),
//         line2: faker.location.secondaryAddress(),
//         postcode: faker.location.zipCode(),
//         city: faker.location.city(),
//         state: faker.location.state(),
//         country: faker.location.countryCode(),
//       },
//       createdAt: new Date(),
//     }));

//     try {
//       await collection.insertMany(customers);
//       console.log(`Inserted ${customers.length} customers`);
//     } catch (err) {
//       console.error('Error inserting customers:', err);
//     }
//   }, 1000);
// }

// app.listen(port, async () => {
//   console.log(`Server running on ${port} port`);
//   await connectDB();
//   generateCustomers();
//   startPollingService(client);
// //   startAnonymizationService(client);
// });
