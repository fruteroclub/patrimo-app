import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockMessages = [
  { sender: 'Ana López', text: '¿Cuándo tenemos la siguiente sesión?' },
  { sender: 'Carlos Ruiz', text: 'Gracias por el consejo de inversión 🙏' },
];

export default function Messages() {
  return (
    <div className="space-y-4">
      {mockMessages.map((msg, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>Mensaje de {msg.sender}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{msg.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}