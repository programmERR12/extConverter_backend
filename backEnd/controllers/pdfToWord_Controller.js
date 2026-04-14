
// import fs from "fs";
// import CloudmersiveConvertApiClient from "cloudmersive-convert-api-client";

// export const pdfToWord = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   // only PDF allowed
//   if (!req.file.mimetype.includes("pdf")) {
//     return res.status(400).json({ message: "Only PDF files allowed" });
//   }

//   const filePath = req.file.path;

//   // 🔑 Cloudmersive setup
//   const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
//   const Apikey = defaultClient.authentications["Apikey"];
//   Apikey.apiKey = process.env.API_KEY;

//   // 🔥 important fix for 401
//   defaultClient.defaultHeaders = {
//     "Apikey": process.env.API_KEY
//   };

//   const apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

//   try {
//     const inputFile = fs.readFileSync(filePath);

//     apiInstance.convertDocumentPdfToDocx(inputFile, async (error, data) => {
//       if (error) {
//         console.error("❌ Conversion error:", error);
//         return res.status(500).json({
//           message: "Conversion failed",
//           error: error.message,
//         });
//       }

//       try {
//         // 🔥 Direct DOCX download (NO SAVE)
//         res.setHeader(
//           "Content-Type",
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//         );

//         res.setHeader(
//           "Content-Disposition",
//           `attachment; filename="${Date.now()}.docx"`
//         );

//         res.send(data);

//         // cleanup uploaded file
//         fs.unlink(filePath, (err) => {
//           if (err) console.error("Cleanup error:", err);
//         });

//       } catch (err) {
//         console.error("❌ Response error:", err);
//         res.status(500).json({ message: "Response failed" });
//       }
//     });
//   } catch (err) {
//     console.error("❌ Server error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

import CloudmersiveConvertApiClient from "cloudmersive-convert-api-client";

export const pdfToWord = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.file.mimetype.includes("pdf")) {
      return res.status(400).json({ message: "Only PDF files allowed" });
    }

    // 🔥 IMPORTANT FIX (memoryStorage)
    const inputFile = req.file.buffer;

    const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
    const Apikey = defaultClient.authentications["Apikey"];
    Apikey.apiKey = process.env.API_KEY;

    defaultClient.defaultHeaders = {
      "Apikey": process.env.API_KEY,
    };

    const apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

    apiInstance.convertDocumentPdfToDocx(inputFile, (error, data) => {
      if (error) {
        return res.status(500).json({
          message: "Conversion failed",
          error: error.message,
        });
      }

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${Date.now()}.docx"`
      );

      res.send(data);
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};