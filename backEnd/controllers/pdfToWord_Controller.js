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
