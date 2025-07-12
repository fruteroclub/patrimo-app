import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Insights() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ganancias Semanales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">$1,250.00</p>
          <p className="text-sm text-muted-foreground">+15% respecto a la semana pasada</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Clientes Nuevos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">8</p>
          <p className="text-sm text-muted-foreground">3 desde ayer</p>
        </CardContent>
      </Card>
    </div>
  );
}