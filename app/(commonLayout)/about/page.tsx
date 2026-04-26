import { getBlog } from "@/src/action/blog.action";
import { useEffect, useState } from "react";


export const dynamic = "force-dynamic"; // Ensure the page is always rendered on the server

export default  function AboutPage() {

  // await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate a delay for loading

const [data,setData] = useState()
const [error, setError] = useState<{ message: string } | null>(null);
console.log(data)

useEffect(() => {
  (async () => {
    const { data,error } = await getBlog();
    setData(data);
    setError(error ? { message: error.err } : null) 
  })(); 
}, []);

  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our about page!</p>
    </div>
  );
};
