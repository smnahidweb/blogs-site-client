import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AnalyticsLayout({children,}:{children:React.ReactNode;}){

return(


 <div>

<div>
    <Button asChild>
    
<Link href="/dashboard/analytics/monthly"> Monthly </Link> 

</Button>

<Button asChild>
    <Link href="/dashboard/analytics/annually" >Annually</Link>
255
255

</Button>

</div>

{children}

 </div>
)
}