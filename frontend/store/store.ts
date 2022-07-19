import create from "zustand";
import { persist } from "zustand/middleware";
import UserType from "../src/models/UserType";

interface StoreState {
  isLoading: Boolean;
  setIsLoading: (isLoading: Boolean) => void;
  user?: UserType;
  setUser: (user?: UserType) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isLoading: true,
      setIsLoading: (loading: Boolean) => set(() => ({ isLoading: loading })),
      user: undefined,
      setUser: (user?: UserType) => set(() => ({ user: user })),
    }),
    { name: "stores" }
  )
);
export default useStore;
