import { useEffect, useState } from "react";
import {
  deleteFiles,
  getAllFilesForUser,
} from "../../../services/file.service";
import FileCard from "./FileCard";

const MyFilesGrid = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [myFiles, setMyFiles] = useState<Array<{ id: number; name: string }>>(
    []
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const myFilesFromStorage = await getAllFilesForUser();
      console.log({ myFilesFromStorage });
      setMyFiles(myFilesFromStorage.files);
      setIsLoading(false);
    })();
  }, []);

  const fileDeleteHandler = async (fileName: string) => {
    const session = localStorage.getItem("session");
    if (session) {
      const user = JSON.parse(session).user;
      if (!user?.id) {
        console.error("User not logged in.");
        return;
      }

      const fullPath = `${user.id}/${fileName}`;

      try {
        await deleteFiles([fullPath]);
        setMyFiles((prev) => prev.filter((f) => f.name !== fileName));
      } catch (err) {
        console.error("Failed to delete file:", err);
      }
    } else {
      localStorage.clear();
      window.location.assign("/login");
    }
  };

  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(234px,1fr))] w-full">
      {isLoading ? (
        <p>Loading files...</p>
      ) : myFiles?.length ? (
        myFiles.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            onClick={() => {
              console.log("File clicked:", file);
            }}
            onDelete={() => fileDeleteHandler(file.name)}
          />
        ))
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default MyFilesGrid;
