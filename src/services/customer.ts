import { faker } from '@faker-js/faker';
import { client } from '../common/infrastructure/mongo.client';
import { customerCollectionName, dbName } from '../common/config/mongo-config';

/**
 * Generates new customers in the `customers` collection.
 */
export async function generateCustomers() {
  const db = client.db(dbName);
  const collection = db.collection(customerCollectionName);

  setInterval(async () => {
    const customers = Array.from({
      length: faker.number.int({ min: 1, max: 10 }),
    }).map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      address: {
        line1: faker.location.streetAddress(),
        line2: faker.location.secondaryAddress(),
        postcode: faker.location.zipCode(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.countryCode(),
      },
      createdAt: new Date(),
    }));

    try {
      await collection.insertMany(customers);
      console.log(`Inserted ${customers.length} customers`);
    } catch (err) {
      console.error('Error inserting customers:', err);
    }
  }, 1000);
}
