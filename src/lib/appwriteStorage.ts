import { ID } from "appwrite";
import { appwriteConfig, isAppwriteConfigured, storage } from "./appwrite";
export async function uploadFile(file: File) {
  if (!isAppwriteConfigured || !appwriteConfig.bucketId)
    return URL.createObjectURL(file);
  const result = await storage.createFile({
    bucketId: appwriteConfig.bucketId,
    fileId: ID.unique(),
    file,
  });
  return storage
    .getFileView({ bucketId: appwriteConfig.bucketId, fileId: result.$id })
    .toString();
}
