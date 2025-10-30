import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="shadow-lg rounded-xl p-6 w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <p className="text-center text-gray-600 mb-3">
          Demo only — use these accounts:
        </p>
        <ul className="text-sm text-gray-700">
          <li><b>Admin:</b> admin@aihealth.com / admin123</li>
          <li><b>Patient:</b> patient@aihealth.com / patient123</li>
        </ul>
        <Link to="/login" className="block mt-4 text-blue-600 text-center">Go to Login</Link>
      </div>
    </div>
  );
}
