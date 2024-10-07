import { create } from 'zustand';
import { api } from "~/trpc/react";

interface GameState {
  setting: string | null;
  imageUrl: string | null;
  chatHistory: { role: string; content: string }[];
  isLoading: boolean;
  setSetting: (setting: string) => void;
  setImageUrl: (imageUrl: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  setting: null,
  imageUrl: null,
  chatHistory: [],
  isLoading: false,
  setSetting: (setting) => set({ setting }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export const useGameActions = () => {
  const { setSetting, setImageUrl, setIsLoading } = useGameStore();
  const generateSettingMutation = api.game.generateSetting.useMutation();
  const generateImageMutation = api.game.generateImage.useMutation();

  const generateAndStoreSetting = async () => {
    setIsLoading(true);
    try {
      const setting = await generateSettingMutation.mutateAsync();
      setSetting(setting);
    } catch (error) {
      console.error('Error generating setting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAndStoreImage = async () => {
    setIsLoading(true);
    try {
      const { setting } = useGameStore.getState();
      if (!setting) {
        throw new Error('No setting available to generate image');
      }
      const imageUrl = await generateImageMutation.mutateAsync({ setting });
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { generateAndStoreSetting, generateAndStoreImage };
};
