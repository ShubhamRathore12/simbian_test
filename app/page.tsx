import { Suspense } from "react"
import SecurityDashboard from "@/components/security-dashboard"
import Loading from "@/components/loading"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<Loading />}>
        <SecurityDashboard />
      </Suspense>
    </main>
  )
}
