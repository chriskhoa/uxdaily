import Anthropic from "@anthropic-ai/sdk";
const chat = async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Message is required" });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 300, // Keep responses succinct
      system: systemPrompt,
      messages: messages,
    });
    res.json(response.content[0].text);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Failed to process AI request",
    });
  }
};

export const aiControllers = {
  chat,
};
