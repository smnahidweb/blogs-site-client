import Link from "next/link";

export default function PracticeLayout(
{
children,
marketingSlot,
salesSlot
}:
{
children:React.ReactNode,
marketingSlot:React.ReactNode,
salesSlot:React.ReactNode

}){
    return(

        <div>
            
         <nav className="flex gap-10 justify-center mt-8" >

            <Link className="hover:underline" href="/development ">Development</Link>
            <Link className="hover:underline" href="/marketing">Marketing</Link>
            <Link className="hover:underline" href="/marketing/settings">Settings</Link>
            <Link className="hover:underline" href="/sales">Sales</Link>

         </nav>

           <div className="flex justify-center gap-8">
            {marketingSlot}
            {salesSlot}
           </div>
          
            {children}
        </div>

    )
}