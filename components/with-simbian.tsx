"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Shield,
  AlertCircle,
  X,
  AlertTriangle,
} from "lucide-react";
import { generateRandomAlert } from "@/lib/alert-utils";

export default function WithSimbian() {
  const [resolvedAlerts, setResolvedAlerts] = useState<
    Array<{ id: string; text: string; time: string }>
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = generateRandomAlert();
      setResolvedAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: "Accurate Detection",
      description: "Zero false positives",
      icon: <Shield className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Comprehensive Analysis",
      description: "AI recognized patterns",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Automated Response",
      description: "Incident automatically contained",
      icon: <Shield className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Triaged & Reported",
      description: "SOC Agent handled investigation",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    },
    {
      title: "24/7 Coverage",
      description: "No analyst fatigue",
      icon: <Shield className="h-8 w-8 text-green-500" />,
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-center text-2xl font-bold text-green-600 md:text-3xl">
        With Simbian
      </h2>

      {/* Step Timeline */}
      <div className="overflow-x-auto py-4">
        <div className="flex min-w-max items-center justify-center space-x-0 px-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-48 rounded border-2 border-green-200 bg-green-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    {step.icon}
                  </div>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  className="mx-2 h-0.5 bg-green-500"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Zero Alert Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ZeroAlertCard
          title="Ignored Alerts"
          icon={<AlertCircle className="h-8 w-8 text-green-500" />}
          description="All alerts properly triaged and addressed"
        />
        <ZeroAlertCard
          title="Wrongly Closed Alerts"
          icon={<X className="h-8 w-8 text-green-500" />}
          description="Accurate analysis prevents incorrect dismissals"
        />
        <ZeroAlertCard
          title="Active Threats"
          icon={<AlertTriangle className="h-8 w-8 text-green-500" />}
          description="Threats contained and remediated immediately"
        />
      </div>

      {/* Resolved Alerts List */}
      <div className="mt-8 rounded border-2 border-green-200 bg-green-50 p-4">
        <h3 className="text-center text-xl font-bold text-green-700 mb-4">
          Resolved Alerts
        </h3>
        <div className="space-y-2">
          {resolvedAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between rounded-md border border-green-200 bg-white p-2"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>{alert.text}</span>
              </div>
              <span className="text-xs text-gray-500">
                Resolved {alert.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="mt-8 rounded-lg bg-green-50 p-4 text-center">
        <p className="text-lg font-medium text-green-800">
          90% of alerts resolved automatically, 24/7 coverage, and comprehensive
          analysis of every alert
        </p>
      </div>
    </div>
  );
}

// Normal HTML replacement for card
function ZeroAlertCard({
  title,
  icon,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded border-2 border-green-200 bg-green-50 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          {icon}
        </div>

        <motion.div
          className="mb-2 text-3xl font-bold text-green-700"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 2,
          }}
        >
          0
        </motion.div>
        <p className="text-sm text-gray-600">{description}</p>

        <div className="mt-4 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              delay: 0.3,
            }}
          >
            <CheckCircle className="h-12 w-12 text-green-500" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
