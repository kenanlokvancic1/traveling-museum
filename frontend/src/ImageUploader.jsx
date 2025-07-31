import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";

const ImageUploader = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const storageRef = ref(storage, `paintings/${file.name}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(percent));
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUploading(false);
          setProgress(0);
          onUpload(url);
        });
      }
    );
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || !image}>
        {uploading ? `Uploading... ${progress}%` : "Upload Image"}
      </button>
      {progress > 0 && <p>Progress: {progress}%</p>}
    </div>
  );
};

export default ImageUploader;
