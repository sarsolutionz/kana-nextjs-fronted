/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AxiosProgressEvent } from "axios";
import { useCallback, useEffect, useState } from "react";

import { FileTypes } from "../types";
import { formatBytes } from "@/lib/utils";

import { useDropzone } from "react-dropzone";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProgressBar from "@/components/progress-bar";

import { FileCard } from "./file-card";

import { useControllableState } from "@/hooks/use-controllable-state";

import { useCreateVehicleDocMutation } from "@/redux/features/vehicle/vehicleApi";

interface FileUploadProgress extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  progress: number;
  File: File;
  source?: AbortController | null;
  value?: File[];
  onValueChange?: (files: File[]) => void;
  handleClose: () => void;
  refetch: () => void;
}

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

const AudioColor = {
  bgColor: "bg-yellow-400",
  fillColor: "fill-yellow-400",
};

const VideoColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-green-400",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

export const ImageUpload = ({
  id,
  onValueChange,
  value: valueProp,
  handleClose,
  refetch,
}: FileUploadProgress) => {
  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);

  // API call to upload file
  const [createVehicleDoc, { data, isSuccess, error, isLoading }] =
    useCreateVehicleDocMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message;
      toast.success(message);
      handleClose();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as {
          data: { msg: string; errors?: { images?: string[] } };
        };
        const emailErrorMessage =
          errorData.data.msg ||
          errorData.data.errors?.images?.[0] ||
          "An error occurred";
        toast.error(emailErrorMessage);
      }
    }
  }, [isSuccess, error, data]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("vehicle", id);

    uploadedFiles.forEach((file) => {
      formData.append("description", file.name);
      formData.append("images", file);
    });

    await createVehicleDoc(formData);
    refetch(); // refetch data after upload
  };

  const getFileIconAndColor = (file: File) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <FileImage size={40} className={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <File size={40} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
        color: AudioColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: <Video size={40} className={VideoColor.fillColor} />,
        color: VideoColor.bgColor,
      };
    }

    return {
      icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
      color: OtherColor.bgColor,
    };
  };

  const onUploadProgress = (
    progressEvent: AxiosProgressEvent,
    file: File,
    cancelSource: AbortController
  ) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
    );

    if (progress === 100) {
      setUploadedFiles((prevUploadedFiles) => {
        return [...prevUploadedFiles, file];
      });

      setFilesToUpload((prevUploadProgress) => {
        return prevUploadProgress.filter((item) => item.File !== file);
      });

      return;
    }

    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.map((item) => {
        if (item.File.name === file.name) {
          return {
            ...item,
            progress,
            source: cancelSource,
          };
        } else {
          return item;
        }
      });
    });
  };

  const handleUploadDocument = async (
    formData: FormData,
    onUploadProgress: (
      progressEvent: AxiosProgressEvent,
      file: File,
      cancelSource: AbortController
    ) => void,
    cancelSource: AbortController
  ) => {
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      onUploadProgress(
        {
          loaded: progress,
          total: 100,
          bytes: progress,
          lengthComputable: true,
        },
        formData.get("file") as File,
        cancelSource
      );
    }
  };

  const removeFile = (file: File, index: number) => {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);

    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.filter((item) => item.File.name !== file.name);
    });

    setUploadedFiles((prevUploadFiles) => {
      return prevUploadFiles.filter((item) => item.name != file.name);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFilesToUpload((prevUploadProgress) => {
        return [
          ...prevUploadProgress,
          ...acceptedFiles.map((file) => {
            return {
              id: file.name, // or any unique identifier
              progress: 0,
              File: file,
              source: null,
              handleClose,
              refetch,
            };
          }),
        ];
      });

      acceptedFiles.map((file) => {
        const formData = new FormData();
        formData.append("file", file);

        const cancelSource = new AbortController();
        return handleUploadDocument(
          formData,
          (progressEvent) =>
            onUploadProgress(progressEvent, file, cancelSource),
          cancelSource
        );
      });

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      const updatedFiles = files ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);
    },
    [files, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed dark:border-gray-500 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="text-center">
            <div className="border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} className="dark:text-black" />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag Files</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload files &#40;files should be under 10 MB&#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Files to upload {files && files.length > 0 && `(${files.length})`}
            </p>
            <div className="space-y-2 pr-2">
              {filesToUpload.map((fileUploadProgress, index) => {
                return (
                  <div
                    key={fileUploadProgress.File.lastModified}
                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                  >
                    <div className="flex items-center flex-1 p-2">
                      <div className="text-white">
                        {["image/png", "image/jpeg"].includes(
                          fileUploadProgress.File.type
                        ) ? (
                          <FileCard
                            key={index}
                            file={fileUploadProgress.File}
                          />
                        ) : (
                          getFileIconAndColor(fileUploadProgress.File).icon
                        )}
                      </div>

                      <div className="w-full ml-2 space-y-1">
                        <div className="text-sm flex justify-between">
                          <p className="text-muted-foreground">
                            {fileUploadProgress.File.name.slice(0, 25)}
                          </p>
                          <span className="text-xs">
                            {fileUploadProgress.progress}%
                          </span>
                        </div>
                        <ProgressBar
                          progress={fileUploadProgress.progress}
                          className={
                            getFileIconAndColor(fileUploadProgress.File)?.color
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          {formatBytes(fileUploadProgress.File.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (fileUploadProgress.source)
                          fileUploadProgress.source.abort();
                        removeFile(fileUploadProgress.File, index);
                      }}
                      className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            Uploaded Files
          </p>
          <div className="space-y-2 pr-3">
            {uploadedFiles.map((file, index) => {
              return (
                <div
                  key={file.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div className="text-white">
                      {["image/png", "image/jpeg"].includes(file.type) ? (
                        <FileCard key={index} file={file} />
                      ) : (
                        getFileIconAndColor(file).icon
                      )}
                    </div>
                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="text-muted-foreground ">
                          {file.name.slice(0, 25)}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file, index)}
                    className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                  >
                    <X size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Button
        size="sm"
        disabled={isLoading}
        onClick={handleSubmit}
        className="ml-auto flex justify-end mt-4"
      >
        Save Files
      </Button>
    </div>
  );
};
