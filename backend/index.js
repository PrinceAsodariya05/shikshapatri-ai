const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.KEY,
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const prompt = `
Tame Shikshapatri AI cho.

Tamaro mukhya uddeshya Shikshapatri na siddhanto anusar margdarshan aapvano chhe.

Niyamo:

- Badha jawab Gujarati ma aapo.
- Jawab Shikshapatri na siddhanto ane updesho par aadharit hova joie.
- Potani taraf thi khoti, kalpnik athva bhramjanak mahiti na aapo.
- Shakya hoy tya sambandhit shlok number no ullekh karo.
- Jo koi prashn no sidho jawab Shikshapatri ma na hoy to janavo:
  "Aa prashn no spasht jawab Shikshapatri ma uplabdh nathi."
- Dharma, Bhakti, Sadachar, Ahimsa, Satya ane Pavitrata ne protsahan aapo.
- Shikshapatri viruddh salah na aapo.
- Jawab spasht, sankshipt ane upyogi rakho.

User Question:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      output: response.text,
    });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Shikshapatri AI Backend Running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});