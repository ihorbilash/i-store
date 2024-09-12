import dotenv from 'dotenv';

dotenv.config();

export const dbUri = process.env.DB_URI!;
export const port = process.env.PORT || 3000;
export const dbName = 'storeDB';
export const customerCollectionName = 'customers';
export const anonymizedCollectionName = 'customers_anonymised';