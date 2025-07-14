'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Insights from '@/components/advisor/Insights'
import Portfolio from '@/components/advisor/Portfolio'
import Messages from '@/components/advisor/Messages'
import ClientPerformanceChart from '@/components/advisor/ClientPerformanceChart'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdvisorDashboard() {
  return (
    <div className="min-h-screen px-6 py-10 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel de Asesor</h1>

      <Tabs defaultValue="insights" className="w-full max-w-6xl mx-auto space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
        </TabsList>

        {/* TAB: INSIGHTS */}
        <TabsContent value="insights">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Visión general de clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <Insights />
              </CardContent>
            </Card>

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Rendimiento agregado</CardTitle>
              </CardHeader>
              <CardContent>
                <ClientPerformanceChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB: PORTFOLIO */}
        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Portafolios individuales</CardTitle>
            </CardHeader>
            <CardContent>
              <Portfolio />
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: MESSAGES */}
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Mensajería con clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <Messages />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
