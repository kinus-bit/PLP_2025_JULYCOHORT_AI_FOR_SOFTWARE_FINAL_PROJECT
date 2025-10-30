import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
