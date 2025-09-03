
import { create } from "zustand";
const useAuth = create(set => ({
  user: null,
  setUser: (u) => set({ user: u })
}));
export default useAuth;
