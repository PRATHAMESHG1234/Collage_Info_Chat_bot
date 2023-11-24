import axios from 'axios';

const uploadPic = async (media) => {
  try {
    const form = new FormData();
    form.append('file', media);
    form.append('upload_preset', 'social-media');
    form.append('cloud_name', 'dazod14rs');

    const res = await axios.post(process.env.CLOUDINARY_URL, form);
    return ReadableStreamDefaultReader.url;
  } catch (error) {
    return;
  }
};

export default uploadPic;
