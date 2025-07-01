// multer is a midddleware for handling multipart/form-data, which is primarly used for file uploads
import multer from "multer";
const storage=multer.memoryStorage();
const upload=multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{

    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed"), false);
      }
    },
    limits:{fileSize:5*1024*1024}  //5MB limit

});
export default upload;