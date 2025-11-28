import { useState } from "react";

import FileDropzone from "../components/FileDropzone";
import MyFilesGrid from "../components/MyFilesGrid";
import UploadList from "../components/UploadList";
import { ChevronDown } from "lucide-react";
import { useUploadQueue } from "../hooks/useMultiQueueUpload";

const UploadDashboard = () => {
  const [showUploadList, setShowUploadList] = useState(false);
  const { tasks, addFiles, cancelUpload, retryUpload, removeTask } =
    useUploadQueue();
  const addFileHandler = (files: File[]) => {
    addFiles(files);
    setShowUploadList(true);
  };

  return (
    <div className="min-h-screen bg-gray-200 rounded-xl">
      <div className="flex flex-col gap-4 mx-auto p-6 items-center">
        <MyFilesGrid />
        <div className="grid w-3/4 items-center gap-6 mt-10">
          <div className="lgcol-span-2">
            <FileDropzone
              onFiles={addFileHandler}
              setShowUploadList={setShowUploadList}
            />
          </div>
          <div className="min-w-64 max-w-96 fixed right-4 bottom-0">
            <div className="flex items-center justify-between relative bg-white px-4 py-2 rounded-t-2xl border border-gray-300">
              <div className="flex items-center gap-2">
                <p
                  data-testid="title"
                  className="font-medium text-gray-900 text-sm"
                >
                  File Uploads
                </p>
              </div>

              <button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUploadList((prev) => !prev);
                }}
              >
                <ChevronDown size={18} className="text-gray-600 " />
              </button>
            </div>
            {showUploadList && (
              <UploadList
                tasks={tasks}
                cancelUpload={cancelUpload}
                removeTask={removeTask}
                retryTask={retryUpload}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDashboard;
