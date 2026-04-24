import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default async function Homsde() {

  const session =  await authClient.getSession( );
  console.log(session)

  return (
    <div >
     <p>Hello world</p>
     <Button>Click me</Button>
    </div>
  );
}
