import { create } from "zustand";

const getInitialTheme = () => {
  try {
    return localStorage.getItem("chat-theme") || "coffee";
  } catch (e) {
    return "coffee";
  }
};

const initialTheme = getInitialTheme();
if (typeof document !== "undefined") {
  document.documentElement.setAttribute("data-theme", initialTheme);
}

export const useThemeStore = create((set) => ({
  theme: initialTheme,
  setTheme: (theme) => {
    try {
      console.log("setTheme called with:", theme);
      localStorage.setItem("chat-theme", theme);
    } catch (e) {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    set({ theme });
  },
}));
