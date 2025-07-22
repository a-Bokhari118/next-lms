"use client";

import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./render-state";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useConstructUrl } from "@/hooks/use-construct-url";
type UploaderState = {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
};

type UploaderProps = {
  value?: string;
  onChange?: (value: string) => void;
  fileTypeAccepted: "image" | "video";
};

export const Uploader = ({
  value,
  onChange,
  fileTypeAccepted,
}: UploaderProps) => {
  const fileUrl = useConstructUrl(value || "");
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    key: value,
    uploading: false,
    progress: 0,
    isDeleting: false,
    error: false,
    fileType: fileTypeAccepted,
    objectUrl: value ? fileUrl : undefined,
  });

  // const uploadFile = async (file: File) => {
  //   setFileState((prev) => ({
  //     ...prev,
  //     uploading: true,
  //     progress: 0,
  //   }));

  //   try {
  //     // GETTING PRESIGNED URL
  //     const response = await fetch("/api/s3/upload", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         fileName: file.name,
  //         contentType: file.type,
  //         size: file.size,
  //         isImage: fileTypeAccepted === "image" ? true : false,
  //       }),
  //     });
  //     if (!response.ok) {
  //       toast.error("Failed to get presigned URL");
  //       setFileState((prev) => ({
  //         ...prev,
  //         uploading: false,
  //         progress: 0,
  //         error: true,
  //       }));
  //       return;
  //     }
  //     const data = await response.json();
  //     const { presignedUrl, key } = data;
  //     await new Promise<void>((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.upload.onprogress = (e) => {
  //         if (e.lengthComputable) {
  //           const progress = Math.round((e.loaded / e.total) * 100);
  //           setFileState((prev) => ({
  //             ...prev,
  //             progress,
  //           }));
  //         }
  //       };
  //       xhr.onload = () => {
  //         if (xhr.status === 200 || xhr.status === 204) {
  //           setFileState((prev) => ({
  //             ...prev,
  //             progress: 100,
  //             uploading: false,
  //             key,
  //           }));
  //           onChange?.(key);
  //           toast.success("File uploaded successfully");
  //           resolve();
  //         } else {
  //           reject(new Error("Failed to upload file"));
  //         }
  //       };
  //       xhr.onerror = () => {
  //         reject(new Error("Failed to upload file"));
  //       };

  //       xhr.open("PUT", presignedUrl);
  //       xhr.setRequestHeader("Content-Type", file.type);
  //       xhr.send(file);
  //     });
  //   } catch (error) {
  //     toast.error("Failed to upload file");
  //     setFileState((prev) => ({
  //       ...prev,
  //       uploading: false,
  //       progress: 0,
  //       error: true,
  //     }));
  //   }
  // };

  const uploadFile = useCallback(
    async (file: File) => {
      setFileState((prev) => ({
        ...prev,
        uploading: true,
        progress: 0,
      }));

      try {
        // GETTING PRESIGNED URL
        const response = await fetch("/api/s3/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            size: file.size,
            isImage: fileTypeAccepted === "image" ? true : false,
          }),
        });
        if (!response.ok) {
          toast.error("Failed to get presigned URL");
          setFileState((prev) => ({
            ...prev,
            uploading: false,
            progress: 0,
            error: true,
          }));
          return;
        }
        const data = await response.json();
        const { presignedUrl, key } = data;
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const progress = Math.round((e.loaded / e.total) * 100);
              setFileState((prev) => ({
                ...prev,
                progress,
              }));
            }
          };
          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
              setFileState((prev) => ({
                ...prev,
                progress: 100,
                uploading: false,
                key,
              }));
              onChange?.(key);
              toast.success("File uploaded successfully");
              resolve();
            } else {
              reject(new Error("Failed to upload file"));
            }
          };
          xhr.onerror = () => {
            reject(new Error("Failed to upload file"));
          };

          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });
      } catch (error) {
        toast.error("Failed to upload file");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));
      }
    },
    [fileTypeAccepted, onChange]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }
        setFileState({
          file,
          uploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          fileType: fileTypeAccepted,
          error: false,
          id: uuidv4(),
          isDeleting: false,
        });
        uploadFile(file);
      }
    },
    [fileState.objectUrl, uploadFile, fileTypeAccepted]
  );

  const handleDeleteFile = async () => {
    if (fileState.isDeleting || !fileState.objectUrl) return;
    setFileState((prev) => ({
      ...prev,
      isDeleting: true,
    }));

    try {
      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });
      if (!response.ok) {
        toast.error("Failed to delete file");
        setFileState((prev) => ({
          ...prev,
          isDeleting: false,
          error: true,
        }));
        return;
      }
      toast.success("File deleted successfully");
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
      onChange?.("");
      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        objectUrl: undefined,
        file: null,
        key: undefined,
        uploading: false,
        progress: 0,
        error: false,
        id: null,
        fileType: fileTypeAccepted,
      }));
    } catch (error) {
      toast.error("Failed to delete file");
      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  };

  const rejectedFiles = (fileRejections: FileRejection[]) => {
    if (fileRejections.length) {
      const tooManyFiles = fileRejections.find(
        (rejection) =>
          rejection.errors.length > 0 &&
          rejection.errors[0].code === "too-many-files"
      );

      const fileSize = fileRejections.find(
        (rejection) =>
          rejection.errors.length > 0 &&
          rejection.errors[0].code === "file-too-large"
      );
      const fileType = fileRejections.find(
        (rejection) =>
          rejection.errors.length > 0 &&
          rejection.errors[0].code === "file-invalid-type"
      );

      if (tooManyFiles) {
        toast.error("You can only upload one image");
      }

      if (fileSize) {
        toast.error("File size is too large");
      }

      if (fileType) {
        toast.error("File type is not supported");
      }
    }
  };

  const renderContent = () => {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }
    if (fileState.error) {
      return <RenderErrorState />;
    }
    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewURL={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleDeleteFile={handleDeleteFile}
          fileType={fileState.fileType}
        />
      );
    }
    return <RenderEmptyState isDragActive={isDragActive} />;
  };

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      fileTypeAccepted === "video"
        ? {
            "video/*": [],
          }
        : {
            "image/*": [],
          },
    maxFiles: 1,
    multiple: false,
    maxSize:
      fileTypeAccepted === "video" ? 1024 * 1024 * 5000 : 1024 * 1024 * 5,
    onDropRejected: rejectedFiles,
    disabled: fileState.uploading || !!fileState.objectUrl,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed transition-colors duration-300 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
};
