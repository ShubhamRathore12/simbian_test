"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, AlertTriangle, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AlertItem from "./alert-item"
import { generateRandomAlert } from "@/lib/alert-utils"

export default function WithoutSimbian() {
  const [ignoredAlerts, setIgnoredAlerts] = useState(200)
  const [wronglyClosed, setWronglyClosed] = useState(35)
  const [activeThreats, setActiveThreats] = useState(5)

  const [ignoredAlertsList, setIgnoredAlertsList] = useState<Array<{ id: string; text: string; time: string }>>([])
  const [wronglyClosedList, setWronglyClosedList] = useState<Array<{ id: string; text: string; time: string }>>([])
  const [activeAlertsList, setActiveAlertsList] = useState<Array<{ id: string; text: string; time: string }>>([])

  useEffect(() => {
    setIgnoredAlertsList([
      { id: "1", text: "Phishing Email", time: "2 min ago" },
      { id: "2", text: "Suspicious Login", time: "5 min ago" },
      { id: "3", text: "Malware Detection", time: "10 min ago" },
    ])

    setWronglyClosedList([
      { id: "1", text: "Network Scan", time: "15 min ago" },
      { id: "2", text: "Unusual File Access", time: "20 min ago" },
    ])

    setActiveAlertsList([
      { id: "1", text: "Data Exfiltration", time: "1 min ago" },
      { id: "2", text: "Privilege Escalation", time: "3 min ago" },
    ])

    const ignoredInterval = setInterval(() => {
      const newAlert = generateRandomAlert()
      setIgnoredAlerts((prev) => prev + 1)
      setIgnoredAlertsList((prev) => [newAlert, ...prev.slice(0, 4)])
    }, 4000)

    const wronglyInterval = setInterval(() => {
      const newAlert = generateRandomAlert()
      setWronglyClosed((prev) => prev + 1)
      setWronglyClosedList((prev) => [newAlert, ...prev.slice(0, 4)])
    }, 8000)

    const activeInterval = setInterval(() => {
      const newAlert = generateRandomAlert()
      setActiveThreats((prev) => prev + 1)
      setActiveAlertsList((prev) => [newAlert, ...prev.slice(0, 4)])
    }, 12000)

    return () => {
      clearInterval(ignoredInterval)
      clearInterval(wronglyInterval)
      clearInterval(activeInterval)
    }
  }, [])

  return (
    <div className="space-y-8">
      <h2 className="text-center text-2xl font-bold text-red-600 md:text-3xl">Without Simbian</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AlertCard
          title="Ignored Alerts"
          count={ignoredAlerts}
          icon={<AlertCircle className="h-8 w-8 text-red-500" />}
          alerts={ignoredAlertsList}
          description="Wasting valuable analyst time on false positives"
          color="red"
        />

        <AlertCard
          title="Wrongly Closed Alerts"
          count={wronglyClosed}
          icon={<X className="h-8 w-8 text-amber-500" />}
          alerts={wronglyClosedList}
          description="Processing one alert at a time, missing the big picture"
          color="amber"
        />

        <AlertCard
          title="Active Threats"
          count={activeThreats}
          icon={<AlertTriangle className="h-8 w-8 text-orange-500" />}
          alerts={activeAlertsList}
          description="More time fixing SOAR automation, less time on real threats"
          color="orange"
        />
      </div>

      <div className="mt-8 rounded-lg bg-red-50 p-4 text-center">
        <p className="text-lg font-medium text-red-800">
          Security teams are overwhelmed with alerts, missing critical threats, and wasting time on false positives
        </p>
      </div>
    </div>
  )
}

interface AlertCardProps {
  title: string
  count: number
  icon: React.ReactNode
  alerts: Array<{ id: string; text: string; time: string }>
  description: string
  color: "red" | "amber" | "orange" | "green"
}

function AlertCard({ title, count, icon, alerts, description, color }: AlertCardProps) {
  const colorMap = {
    red: "bg-red-50 border-red-200",
    amber: "bg-amber-50 border-amber-200",
    orange: "bg-orange-50 border-orange-200",
    green: "bg-green-50 border-green-200",
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    shake: { x: [-4, 4, -4, 4, 0], transition: { duration: 0.4 } },
  }

  const glowVariants = {
    initial: { boxShadow: "0 0 0 rgba(0,0,0,0)" },
    animate: {
      boxShadow: "0 0 20px rgba(255, 0, 0, 0.3)",
      transition: { duration: 1.5, repeat: Infinity, repeatType: "mirror" },
    },
  }

  return (
    <motion.div
      className="h-[450px]"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="shake"
    >
      <motion.div variants={glowVariants} initial="initial" animate="animate" className="h-full">
        <Card className={`border-2 h-full ${colorMap[color]}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <motion.div
              className="mb-2 text-3xl font-bold"
              key={count}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {count}
            </motion.div>
            <p className="mb-4 text-sm text-gray-500">{description}</p>

            <div className="space-y-2 overflow-y-auto max-h-[200px] pr-1">
              <AnimatePresence>
                {alerts.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} color={color} />
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
