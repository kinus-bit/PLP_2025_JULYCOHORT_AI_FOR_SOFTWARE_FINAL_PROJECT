import { fakePatients } from "../../data/fakePatients";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";

export default function ManagePatients() {
  const [patients, setPatients] = useState(fakePatients);

  const deletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  return (
    <DashboardLayout className="p-6">
      <PageTransition>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Manage Patients</h2>
      <table className="w-full border-collapse rounded-xl shadow">
        <thead>
          <tr className="bg-blue-500">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Checks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id} className="text-center border-t">
              <td className="p-2">{p.name}</td>
              <td>{p.email}</td>
              <td>{p.checks}</td>
              <td>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deletePatient(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </PageTransition>
         
    </DashboardLayout>
     
    
  );
}
