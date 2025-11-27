import {
  MoreVertical,
  File,
  FileChartLine,
  FileText,
  Trash,
} from "lucide-react";
import type { FileType } from "../types/upload.type";
import { useState } from "react";

interface FileCardProps {
  file: FileType;
  thumbnailUrl?: string;
  onClick?: () => void;
  onDelete: () => void;
}

export default function FileCard({
  file,
  thumbnailUrl,
  onClick,
  onDelete,
}: FileCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const getFileIcon = (fileName: string, size: number = 16) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <File size={size} />;
      case "doc":
      case "docx":
        return <FileChartLine size={size} />;
      case "txt":
        return <FileText size={size} />;
      default:
        return;
    }
  };

  return (
    <div
      onClick={onClick}
      className="
        bg-white rounded-2xl shadow-sm border border-gray-200
        hover:shadow-md transition cursor-pointer
        p-3 flex flex-col gap-3
      "
    >
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 text-blue-400 rounded-md flex items-center justify-center text-xs font-bold">
            <span>{getFileIcon(file.name)}</span>
          </div>
          <p className="font-medium text-gray-900 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
            {file.name}
          </p>
        </div>

        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen((prev) => !prev);
          }}
        >
          <MoreVertical size={18} className="text-gray-600 " />
        </button>
        {isMenuOpen && (
          <div
            className="
              absolute right-0 top-6 z-20
              bg-white shadow-lg rounded-xl border border-gray-200 w-40
              flex flex-col py-2
            "
          >
            <button
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left flex gap-2 items-center"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              <File size={14} /> Open
            </button>

            <button
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left flex gap-2 items-center"
              onClick={() => {
                onDelete();
                setIsMenuOpen(false);
              }}
            >
              <Trash size={14} /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-40 w-full flex items-center justify-center">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} className="h-full w-full object-cover" />
        ) : (
          <div className="h-24 w-24 text-gray-200 hover:text-gray-300 flex items-center justify-center">
            {getFileIcon(file.name, 48)}
          </div>
        )}
      </div>
    </div>
  );
}
