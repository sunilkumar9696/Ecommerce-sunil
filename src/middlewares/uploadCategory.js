// middleware/uploadCategoryImage.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'categories',
    transformation: [{ width: 800, height: 800, crop: 'limit' }]
  }
});

const uploadCategoryImage = multer({ storage });
export default uploadCategoryImage;