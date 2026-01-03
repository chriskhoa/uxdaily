// import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const chat = async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Message is required" });
    }

    // ===== OLD ANTHROPIC CODE (COMMENTED OUT) =====
    // const anthropic = new Anthropic({
    //   apiKey: process.env.ANTHROPIC_API_KEY,
    // });
    //
    // const response = await anthropic.messages.create({
    //   model: "claude-3-5-haiku-latest",
    //   max_tokens: 300, // Keep responses succinct
    //   system: systemPrompt,
    //   messages: messages,
    // });
    // res.json(response.content[0].text);

    // ===== NEW GEMINI CODE =====
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: systemPrompt || "You are a helpful assistant.",
    });

    // Filter out any leading assistant messages (Gemini requires first message to be from user)
    const validMessages = messages.filter((msg, index) => {
      // Keep all user messages
      if (msg.role === "user") return true;
      // Only keep assistant messages if there's a user message before it
      if (msg.role === "assistant") {
        return messages.slice(0, index).some((m) => m.role === "user");
      }
      return false;
    });

    // If no valid messages, return error
    if (validMessages.length === 0) {
      return res.status(400).json({ error: "No valid user messages found" });
    }

    // If only one message, send it directly without chat history
    if (validMessages.length === 1) {
      const result = await model.generateContent(validMessages[0].content);
      const response = await result.response;
      return res.json(response.text());
    }

    // Convert message format to Gemini (exclude last message)
    const chatHistory = validMessages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: chatHistory,
    });

    // Get the last user message
    const lastMessage = validMessages[validMessages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;

    res.json(response.text());
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "Failed to process AI request",
    });
  }
};

export const aiControllers = {
  chat,
};
