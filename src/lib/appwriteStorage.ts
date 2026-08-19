import { ID } from "appwrite";
import { appwriteConfig, isAppwriteConfigured, storage } from "./appwrite";
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_UPLOAD_TYPES = /^(image|video)\/(jpeg|png|webp|gif|mp4|webm|quicktime)$/i;
export async function uploadFile(file: File) {
  if (file.size > MAX_UPLOAD_BYTES)
    throw new Error("Each uploaded file must be 10 MB or smaller.");
  if (!ALLOWED_UPLOAD_TYPES.test(file.type))
    throw new Error("Only image and video portfolio files are supported.");
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
