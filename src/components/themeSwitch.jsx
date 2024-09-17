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
    <button className="mr-5 text-2xl font-bold" onClick={handleSwitchTheme}>
      🌓
    </button>
  );
};

export default SwitchTheme;
