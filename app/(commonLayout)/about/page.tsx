
export const dynamic = "force-dynamic"; // Ensure the page is always rendered on the server

export default async function AboutPage() {

  await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate a delay for loading

 
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our about page!</p>
    </div>
  );
};
