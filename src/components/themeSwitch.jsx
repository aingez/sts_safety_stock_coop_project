// Dev: Aingthawan K.
// Component: to switch between dark and light theme.
// currently present on bottom right of site

"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SwitchTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSwitchTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="custom-box-2 flex-0 flex items-center justify-center text-center">
      <div className="space-y-5">
        <h2 className="text-lg font-bold">Toggle Theme</h2>
        <button
          className="transform text-6xl font-bold transition-transform duration-300 hover:scale-110 hover:opacity-80 active:opacity-60"
          onClick={handleSwitchTheme}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <div className="flex flex-col text-center">
          current theme: <span className="font-bold">{theme}</span>
        </div>
      </div>
    </div>
  );
};

export default SwitchTheme;
