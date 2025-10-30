import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";

export default function ManageModel() {
  const [url, setUrl] = useState("https://fake-aimodel-endpoint.com/predict");

  const updateURL = (e) => {
    e.preventDefault();
    alert("Model endpoint updated (demo)");
  };

  return (
    <DashboardLayout className="p-6">
      <PageTransition>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Manage AI Model</h2>
      <form onSubmit={updateURL} className="max-w-md">
        <label className="block mb-2 font-semibold">Model API Endpoint:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
      </PageTransition>
        
    </DashboardLayout>
      
    
  );
}
