import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockClients = [
  { name: 'Ana López', progress: '70%', invested: '$3,500' },
  { name: 'Carlos Ruiz', progress: '85%', invested: '$9,200' },
];

export default function Portfolio() {
  return (
    <div className="grid gap-4">
      {mockClients.map((client, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{client.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Progreso de asesoría: {client.progress}</p>
            <p>Monto invertido: {client.invested}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}