import Image from "next/image";

interface FilePreviewProps {
  file: File & { preview: string };
}

export const FilePreview = ({ file }: FilePreviewProps) => {
  if (file.type.startsWith("image/")) {
    return (
      <Image
        src={file.preview}
        alt={file.name}
        width={48}
        height={48}
        loading="lazy"
        className="aspect-square shrink-0 rounded-md object-cover"
      />
    );
  }
  return null;
};
