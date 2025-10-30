import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import PageTransition from "../../components/PageTransition";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import LoaderDots from "../../components/LoaderDots";
import { motion } from "framer-motion";
import { addHistory } from "../../utils/historyStorage";
import { useAuth } from "../../context/AuthContext";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { user } = useAuth();

  const fakeResponses = [
    {
      condition: "Common Cold",
      advice: "You may be experiencing a viral infection. Stay hydrated and rest.",
    },
    {
      condition: "Migraine",
      advice: "Avoid bright light and consult a healthcare provider if severe.",
    },
    {
      condition: "Allergic Reaction",
      advice: "It might be an allergy. Seek medical help if you have swelling or breathing issues.",
    },
    {
      condition: "Flu (Influenza)",
      advice: "Rest, hydrate, and contact your doctor if fever persists.",
    },
    {
      condition: "Stress or Fatigue",
      advice: "Try to rest and manage your stress levels.",
    },
  ];

  const handleCheck = () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const randomResult = fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
      const entry = {
        id: Date.now(),
        userId: user?.id || "guest",
        symptoms,
        prediction: randomResult.condition,
        advice: randomResult.advice,
        date: new Date().toLocaleString(),
      };
      addHistory(entry);
      setResult(randomResult);
      setLoading(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <h2 className="text-3xl font-bold text-blue-600 mb-4">💬 Symptom Checker</h2>
        <p className="text-gray-700 mb-6">
          Describe your symptoms, and the AI assistant will predict possible conditions.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-2xl mx-auto">
          <textarea
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="e.g., I have a sore throat, coughing, and slight fever..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          <div className="flex justify-center mt-4">
            <button
              onClick={handleCheck}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
            >
              {loading ? "Analyzing..." : "Check Symptoms"}
            </button>
          </div>
        </div>

        <div className="mt-8 max-w-2xl mx-auto">
          {loading && (
            <div className="text-center">
              <LoaderDots />
              <p className="text-gray-600 dark:text-gray-400 mt-3">
                AI is analyzing your symptoms...
              </p>
              <div className="mt-4">
                <LoadingSkeleton lines={3} />
              </div>
            </div>
          )}

          {!loading && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                🩺 Possible Condition:
              </h3>
              <p className="text-gray-800 dark:text-gray-200 text-lg font-medium mb-4">
                {result.condition}
              </p>

              <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1">
                🧭 Recommendation:
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{result.advice}</p>
            </motion.div>
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
