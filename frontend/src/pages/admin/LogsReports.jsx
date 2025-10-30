import { fakeChecks } from "../../data/fakeChecks";
import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";

export default function LogsReports() {
  return (
    <DashboardLayout className="p-6">
        <PageTransition>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Logs & Reports</h2>
      <table className="w-full border-collapse rounded-xl shadow">
        <thead>
          <tr className="bg-blue-500">
            <th className="p-2">Date</th>
            <th>Symptoms</th>
            <th>Prediction</th>
            <th>Advice</th>
          </tr>
        </thead>
        <tbody>
          {fakeChecks.map((check) => (
            <tr key={check.id} className="text-center border-t">
              <td className="p-2">{check.date}</td>
              <td>{check.symptoms}</td>
              <td>{check.prediction}</td>
              <td>{check.advice}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </PageTransition>
         
    </DashboardLayout>
     
    
  );
}
