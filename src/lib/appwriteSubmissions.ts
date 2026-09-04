import { ID } from "appwrite";
import { appwriteConfig, databases, isAppwriteConfigured } from "./appwrite";
export type LeadSubmission = Record<string, string> & {
  role: "artist" | "business";
  createdAt: string;
};

export async function saveLead(data: LeadSubmission) {
  if (!isAppwriteConfigured) return;
  if (!appwriteConfig.databaseId || !appwriteConfig.collectionId)
    throw new Error("Early access is temporarily unavailable.");
  await databases.createDocument({
    databaseId: appwriteConfig.databaseId,
    collectionId: appwriteConfig.collectionId,
    documentId: ID.unique(),
    data,
  });
}
