import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/header";

export default function Page() {
  return (
    <div>
      <Header />

      <Card>
        <CardHeader>
          <CardTitle>Confirm</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
