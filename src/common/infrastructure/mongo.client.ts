import { MongoClient } from 'mongodb';
import { dbUri } from '../config/mongo-config';

export const client = new MongoClient(dbUri);

export async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

