import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">AI Symptom Checker</h1>
      <p className="text-gray-600 mb-8">Type your symptoms and get AI-powered health insights instantly.</p>
      <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Check My Symptoms</Link>
    </div>
  );
}
