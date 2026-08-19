import { Account, Client, Databases, Storage } from "appwrite";
export const isAppwriteConfigured = Boolean(
  import.meta.env.VITE_APPWRITE_ENDPOINT &&
  import.meta.env.VITE_APPWRITE_PROJECT_ID,
);
export const client = new Client();
if (isAppwriteConfigured)
  client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const appwriteConfig = {
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  collectionId: import.meta.env.VITE_APPWRITE_ONBOARDING_COLLECTION_ID,
  bucketId: import.meta.env.VITE_APPWRITE_MEDIA_BUCKET_ID,
};
