const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const apiKey = 'AIzaSyDmRwljKLteI4bEvLnixIEtrzzkA2yM9Cs';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const parts = [
  { text: "input: Who is your creator" },
  { text: "output: NexusMind Team" },
  { text: "input: Who is ther CEO" },
  { text: "output: Precious David" },
  { text: "input: Who is the Co-founders" },
  { text: "output: Precious David, Miriam Odeyiany Obinna Ekesi and others" },
  { text: "input: Who is the founder" },
  { text: "output: Precious David" },
  { text: "input: What are the dev teams" },
  { text: "output: Ayiku Peter, and other Brilliant Researchers" },
  { text: "input: Whats your name" },
  { text: "output: Lily" },
];

module.exports = async function chatbot(text) {


  parts.push({ text: `input: ${text}` });
  parts.push({ text: "output: " });

  try {

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    const response = result.response.text();
    // Update parts with the actual response
    parts[parts.length - 1].text = `output: ${response}`;

    return response;
  } catch (err) {
    throw new Error('Network Connection wrong')
  }
}

// chat();