'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import PortfolioOverview from '@/components/dashboard/PortfolioOverview'
import AllocationChart from '@/components/dashboard/AllocationChart'
import PerformanceChart from '@/components/dashboard/PerformanceChart'
import RiskScoreChart from '@/components/dashboard/RiskScoreChart'

export default function PortfolioPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground px-4 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center">Dashboard de Portafolio</h1>

        <Tabs defaultValue="overview" className="w-full space-y-6">
          <TabsList className="flex flex-wrap justify-center gap-2 border-b border-muted pb-2">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="allocation">Activos</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
            <TabsTrigger value="risk">Riesgo</TabsTrigger>
          </TabsList>

          <div className="pt-6">
            <TabsContent value="overview">
              <PortfolioOverview />
            </TabsContent>
            <TabsContent value="allocation">
              <AllocationChart />
            </TabsContent>
            <TabsContent value="performance">
              <PerformanceChart />
            </TabsContent>
            <TabsContent value="risk">
              <RiskScoreChart />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}