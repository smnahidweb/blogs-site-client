// export const AdminRoute = [


    
//     {
//       title: "User Analytics",
//       items: [
//         {
//           title: "Analytics",
//           url: "/analytics",
//         },
       
//       ]
//     }
//   ]


export interface Route {
    title : string;
    items : {
        title:string;
        url : string;
    }[]

}