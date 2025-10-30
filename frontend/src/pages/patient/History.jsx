import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import PageTransition from "../../components/PageTransition";
import { getHistory, clearHistory } from "../../utils/historyStorage";
import HistoryDetailsModal from "../../components/HistoryDetailsModal";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";

export default function History() {
  const [history, setHistory] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const allHistory = getHistory();
    const userHistory = allHistory.filter(
      (h) => h.userId === user?.id || user?.role === "admin"
    );
    setHistory(userHistory);
  }, [user]);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">
            📜 Symptom Check History
          </h2>
          <Button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Clear All
          </Button>
        </div>

        {history.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No history available yet.
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
              >
                <div>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                  <p className="text-gray-800 dark:text-gray-100 mt-1">
                    <strong>Prediction:</strong>{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      {entry.prediction}
                    </span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-1 line-clamp-2">
                    <strong>Symptoms:</strong> {entry.symptoms}
                  </p>
                </div>

                <HistoryDetailsModal entry={entry} />
              </div>
            ))}
          </div>
        )}
      </PageTransition>
    </DashboardLayout>
  );
}
