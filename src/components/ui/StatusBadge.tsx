import type { TaskStatus } from "../../modules/upload/types/upload.type";

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const map: Record<TaskStatus, { label: string; className: string }> = {
    pending: { label: "Pending", className: "bg-gray-100 text-gray-700" },
    uploading: { label: "Uploading", className: "bg-blue-100 text-blue-700" },
    success: { label: "Uploaded", className: "bg-green-100 text-green-700" },
    failed: { label: "Failed", className: "bg-red-100 text-red-700" },
    cancelled: {
      label: "Cancelled",
      className: "bg-yellow-100 text-yellow-700",
    },
  };
  const cfg = map[status];
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
};
export default StatusBadge;
