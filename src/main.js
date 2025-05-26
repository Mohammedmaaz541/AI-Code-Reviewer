import { GoogleGenerativeAI } from "@google/generative-ai";

// DOM references
const textarea = document.getElementById("input");
const output = document.getElementById("output");
const button = document.getElementById("generate");

// Initialize Gemini API
// IMPORTANT: Replace "YOUR_API_KEY" with your actual API key.
// For production, never expose your API key directly in client-side code.
// Consider using a backend proxy for API calls.
const genAI = new GoogleGenerativeAI("AISyAAYdy7ZdU3AEthKFmf2pV06ffTJHA"); // replace with your actual API key

async function main() {
  const prompt = textarea.value;

  if (!prompt.trim()) {
    output.textContent = "Please enter some code to review.";
    return;
  }

  try {
    // *** CORRECTION HERE: Changed the model name from "gemini-2.0-flas" to "gemini-1.5-flash" ***
    // If "gemini-1.5-flash" is not available or you prefer, you can use "gemini-pro" instead.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

    const result = await model.generateContent(
      `The user provided the following code:\n\n${prompt}\n\n` +
      `As a helpful AI code reviewer, please:
1. Determine whether the code is correct or incorrect.
2. If correct, explain briefly how it works.
3. If incorrect, provide the corrected version and explain the changes.
Be clear, concise, and beginner-friendly in your explanation.`
    );

    const response = await result.response;
    const text = await response.text();
    output.textContent = text;
  } catch (error) {
    // Display any errors encountered during the API call
    output.textContent = "Error: " + error.message;
    console.error("Gemini error:", error);
  }
}

// Add event listener to the generate button
button.addEventListener("click", main);
