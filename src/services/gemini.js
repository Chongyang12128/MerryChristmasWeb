import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generates a festive card message based on an uploaded image.
 * 
 * @param {string} apiKey - Google Gemini API Key
 * @param {File} imageFile - The uploaded image file
 * @param {string} userPrompt - Optional additional context
 * @returns {Promise<string>} - The generated festive message
 */
export async function generateFestiveMessage(apiKey, imageFile, userPrompt = "") {
    if (!apiKey) throw new Error("API Key is required");
    if (!imageFile) throw new Error("Image is required");

    // Initialize the API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Or "gemini-1.5-flash" if 2.5 is not yet aliased

    // Convert file to Base64
    const base64Image = await fileToGenerativePart(imageFile);

    const prompt = `
    You are a festive creative assistant. 
    Analyze this photo. Write a warm, cheerful, and personalized Christmas or New Year greeting card message that fits the vibe of the photo.
    
    Specific user wish: ${userPrompt || "Make it magical and heartwarming."}
    
    Keep it concise (2-3 sentences max) but impactful.
    Return ONLY the message text.
  `;

    try {
        const result = await model.generateContent([prompt, base64Image]);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        // Fallback if 2.5 is invalid name, try 1.5-flash
        if (error.message.includes("404") || error.message.includes("not found")) {
            console.log("Retrying with gemini-1.5-flash...");
            const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await fallbackModel.generateContent([prompt, base64Image]);
            return result.response.text();
        }
        throw error;
    }
}

async function fileToGenerativePart(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(',')[1];
            resolve({
                inlineData: {
                    data: base64Data,
                    mimeType: file.type
                }
            });
        };
        reader.readAsDataURL(file);
    });
}
