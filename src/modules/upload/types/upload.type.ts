export type TaskStatus = "pending" | "uploading" | "success" | "failed" | "cancelled";

export interface UploadTask {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: number;
  status: TaskStatus;
  error?: string;
  controller?: AbortController;
}
export type FileType = {
  id: number; 
  name: string;
}