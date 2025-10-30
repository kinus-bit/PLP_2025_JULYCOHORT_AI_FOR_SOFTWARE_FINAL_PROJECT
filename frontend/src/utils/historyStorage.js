// Handle saving and loading AI symptom check history from localStorage

const HISTORY_KEY = "ai_symptom_history";

export function getHistory() {
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addHistory(entry) {
  const history = getHistory();
  history.unshift(entry); // add newest first
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
