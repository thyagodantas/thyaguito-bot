const express = require("express");
const path = require("path");
const stringSimilarity = require("string-similarity");
const trainingData = require("./trainingData.js");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

function getResponse(userMessage) {
  let response =
    "Não entendi o que você disse, mas estou aqui para te lembrar que o seu amor te ama muito.";
  let bestMatch = { rating: 0 };

  trainingData.forEach((data) => {
    const match = stringSimilarity.findBestMatch(
      userMessage.toLowerCase(),
      data.patterns
    );
    if (match.bestMatch.rating > bestMatch.rating) {
      bestMatch = match.bestMatch;
      const randomIndex = Math.floor(Math.random() * data.responses.length);
      response = data.responses[randomIndex];
    }
  });

  return response;
}

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  const response = getResponse(userMessage);
  res.json({ reply: response });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Love Bot is running on port ${port}`);
});
