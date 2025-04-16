"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WithoutSimbian from "./without-simbian";
import WithSimbian from "./with-simbian";

export default function SecurityDashboard() {
  const [activeSection, setActiveSection] = useState<"without" | "with">(
    "without"
  );
  const [autoSwitch, setAutoSwitch] = useState(true);

  useEffect(() => {
    if (!autoSwitch) return;

    const interval = setInterval(() => {
      setActiveSection((prev) => (prev === "without" ? "with" : "without"));
    }, 10000);

    return () => clearInterval(interval);
  }, [autoSwitch]);

  const buttonStyle = (active: boolean) =>
    `text-md px-6 py-2 rounded border transition font-medium ${
      active
        ? "bg-black text-white border-black"
        : "bg-white text-black border-gray-300 hover:bg-gray-100"
    }`;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Security Operations Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Experience the difference in security operations with Simbian
        </p>
      </header>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => {
            setActiveSection("without");
            setAutoSwitch(false);
          }}
          className={buttonStyle(activeSection === "without")}
        >
          Without Simbian
        </button>

        <button
          onClick={() => {
            setActiveSection("with");
            setAutoSwitch(false);
          }}
          className={buttonStyle(activeSection === "with")}
        >
          With Simbian
        </button>

        <button
          onClick={() => setAutoSwitch(!autoSwitch)}
          className={buttonStyle(autoSwitch)}
        >
          {autoSwitch ? "Auto-switching: On" : "Auto-switching: Off"}
        </button>
      </div>

      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {activeSection === "without" ? <WithoutSimbian /> : <WithSimbian />}
      </motion.div>
    </div>
  );
}
