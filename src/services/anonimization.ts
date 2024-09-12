
import crypto from 'crypto';
import { anonymizedCollectionName, customerCollectionName, dbName } from '../common/config/mongo-config';
import { client } from '../common/infrastructure/mongo.client';


/**
 * transforms an email into an anonymized version
 * @param email 
 * @returns resulting anonymized email
 */
function anonymizeEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  const anonymizedLocalPart = anonymizeString(localPart);
  return `${anonymizedLocalPart}@${domain}`;
}

/**
 * transforms a string into an anonymized version
 * @param value 
 * @returns resulting anonymized string
 */
function anonymizeString(value: string): string {
  return crypto.createHash('md5').update(value).digest('hex').substring(0, 8);
}

function anonymizeDocument(doc: any): any {
  const anonymizedDoc = {
    ...doc,
    firstName: anonymizeString(doc.firstName),
    lastName: anonymizeString(doc.lastName),
    email: anonymizeEmail(doc.email),
    address: {
      ...doc.address,
      line1: anonymizeString(doc.address.line1),
      line2: anonymizeString(doc.address.line2),
      postcode: anonymizeString(doc.address.postcode),
      city: doc.address.city,
      state: doc.address.state,
      country: doc.address.country,
    },
  };
  return anonymizedDoc;
}


/**
 * Starts polling the database for new customers and anonymizes them.
 */
export async function startPollingService() {
    const db = client.db(dbName);
    const customersCollection = db.collection(customerCollectionName);
    const customersAnonymizedCollection = db.collection(anonymizedCollectionName);
  
    setInterval(async () => {
      const customers = await customersCollection.find({}).toArray();
      for (const customer of customers) {
        const anonymizedDocument = await anonymizeDocument(customer);
        await customersAnonymizedCollection.updateOne(
          { _id: anonymizedDocument._id },
          { $set: anonymizedDocument },
          { upsert: true }
        );
      }
      console.log(' Anonymized documents updated');
    }, 1000); 
  }


