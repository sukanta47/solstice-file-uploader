import instance from "./axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;


export const uploadFileToSupabase = async (
  file: File,
  controller: AbortController,
  onProgress?: (percent: number) => void
) => {
  const form = new FormData();
  form.append("file", file);
  form.append("bucket_id", "documents");
    try {
        const response = await instance.post(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-file`,
          form,
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
              if (!event.total) return;
              const percent = Math.round((event.loaded * 100) / event.total);
              onProgress?.(percent);
            },
          }
        );
        return response.data;
    } catch (error) {
        console.error("Error uploading file to Supabase:", error);
        throw error;
    }
};

export const getAllFilesForUser = async () => {
    
    try {
        const  response = await instance.get(`${SUPABASE_URL}/functions/v1/get-all-files`);
        return response?.data || [];
    } catch (error) {
        if (error) {
            throw new Error("Error fetching files");
        }
    }
}
export const deleteFiles = async (filePaths: string[]) => {
  try {
    const response = await instance.post(
      `${SUPABASE_URL}/functions/v1/delete-files`,
      {
        bucket_id: "user-uploads",
        keys: filePaths,
        keep_backup: false
      },
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      }
    );

    return response?.data;
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Error deleting files");
  }
};
