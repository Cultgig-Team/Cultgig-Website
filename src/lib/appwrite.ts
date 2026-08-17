import { Account, Client, Databases, ID, Storage } from 'appwrite';

const ready = Boolean(import.meta.env.VITE_APPWRITE_ENDPOINT && import.meta.env.VITE_APPWRITE_PROJECT_ID);
const client = new Client();
if (ready) client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const config = { database: import.meta.env.VITE_APPWRITE_DATABASE_ID, collection: import.meta.env.VITE_APPWRITE_ONBOARDING_COLLECTION_ID, bucket: import.meta.env.VITE_APPWRITE_MEDIA_BUCKET_ID };

export async function sendOtp(email: string) {
  if (!ready) return { userId: 'demo-user', demo: true };
  const token = await account.createEmailToken({ userId: ID.unique(), email });
  return { userId: token.userId, demo: false };
}
export async function verifyOtp(userId: string, secret: string, demo: boolean) {
  if (demo) { if (secret !== '123456') throw new Error('For this preview, enter 123456.'); return; }
  await account.createSession({ userId, secret });
}
export async function upload(file: File) {
  if (!ready || !config.bucket) return URL.createObjectURL(file);
  const result = await storage.createFile({ bucketId: config.bucket, fileId: ID.unique(), file });
  return storage.getFileView({ bucketId: config.bucket, fileId: result.$id }).toString();
}
export async function saveProfile(data: Record<string, unknown>) {
  if (!ready || !config.database || !config.collection) return;
  await databases.createDocument({ databaseId: config.database, collectionId: config.collection, documentId: ID.unique(), data });
}
