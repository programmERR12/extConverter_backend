
// import express from "express";
// import multer from "multer";
// import path from "path";
// import { pdfToWord } from "../controllers/pdfToWord_Controller.js";
// import { wordToPdf } from "../controllers/wordToPdf_Controller.js";7

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({ storage });

// router.post("/pdf-to-word", upload.single("file"), pdfToWord);
// router.post("/word-to-pdf", upload.single("file"), wordToPdf);

// export default router;

import express from "express";
import multer from "multer";
import { pdfToWord } from "../controllers/pdfToWord_Controller.js";
import { wordToPdf } from "../controllers/wordToPdf_Controller.js";

const router = express.Router();

// 🚀 MEMORY STORAGE (NO uploads folder)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// routes
router.post("/pdf-to-word", upload.single("file"), pdfToWord);
router.post("/word-to-pdf", upload.single("file"), wordToPdf);

export default router;