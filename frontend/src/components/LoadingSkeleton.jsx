import { motion } from "framer-motion";

export default function LoadingSkeleton({ lines = 3 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3 animate-pulse"
    >
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
          style={{ width: `${80 + Math.random() * 20}%` }}
        />
      ))}
    </motion.div>
  );
}
