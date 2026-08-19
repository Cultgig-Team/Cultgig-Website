import { ID } from "appwrite";
import type { OnboardingSubmission } from "../types/onboarding";
import { appwriteConfig, databases, isAppwriteConfigured } from "./appwrite";
export async function saveSubmission(data: OnboardingSubmission) {
  if (!isAppwriteConfigured) return;
  if (!appwriteConfig.databaseId || !appwriteConfig.collectionId)
    throw new Error("Profile saving is temporarily unavailable.");
  await databases.createDocument({
    databaseId: appwriteConfig.databaseId,
    collectionId: appwriteConfig.collectionId,
    documentId: ID.unique(),
    data,
  });
}
