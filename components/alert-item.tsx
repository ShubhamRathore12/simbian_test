"use client";

import { motion } from "framer-motion";

interface AlertItemProps {
  alert: {
    id: string;
    text: string;
    time: string;
  };
  color: "red" | "amber" | "orange" | "green";
}

export default function AlertItem({ alert, color }: AlertItemProps) {
  const colorMap = {
    red: "border-red-200 bg-red-50",
    amber: "border-amber-200 bg-amber-50",
    orange: "border-orange-200 bg-orange-50",
    green: "border-green-200 bg-green-50",
  };

  return (
    <motion.div
      key={alert.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between rounded-md border p-2 ${colorMap[color]}`}
    >
      <span className="font-medium">{alert.text}</span>
      <span className="text-xs text-gray-500">{alert.time}</span>
    </motion.div>
  );
}
