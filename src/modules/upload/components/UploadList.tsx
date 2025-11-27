import StatusBadge from "../../../components/ui/StatusBadge";
import ProgressBar from "../../../components/ui/ProgressBar";
import { formatBytes } from "../../../utils/formatBytes";
import type { UploadTask } from "../types/upload.type";

interface UploadListProps {
  tasks: UploadTask[];
  cancelUpload: (id: string) => void;
  removeTask: (id: string) => void;
  retryTask: (id: string) => void;
}

const UploadList = ({
  tasks,
  cancelUpload,
  removeTask,
  retryTask,
}: UploadListProps) => {
  return (
    <div className="space-y-3 bg-white p-4 shadow-md border border-t-0 border-gray-300 max-h-96 overflow-y-auto">
      {tasks.length === 0 && (
        <div className="text-sm text-gray-500 p-6">
          No files in the queue. Add files to begin uploading.
        </div>
      )}

      {tasks.map((_task) => (
        <div
          key={_task.id}
          className="flex items-center gap-4 p-2 rounded-lg border border-gray-100 bg-gray-50 shadow-md"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md text-sm font-medium">
            {_task.name.split(".").pop()?.toUpperCase()}
          </div>
          <div className="flex-1 w-5/7">
            <div className="flex items-center justify-between">
              <div
                className="font-medium text-sm text-gray-900 w-4/5 truncate"
                title={_task.name}
              >
                {_task.name}
              </div>
              <div className="text-xs text-gray-500">
                {formatBytes(_task.size)}
              </div>
            </div>
            <div className="text-xs mt-2">
              <StatusBadge status={_task.status} />
            </div>
            <div className="mt-2">
              <ProgressBar value={_task.progress} />
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <div>{_task.progress}%</div>
                <div className="flex items-center gap-2">
                  {_task.status === "uploading" && (
                    <button
                      onClick={() => cancelUpload(_task.id)}
                      className="text-sm px-2 py-1 bg-yellow-100 text-yellow-700 rounded"
                    >
                      Cancel
                    </button>
                  )}
                  {_task.status === "pending" && (
                    <button
                      onClick={() => removeTask(_task.id)}
                      className="text-sm px-2 py-1 bg-gray-100 rounded"
                    >
                      Remove
                    </button>
                  )}
                  {["failed", "cancelled"].includes(_task.status) && (
                    <button
                      onClick={() => retryTask(_task.id)}
                      className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded"
                    >
                      Retry
                    </button>
                  )}

                  {_task.status === "success" && (
                    <a
                      className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded"
                      href="#"
                    >
                      Open
                    </a>
                  )}
                </div>
              </div>

              {_task.error && (
                <div className="text-sm text-red-500 mt-2">{_task.error}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadList;
