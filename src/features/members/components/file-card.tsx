import { isFileWithPreview } from "../utils/fileUtils";
import { FilePreview } from "./file-preview";

interface FileCardProps {
  file: File;
}

export const FileCard = ({ file }: FileCardProps) => {
  return (
    <div className="relative flex items-center gap-2.5">
      <div className="flex flex-1 gap-2.5">
        {isFileWithPreview(file) ? <FilePreview file={file} /> : null}
        <div className="flex w-full flex-col gap-2" />
      </div>
    </div>
  );
};
