import { handlePost, AI_ENDPOINT } from "./api";

const chat = async (messages, systemPrompt) => {
  const aiResponse = await handlePost(AI_ENDPOINT, {
    messages,
    systemPrompt,
  });
  return aiResponse;
};

export { chat };
