 "use client"

import { useEffect } from "react"

type AboutErrorProps = {
  error: Error
  reset: () => void
}

export default function AboutError({ error, reset }: AboutErrorProps) {

    useEffect(() => {
        console.error("Error loading about page:", error)
    }, [error])
    
  return (
    <div>
      <h1>Error Loading About Page</h1>
      <p>Sorry, there was an error loading the about page. Please try again later.</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>      
  )
}
