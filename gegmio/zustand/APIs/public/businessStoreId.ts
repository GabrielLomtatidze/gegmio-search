import { create } from "zustand";
import axios from "axios";

export type ProfileDetails = {
  id: string;
  name: string;
  description: string;
  webSite: string;
  tikTok: string;
  instagram: string;
  facebook: string;
  businessAddressName: string;
  latitude: number;
  longitude: number;
  distnace: number;
  serviceCount: number;
  isFavorite: boolean;
  businessBookingTime: {
    businessBookingTimeTypeId: number;
    name: string;
    bookingStartTime: string;
    bookingEndTime: string;
  }[];
  files: {
    id: number;
    url: string;
    isProfile: boolean;
  }[];
};

type BusinessByIdState = {
  business: ProfileDetails | null;
  loading: boolean;
  error: string | null;
  favorite: boolean;

  getBusinessById: (id: string) => Promise<void>;
  toggleFavorite: () => void;
  reset: () => void;
};

export const useBusinessStoreId = create<BusinessByIdState>((set) => ({
  business: null,
  loading: false,
  error: null,
  favorite: false,

  getBusinessById: async (id: string) => {
    
    try {
      set({ loading: true, error: null });

      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get(
        `https://bookitcrm.runasp.net/api/v1/public/${id}`,
        {
          ...(accessToken && {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        }
      );

      const data = res.data;

      set({
        business: data,
        favorite: data.isFavorite,
        loading: false,
      });
    } catch (err: any) {
      console.error("Fetch error:", err);

      set({
        error: err?.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },

  toggleFavorite: () =>
    set((state) => ({
      favorite: !state.favorite,
    })),

  reset: () =>
    set({
      business: null,
      loading: false,
      error: null,
      favorite: false,
    }),
}));