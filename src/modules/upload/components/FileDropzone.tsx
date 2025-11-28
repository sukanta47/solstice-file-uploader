import React, { useRef, useState } from "react";
interface FileDropzoneProps {
  onFiles: (files: File[]) => void;
  setShowUploadList: (show: boolean) => void;
}
const FileDropzone = ({ onFiles, setShowUploadList }: FileDropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openFileDialog = () => fileInputRef.current?.click();

  const validateFiles = (files: File[]) => {
    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    const AllowedFileTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    const isValidFiles = files.every((file) =>
      AllowedFileTypes.includes(file.type)
    );
    if (!isValidFiles) {
      alert(
        "Your files have unsupported formats. Please upload PDF, DOCX, or TXT files only."
      );
      return [];
    }
    const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      alert(
        "Your files exceed the maximum size of 10MB. Please upload smaller files."
      );
      return [];
    }
    return files;
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dt = e.dataTransfer;
    const files = Array.from(dt.files);
    console.log({ dt, files, e });
    const validFiles = validateFiles(files);
    console.log({ validFiles });
    if (validFiles.length > 0) {
      onFiles(validFiles);
      setShowUploadList(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        onChange={(e) => onFiles(Array.from(e.target.files || []))}
        accept=".pdf,.docx,.txt"
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
        className={`w-full rounded-2xl border-2 border-dashed p-10 text-center transition cursor-pointer ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <div className="mx-auto max-w-xl">
          <div className="text-3xl font-semibold text-gray-600 mb-2">
            Drag & drop files here
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            or click to browse
          </div>
          <div className="text-xs text-gray-400">
            Supported: PDF, DOCX, TXT • Max 10MB/file
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDropzone;
