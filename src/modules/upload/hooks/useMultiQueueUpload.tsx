import { useCallback, useRef, useState } from "react";
import type { UploadTask } from "../types/upload.type";
import useAuth from "../../auth/hooks/useAuth";
import { uploadFileToSupabase } from "../../../services/file.service";

const MAX_CONCURRENT = 3;

export const useUploadQueue = () => {
  const { accessToken } = useAuth();
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  const activeCount = useRef(0);

  const uploadTask = useCallback(
    async (task: UploadTask) => {
      const controller = new AbortController();
      setTasks((list) =>
        list.map((t) =>
          t.id === task.id
            ? { ...t, controller, status: "uploading", progress: 1 }
            : t
        )
      );

      try {
        const data = await uploadFileToSupabase(
          task.file,
          controller,
          (progress) => {
            setTasks((list) =>
              list.map((t) => (t.id === task.id ? { ...t, progress } : t))
            );
          }
        );

        setTasks((list) =>
          list.map((t) =>
            t.id === task.id
              ? {
                  ...t,
                  status: "success",
                  progress: 100,
                  fileUrl: data.signedUrl,
                }
              : t
          )
        );
      } catch (err: any) {
        if (err.name === "AbortError") {
          setTasks((list) =>
            list.map((t) =>
              t.id === task.id ? { ...t, status: "cancelled" } : t
            )
          );
        } else {
          setTasks((list) =>
            list.map((t) =>
              t.id === task.id
                ? { ...t, status: "failed", error: "Upload failed" }
                : t
            )
          );
        }
      }

      activeCount.current--;
      processQueue();
    },
    [accessToken]
  );

  const processQueue = useCallback(() => {
    if (activeCount.current >= MAX_CONCURRENT) return;

    setTasks((current) => {
      const pendingTasks = current.filter((t) => t.status === "pending");
      if (pendingTasks.length === 0) return current;

      const availableSlots = MAX_CONCURRENT - activeCount.current;
      const toUpload = pendingTasks.slice(0, availableSlots);

      toUpload.forEach((task) => {
        activeCount.current++;
        uploadTask(task);
      });

      return current;
    });
  }, [uploadTask]);

  const addFiles = (files: File[]) => {
    const newTasks = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      status: "pending" as const,
    }));

    setTasks((t) => [...t, ...newTasks]);
    processQueue();
  };

  const cancelUpload = (taskId: string) => {
    setTasks((list) =>
      list.map((t) => {
        if (t.id === taskId && t.controller) {
          t.controller.abort();
        }
        return t.id === taskId ? { ...t, status: "cancelled" } : t;
      })
    );
  };

  const retryUpload = (taskId: string) => {
    setTasks((list) =>
      list.map((t) =>
        t.id === taskId
          ? { ...t, status: "pending", progress: 0, error: undefined }
          : t
      )
    );
    processQueue();
  };

  const removeTask = (taskId: string) => {
    cancelUpload(taskId);
    setTasks((list) => list.filter((t) => t.id !== taskId));
  };

  return {
    tasks,
    addFiles,
    cancelUpload,
    retryUpload,
    removeTask,
  };
};
