const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <div
        className="h-full transition-all"
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          backgroundColor: "#2563EB",
        }}
      />
    </div>
  );
};
export default ProgressBar;
