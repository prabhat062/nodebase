import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { inngest } from "./client";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a lodu intern",
        prompt: "What is 2+2?",
      }
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: openai("gpt-4"),
        system: "You are an asshole boss",
        prompt: "What is 2+2?",
      }
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: anthropic("claude-opus-4-0"),
        system: "You are an lodu intern",
        prompt: "What is 2+2?",
      }
    );
    return {
      geminiSteps,
      openaiSteps,
      anthropicSteps,
    };
  }
);
