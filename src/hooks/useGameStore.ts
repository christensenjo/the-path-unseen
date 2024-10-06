import { create } from 'zustand';
import OpenAI from 'openai';

const openai = new OpenAI();

interface GameState {
  setting: string | null;
  imageUrl: string | null;
  chatHistory: { role: string; content: string }[];
  isLoading: boolean;
  generateAndStoreSetting: () => Promise<void>;
  generateAndStoreImage: () => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  setting: null,
  imageUrl: null,
  chatHistory: [],
  isLoading: false,

  generateAndStoreSetting: async () => {
    set({ isLoading: true });
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
      const newSetting = response.choices[0]?.message.content ?? '';
      set((state) => ({
        setting: newSetting,
        chatHistory: [
          ...state.chatHistory,
          { role: 'assistant', content: newSetting },
        ],
      }));
    } catch (error) {
      console.error('Error generating setting:', error);
      // Handle error (e.g., set an error state)
    } finally {
      set({ isLoading: false });
    }
  },

  generateAndStoreImage: async () => {
    const { setting } = get();
    if (!setting) {
      console.error('No setting available to generate image');
      return;
    }
    set({ isLoading: true });
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Generate landscape fantasy art reminiscent of the Lord of the Rings or Elden Ring depicting ${setting}.`,
        n: 1,
        size: "1024x1024",
      });
      const newImageUrl = response.data[0]?.url;
      set({ imageUrl: newImageUrl });
    } catch (error) {
      console.error('Error generating image:', error);
      // Handle error (e.g., set an error state)
    } finally {
      set({ isLoading: false });
    }
  },
}));
