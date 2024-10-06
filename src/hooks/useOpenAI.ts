import { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI();

export function useOpenAI() {
  const [isLoading, setIsLoading] = useState(false);

  const generateSetting = async () => {
    setIsLoading(true);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an expert worldbuilder with a wealth of knowledge in fantasy storytelling and game design. Your purpose is to generate a unique and immersive fantasy setting for a game or story. Example descriptions of your created settings could be: 'a castle in a storm', 'an abandoned chapel covered in ivy at mid-day', or 'a desert settlement with brick buildings and many smoking chimneys'." },
          {
            role: "user",
            content: "Create a unique fantasy setting. Respond ONLY with a short description of the setting. For example: 'ramshackle wooden huts on the edge of a cliff.'. Proceed.",
          },
        ],
      });
      return response.choices[0]?.message.content;
    } catch (error) {
      console.error('Error generating setting:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Generate landscape fantasy art reminiscent of the Lord of the Rings or Elden Ring depicting ${prompt}.`,
        n: 1,
        size: "1024x1024",
      });
      return response.data[0]?.url;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    generateSetting,
    generateImage,
  };
}
