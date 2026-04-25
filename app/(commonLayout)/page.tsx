import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers"

export default async function Home() {

const cookieStore = await cookies();
console.log(cookieStore.toString())

const result = await fetch("http://localhost:5000/api/auth/get-session",{

headers:{
   Cookie : cookieStore.toString()
},
cache :"no-store",

})
console.log(await result.json())
  return (
    <div >
     <p>Hello world</p>
     <Button>Click me</Button>
    </div>
  );
}
