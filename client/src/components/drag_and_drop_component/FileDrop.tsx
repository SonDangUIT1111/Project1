import { DragEvent, useState } from "react";
type Props = {
  setImageData: React.Dispatch<React.SetStateAction<string>>;
  imageData: string;
};

export function FileDrop({ setImageData, imageData }: Props) {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  let [urlImage, setUrlImage] = useState("");
  const [errorText, setErrorText] = useState("");
  if (imageData !== "") {
    urlImage = imageData;
  }

  // Define the event handlers
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setErrorText("");
    setIsOver(false);

    // Fetch the files
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);

    // Use FileReader to read file content
    droppedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onerror = () => {
        setErrorText("There was an issue reading the file.");
      };
      if (file.type && !file.type.startsWith("image/")) {
        setErrorText("File is not an image.");
        return;
      }
      reader.addEventListener("load", (event) => {
        if (typeof event.target?.result === "string") {
          setUrlImage(event.target.result);
          setImageData(event.target.result);
        }
      });

      reader.readAsDataURL(file);
      return reader;
    });
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
          width: "500px",
          border: "2px dashed",
          fontSize: "26px",
          marginTop: "20px",
          backgroundColor: isOver ? "lightgray" : "white",
        }}
      >
        {urlImage === "" ? (
          <div>Kéo thả ảnh ở đây</div>
        ) : errorText !== "" ? (
          <div>{errorText}</div>
        ) : (
          <img
            src={urlImage}
            style={{
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
              width: "500px",
              border: "2px dashed",
              objectFit: "cover",
            }}
          ></img>
        )}
      </div>
      <h6 className="mt-2">
        Lưu ý: Nếu gặp lỗi xử lý, vui lòng thử ảnh có kích thước nhỏ hơn !
      </h6>
    </div>
  );
}
