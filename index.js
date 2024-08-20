const express = require("express");
const path = require("path");
const trainingData = require("./trainingData.js");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

function getResponse(userMessage) {
  let response =
    "Não entendi o que você disse, mas estou aqui para te lembrar que o seu amor te ama muito.";

  trainingData.forEach((data) => {
    data.patterns.forEach((pattern) => {
      if (userMessage.toLowerCase().includes(pattern)) {
        const randomIndex = Math.floor(Math.random() * data.responses.length);
        response = data.responses[randomIndex];
      }
    });
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
