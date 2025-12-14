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

// const aiControllers = {
//   chat: async (req, res, next) => {
//     try {
//       console.log("AI chat request received");
//       const { message, currentExercise, conversationHistory } = req.body;
//       const userId = req.userId; // from JWT middleware
//       console.log("User ID from JWT:", userId);

//       if (!message || !currentExercise) {
//         console.log("Missing required fields");
//         return res.status(400).json({
//           error: "Message and currentExercise are required",
//         });
//       }

//       // Get user from database
//       console.log("Fetching user from database...");
//       const userDocument = await db.getFromCollectionById(db.USERS, userId);
//       console.log("User found:", !!userDocument);

//       if (!userDocument) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       const user = User.fromUserDocument(userDocument);

//       // Check and reset rate limit if needed
//       const now = new Date();
//       const resetDate = new Date(user.aiRequestResetDate);
//       const hoursSinceReset = (now - resetDate) / (1000 * 60 * 60);

//       if (hoursSinceReset >= 24) {
//         // Reset counter after 24 hours
//         user.aiRequestCount = 0;
//         user.aiRequestResetDate = now;
//       }

//       // Check rate limit
//       if (user.aiRequestCount >= DAILY_REQUEST_LIMIT) {
//         return res.status(429).json({
//           error: `Daily request limit reached. You can make ${DAILY_REQUEST_LIMIT} requests per day.`,
//           resetDate: new Date(resetDate.getTime() + 24 * 60 * 60 * 1000),
//         });
//       }

//       // Build system prompt based on exercise context
//       const systemPrompt = buildSystemPrompt(currentExercise);

//       // Build messages array
//       const messages = [];

//       // Add conversation history if provided
//       if (conversationHistory && Array.isArray(conversationHistory)) {
//         conversationHistory.forEach((msg) => {
//           messages.push({
//             role: msg.isSender ? "user" : "assistant",
//             content: msg.text,
//           });
//         });
//       }

//       // Add current message
//       messages.push({
//         role: "user",
//         content: message,
//       });

//       // Call Anthropic API
//       console.log("Calling Anthropic API...");
//       const response = await anthropic.messages.create({
//         model: "claude-sonnet-4-5",
//         max_tokens: 300, // Keep responses succinct
//         system: systemPrompt,
//         messages: messages,
//       });
//       console.log("Anthropic API response received");

//       const aiResponse = response.content[0].text;

//       // Update user's request count
//       user.aiRequestCount += 1;
//       await db.updateToCollectionById(db.USERS, userId, {
//         aiRequestCount: user.aiRequestCount,
//         aiRequestResetDate: user.aiRequestResetDate,
//       });

//       console.log("Sending response to client");
//       res.json({
//         response: aiResponse,
//         remainingRequests: DAILY_REQUEST_LIMIT - user.aiRequestCount,
//       });
//     } catch (error) {
//       console.error("AI chat error:", error);
//       console.error("Error stack:", error.stack);
//       res.status(500).json({
//         error: error.message || "Internal server error",
//       });
//     }
//   },
// };

export const aiControllers = {
  chat,
};
