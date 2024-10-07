import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const gameRouter = createTRPCRouter({
  generateSetting: protectedProcedure
    .mutation(async () => {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an expert worldbuilder with a wealth of knowledge in fantasy storytelling and game design. Your purpose is to generate a unique and immersive fantasy setting for a game or story." },
          { role: "user", content: "Create a unique fantasy setting. Respond ONLY with a short description of the setting. For example: 'ramshackle wooden huts on the edge of a cliff.'. Proceed." },
        ],
      });
      return response.choices[0]?.message.content ?? '';
    }),

  generateImage: protectedProcedure
    .input(z.object({ setting: z.string() }))
    .mutation(async ({ input }) => {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Generate landscape fantasy art reminiscent of the Lord of the Rings or Elden Ring depicting ${input.setting}.`,
        n: 1,
        size: "1024x1024",
      });
      return response.data[0]?.url ?? null;
    }),
});
