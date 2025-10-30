import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)} className="p-2 bg-white text-blue-600 rounded-lg">
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
