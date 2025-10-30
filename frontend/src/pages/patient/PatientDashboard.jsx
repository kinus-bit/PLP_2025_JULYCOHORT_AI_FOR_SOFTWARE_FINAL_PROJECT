import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import PageTransition from "../../components/PageTransition";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { fakeChecks } from "../../data/fakeChecks";
import { useAuth } from "../../context/AuthContext";

export default function PatientDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [myChecks, setMyChecks] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMyChecks(fakeChecks.filter((c) => c.userId === user?.id));
      setLoading(false);
    }, 1200); // simulate API delay
    return () => clearTimeout(timer);
  }, [user]);

  return (
    <DashboardLayout>
      <PageTransition>
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome, {user?.name}
        </h2>

        {loading ? (
          <LoadingSkeleton lines={4} />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {myChecks.slice(0, 3).map((check) => (
              <div
                key={check.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow transition hover:scale-[1.02]"
              >
                <p className="text-sm text-gray-500">{check.date}</p>
                <h3 className="font-bold mt-1">{check.prediction}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {check.advice}
                </p>
              </div>
            ))}
          </div>
        )}
      </PageTransition>
    </DashboardLayout>
  );
}
