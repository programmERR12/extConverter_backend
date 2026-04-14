
// import fs from "fs";
// import CloudmersiveConvertApiClient from "cloudmersive-convert-api-client";

// export const wordToPdf = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   if (!req.file.mimetype.includes("word")) {
//     return res.status(400).json({ message: "Only Word files allowed" });
//   }

//   const filePath = req.file.path;

//   // 🔑 Cloudmersive setup
//   const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
//   const Apikey = defaultClient.authentications["Apikey"];
//   Apikey.apiKey = process.env.API_KEY;

//   // 🔥 important fix (401 avoid)
//   defaultClient.defaultHeaders = {
//     "Apikey": process.env.API_KEY
//   };

//   const apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

//   try {
//     const inputFile = fs.readFileSync(filePath);

//     apiInstance.convertDocumentDocxToPdf(inputFile, async (error, data) => {
//       if (error) {
//         console.error("❌ Conversion error:", error);
//         return res.status(500).json({
//           message: "Conversion failed",
//           error: error.message,
//         });
//       }

//       try {
//         // 🔥 Direct response as file download (NO SAVE)
//         res.setHeader("Content-Type", "application/pdf");
//         res.setHeader(
//           "Content-Disposition",
//           `attachment; filename="${Date.now()}.pdf"`
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

export const wordToPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.file.mimetype.includes("word")) {
      return res.status(400).json({ message: "Only Word files allowed" });
    }

    // 🔥 IMPORTANT FIX (memoryStorage)
    const inputFile = req.file.buffer;

    // Cloudmersive setup
    const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
    const Apikey = defaultClient.authentications["Apikey"];
    Apikey.apiKey = process.env.API_KEY;

    defaultClient.defaultHeaders = {
      "Apikey": process.env.API_KEY,
    };

    const apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

    apiInstance.convertDocumentDocxToPdf(inputFile, (error, data) => {
      if (error) {
        return res.status(500).json({
          message: "Conversion failed",
          error: error.message,
        });
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${Date.now()}.pdf"`
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