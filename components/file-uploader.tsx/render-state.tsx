import { cn } from "@/lib/utils";
import { CloudUpload, ImageIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUpload
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-base text-muted-foreground">
        Drag and drop your image here or click to select image
      </p>
      <Button className="mt-4" type="button">
        Select Image
      </Button>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="text-center ">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
        <ImageIcon className={cn("size-6 text-destructive")} />
      </div>
      <p className="text-base text-destructive">
        Something went wrong, please try again
      </p>
    </div>
  );
};

export const RenderUploadedState = ({
  previewURL,
  isDeleting,
  handleDeleteFile,
  fileType,
}: {
  previewURL: string;
  isDeleting: boolean;
  handleDeleteFile: () => void;
  fileType: "image" | "video";
}) => {
  return (
    <div className="relative group w-full h-full flex items-center justify-center">
      {fileType === "video" ? (
        <video src={previewURL} className="w-full h-full rounded-md" controls />
      ) : (
        <>
          <Image
            src={previewURL}
            alt="uploaded image"
            fill
            className="object-contain p-2"
          />
        </>
      )}
      <Button
        variant="destructive"
        size="icon"
        className={cn("absolute top-2 right-2")}
        onClick={handleDeleteFile}
        disabled={isDeleting}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
};

export const RenderUploadingState = ({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) => {
  return (
    <div className="text-center flex justify-center items-center flex-col">
      <p>{progress}%</p>
      <p className="mt-2 text-sm font-medium text-foreground">Uploading...</p>
      <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">
        {file.name}
      </p>
    </div>
  );
};
