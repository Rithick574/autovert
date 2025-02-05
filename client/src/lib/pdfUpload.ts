import axios from "axios";
export const PdfUpload = async (image: File) => {
  const preset_key = import.meta.env.VITE_REACT_APP_PRESET_KEY;
  const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME;
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", preset_key);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    const { format, secure_url } = res.data;
    if (["pdf"].includes(format)) {
      return secure_url;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
