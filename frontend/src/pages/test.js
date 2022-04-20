import React, { useState } from "react";
import { API } from "../Backend";
import { Image, Video, Transformation, CloudinaryContext } from "cloudinary-react";
const Test = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };
  const uploadImage = async (base64EncodedImage) => {
    // try {
    //   await fetch(`${API}/api/uploadfile`, {
    //     method: "POST",
    //     body: JSON.stringify({ data: base64EncodedImage }),
    //     headers: { "Content-type": "application/json" },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmitFile}>
        <input type="file" name="image" onChange={handleFileInput} value={fileInputState} />
        <button type="submit">Submit</button>
      </form>
      {previewSource && <img src={previewSource} alt="chosen" />}
      <Image cloudName="sarvh" publicId="wwxiaeoike9y4muewc6j.jpg">
        <Transformation width="400" height="250" />
      </Image>
      {/* <Video cloudName="sarvh" publicId="samples/sea-turtle">
        <Transformation width="400" height="250" gravity="south" crop="fill" />
      </Video> */}
    </div>
  );
};
export default Test;
